const fs = require("fs");
const path = require("path");

const JSON_PATH = path.join(
  __dirname,
  "data",
  "final-acne-products.json"
);

const IMPORT_MODE = process.argv.includes("--import");

function stop(message) {
  console.error("\nERROR:", message);
  process.exit(1);
}

async function main() {
  const BASE_URL = (process.env.MEDUSA_BACKEND_URL || "")
    .trim()
    .replace(/\/+$/, "");

  const EMAIL = process.env.MEDUSA_ADMIN_EMAIL;
  const PASSWORD = process.env.MEDUSA_ADMIN_PASSWORD;

  if (!BASE_URL || !EMAIL || !PASSWORD) {
    stop("Backend URL ya admin credentials missing hain.");
  }

  if (!fs.existsSync(JSON_PATH)) {
    stop(
      `JSON file nahi mili: ${JSON_PATH}\n` +
      "Check karo ki data folder backend root mein hai."
    );
  }

  let json;

  try {
    json = JSON.parse(fs.readFileSync(JSON_PATH, "utf8"));
  } catch (error) {
    stop("JSON file invalid hai: " + error.message);
  }

  const products = Array.isArray(json) ? json : json.products;

  if (!Array.isArray(products) || products.length === 0) {
    stop('JSON mein products array nahi mili.');
  }

  console.log("Backend:", BASE_URL);
  console.log("JSON products:", products.length);
  console.log(
    "Mode:",
    IMPORT_MODE ? "IMPORT MODE" : "SAFE DRY RUN"
  );

  // Step 1: Admin login
  const loginResponse = await fetch(
    `${BASE_URL}/auth/user/emailpass`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: EMAIL,
        password: PASSWORD,
      }),
    }
  );

  const loginText = await loginResponse.text();

  let loginData = {};

  try {
    loginData = JSON.parse(loginText);
  } catch {}

  if (!loginResponse.ok) {
    stop(
      `Login failed: ${loginResponse.status}\n${loginText}`
    );
  }

  const token = loginData.token || loginData.access_token;

  if (!token) {
    stop("Login token nahi mila. Login response check karo.");
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  console.log("Admin login successful.");

  // Step 2: Existing products check
  const existingHandles = new Set();

  let offset = 0;
  const limit = 100;

  while (true) {
    const response = await fetch(
      `${BASE_URL}/admin/products?limit=${limit}&offset=${offset}`,
      { headers }
    );

    const text = await response.text();

    let data = {};

    try {
      data = JSON.parse(text);
    } catch {}

    if (!response.ok) {
      stop(
        `Existing products check failed: ${response.status}\n${text}`
      );
    }

    const batch = data.products || [];

    for (const product of batch) {
      if (product.handle) {
        existingHandles.add(product.handle);
      }
    }

    if (batch.length < limit) break;

    offset += batch.length;
  }

  // Step 3: Prepare products
  const prepared = products.map((product, index) => {
    if (!product.title || !product.handle) {
      stop(`Product ${index + 1} ka title ya handle missing hai.`);
    }

    const options = (product.options || []).map((option) => ({
      title: option.title || "Size",
      values:
        Array.isArray(option.values) && option.values.length
          ? option.values.map(String)
          : ["Default"],
    }));

    const variants = (product.variants || []).map((variant) => ({
      title: variant.title || product.title,

      ...(variant.sku ? { sku: variant.sku } : {}),

      manage_inventory: Boolean(variant.manage_inventory),
      allow_backorder: Boolean(variant.allow_backorder),

      options: variant.options || {},

      prices: (variant.prices || []).map((price) => {
        const amount = Number(price.amount);

        if (!Number.isFinite(amount) || amount < 0) {
          stop(`Invalid price: ${product.title}`);
        }

        // Source JSON amount cents mein hai:
        // 2198 means $21.98
        return {
          currency_code: (
            price.currency_code || json.currency || "usd"
          ).toLowerCase(),

          amount: Math.round(amount) / 100,
        };
      }),
    }));

    if (!variants.length) {
      stop(`${product.title} ke variants nahi hain.`);
    }

    if (variants.some((variant) => !variant.prices.length)) {
      stop(`${product.title} ke variant ka price missing hai.`);
    }

    return {
      title: product.title,
      handle: product.handle,

      ...(product.description
        ? { description: product.description }
        : {}),

      // Draft status rakhi hai; storefront par automatically live nahi hogi.
      status: product.status || "draft",

      discountable: product.discountable !== false,

      ...(product.thumbnail
        ? { thumbnail: product.thumbnail }
        : {}),

      images: (product.images || [])
        .filter((image) => image && image.url)
        .map((image) => ({ url: image.url })),

      options: options.length
        ? options
        : [{ title: "Size", values: ["Default"] }],

      variants,
    };
  });

  const newProducts = prepared.filter(
    (product) => !existingHandles.has(product.handle)
  );

  console.log("Already existing:", prepared.length - newProducts.length);
  console.log("New products:", newProducts.length);

  newProducts.slice(0, 5).forEach((product) => {
    const price = product.variants[0].prices[0];

    console.log(
      `- ${product.title} | ${price.currency_code} ${price.amount}`
    );
  });

  // Safe mode: no database writes
  if (!IMPORT_MODE) {
    console.log("\nDRY RUN SUCCESSFUL.");
    console.log("Abhi database mein koi product create nahi hua.");
    console.log(
      "Agar backend/database sahi hai, tab --import use karna."
    );
    return;
  }

  // Step 4: Create products
  let created = 0;
  let failed = 0;

  for (const product of newProducts) {
    const response = await fetch(`${BASE_URL}/admin/products`, {
      method: "POST",
      headers,
      body: JSON.stringify(product),
    });

    const text = await response.text();

    let result = {};

    try {
      result = JSON.parse(text);
    } catch {}

    if (!response.ok) {
      failed++;

      console.error(
        `FAILED: ${product.title} | ${response.status}`
      );

      console.error(text.slice(0, 500));

      continue;
    }

    created++;

    console.log(
      `CREATED ${created}/${newProducts.length}: ${product.title}`
    );
  }

  console.log("\nIMPORT FINISHED");
  console.log("Created:", created);
  console.log("Failed:", failed);
  console.log("Skipped existing:", prepared.length - newProducts.length);
}

main().catch((error) => {
  console.error("\nUnexpected error:", error.message);
  process.exit(1);
});