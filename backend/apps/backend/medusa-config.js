const path = require("path")
const fs = require("fs")

const {
  defineConfig,
  loadEnv,
} = require("@medusajs/framework/utils")

// ---------------------------------------------------------
// Load environment variables
// ---------------------------------------------------------

loadEnv(
  process.env.NODE_ENV || "development",
  process.cwd()
)

// ---------------------------------------------------------
// Redis
// ---------------------------------------------------------

const REDIS_URL = process.env.REDIS_URL

const useRedis =
  !!REDIS_URL &&
  process.env.DISABLE_REDIS !== "true"

// Do NOT print REDIS_URL.
// It contains a private connection string.
console.log("useRedis =", useRedis)

// ---------------------------------------------------------
// Testimonials module path
//
// BUILD TIME
// cwd:
//   backend/apps/backend
//
// Compiled module:
//   backend/apps/backend/.medusa/server/src/modules/testimonials
//
// RUNTIME
// cwd:
//   backend/apps/backend/.medusa/server
//
// Compiled module:
//   backend/apps/backend/.medusa/server/src/modules/testimonials
// ---------------------------------------------------------

const compiledModuleFromProjectRoot = path.resolve(
  process.cwd(),
  ".medusa/server/src/modules/testimonials"
)

const moduleFromCurrentDirectory = path.resolve(
  process.cwd(),
  "src/modules/testimonials"
)

const testimonialsModulePath = fs.existsSync(
  compiledModuleFromProjectRoot
)
  ? compiledModuleFromProjectRoot
  : moduleFromCurrentDirectory

console.log(
  "Testimonials module path:",
  testimonialsModulePath
)

// ---------------------------------------------------------
// Redis modules
// ---------------------------------------------------------

const redisModules = useRedis
  ? [
      {
        resolve:
          "@medusajs/medusa/event-bus-redis",

        options: {
          redisUrl: REDIS_URL,
        },
      },

      {
        resolve:
          "@medusajs/medusa/workflow-engine-redis",

        options: {
          redis: {
            redisUrl: REDIS_URL,
          },
        },
      },

      {
        resolve:
          "@medusajs/medusa/locking",

        options: {
          providers: [
            {
              resolve:
                "@medusajs/medusa/locking-redis",

              id: "locking-redis",

              is_default: true,

              options: {
                redisUrl: REDIS_URL,
              },
            },
          ],
        },
      },
    ]
  : []

// ---------------------------------------------------------
// Medusa configuration
// ---------------------------------------------------------

module.exports = defineConfig({
  // -------------------------------------------------------
  // Admin
  // -------------------------------------------------------

  admin: {
    disable: false,

    backendUrl:
      process.env.MEDUSA_BACKEND_URL,
  },

  // -------------------------------------------------------
  // Project configuration
  // -------------------------------------------------------

  projectConfig: {
    ...(useRedis
      ? {
          redisUrl: REDIS_URL,
        }
      : {}),

    http: {
      storeCors:
        process.env.STORE_CORS ||
        "http://localhost:8000,http://localhost:7001",

      adminCors:
        process.env.ADMIN_CORS,

      authCors:
        process.env.AUTH_CORS,

      jwtSecret:
        process.env.JWT_SECRET,

      cookieSecret:
        process.env.COOKIE_SECRET,
    },
  },

  // -------------------------------------------------------
  // Modules
  // -------------------------------------------------------

  modules: [
    // -----------------------------------------------------
    // Redis / Event Bus / Workflow / Locking
    // -----------------------------------------------------

    ...redisModules,

    // -----------------------------------------------------
    // S3 File Storage
    // -----------------------------------------------------

    {
      resolve:
        "@medusajs/medusa/file",

      options: {
        providers: [
          {
            resolve:
              "@medusajs/medusa/file-s3",

            id: "s3",

            options: {
              file_url:
                process.env.S3_FILE_URL,

              access_key_id:
                process.env.S3_ACCESS_KEY_ID,

              secret_access_key:
                process.env.S3_SECRET_ACCESS_KEY,

              region:
                process.env.S3_REGION,

              bucket:
                process.env.S3_BUCKET,

              endpoint:
                process.env.S3_ENDPOINT,

              additional_client_config: {
                forcePathStyle: true,
              },
            },
          },
        ],
      },
    },

    // -----------------------------------------------------
    // Custom Testimonials Module
    // -----------------------------------------------------

    {
      resolve: testimonialsModulePath,
    },
  ],
})