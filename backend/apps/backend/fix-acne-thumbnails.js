const fs = require("fs");
const path = require("path");

const BASE_URL = (
  process.env.MEDUSA_BACKEND_URL || ""
).trim().replace(/\/+$/, "");

const EMAIL = process.env.MEDUSA_ADMIN_EMAIL;
const PASSWORD = process.env.MEDUSA_ADMIN_PASSWORD;

const JSON_PATH = path.join(
  __dirname,
  "data",
  "final-acne-products.json"
);

async function main() {
  if (!BASE_URL || !EMAIL || !PASSWORD) {
    throw new Error("Backend URL ya admin credentials missing hain.");
  }

  if (!fs.existsSync(JSON_PATH)) {
    throw new Error("Product JSON file nahi mili: " + JSON_PATH);
  }

  const source = JSON.parse(
    fs.readFileSync(JSON_PATH, "utf8")
  );

  const sourceProducts = Array.isArray(source)
    ? source
    : source.products;

  if (!Array.isArray(sourceProducts)) {
    throw new Error("JSON mein products array nahi mili.");
  }

  // Login
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
    throw new Error("Login failed: " + loginText);
  }

  const token = loginData.token || loginData.access_token;

  if (!token) {
    throw new Error("Login token nahi mila.");
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  // Fetch products from Medusa
  const medusaProducts = [];
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
      throw new Error("Products fetch failed: " + text);
    }

    const batch = data.products || [];

    medusaProducts.push(...batch);

    if (batch.length < limit) break;

    offset += batch.length;
  }

  const sourceByHandle = new Map(
    sourceProducts.map((product) => [
      product.handle,
      product,
    ])
  );

  const targets = medusaProducts.filter((product) =>
    sourceByHandle.has(product.handle)
  );

  console.log("Matching products:", targets.length);

  let updated = 0;
  let failed = 0;

  for (const product of targets) {
    const sourceProduct = sourceByHandle.get(product.handle);

    // Prefer the first image URL in the source JSON.
    const firstImage = sourceProduct.images?.find(
      (image) => image && image.url
    )?.url;

    // Fall back to the existing product thumbnail if needed.
    const thumbnail = firstImage || product.thumbnail;

    if (!thumbnail) {
      console.log("SKIPPED — no image:", product.title);
      failed++;
      continue;
    }

    const response = await fetch(
      `${BASE_URL}/admin/products/${product.id}`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          thumbnail,
        }),
      }
    );

    const text = await response.text();

    if (!response.ok) {
      console.log(
        `FAILED: ${product.title} | ${response.status} | ${text.slice(0, 250)}`
      );
      failed++;
      continue;
    }

    updated++;

    console.log(
      `UPDATED ${updated}/${targets.length}: ${product.title}`
    );
  }

  console.log("\nTHUMBNAIL UPDATE FINISHED");
  console.log("Updated:", updated);
  console.log("Failed/skipped:", failed);
}

main().catch((error) => {
  console.error("\nERROR:", error.message);
  process.exit(1);
});