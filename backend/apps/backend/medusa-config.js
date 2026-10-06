const path = require("path")

const { defineConfig, loadEnv } = require("@medusajs/framework/utils")

loadEnv(process.env.NODE_ENV || "development", process.cwd())

const REDIS_URL = process.env.REDIS_URL

const useRedis =
  !!REDIS_URL && process.env.DISABLE_REDIS !== "true"

console.log("useRedis =", useRedis)

// During the initial build, the source config needs the
// precompiled testimonials module.
// After Medusa builds, the generated config lives inside
// .medusa/server and should use the compiled module there.
const isCompiledConfig =
  path.basename(__dirname) === "server" &&
  path.basename(path.dirname(__dirname)) === ".medusa"

const testimonialsModulePath = isCompiledConfig
  ? path.resolve(__dirname, "src/modules/testimonials")
  : path.resolve(
      __dirname,
      ".medusa/server/src/modules/testimonials"
    )

const redisModules = useRedis
  ? [
      {
        resolve: "@medusajs/medusa/event-bus-redis",
        options: {
          redisUrl: REDIS_URL,
        },
      },
      {
        resolve: "@medusajs/medusa/workflow-engine-redis",
        options: {
          redis: {
            redisUrl: REDIS_URL,
          },
        },
      },
      {
        resolve: "@medusajs/medusa/locking",
        options: {
          providers: [
            {
              resolve: "@medusajs/medusa/locking-redis",
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

module.exports = defineConfig({
  admin: {
    disable: false,
    backendUrl: process.env.MEDUSA_BACKEND_URL,
  },

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

      adminCors: process.env.ADMIN_CORS,

      authCors: process.env.AUTH_CORS,

      jwtSecret: process.env.JWT_SECRET,

      cookieSecret: process.env.COOKIE_SECRET,
    },
  },

  modules: [
    ...redisModules,

    {
      resolve: "@medusajs/medusa/file",
      options: {
        providers: [
          {
            resolve: "@medusajs/medusa/file-s3",
            id: "s3",
            options: {
              file_url: process.env.S3_FILE_URL,
              access_key_id: process.env.S3_ACCESS_KEY_ID,
              secret_access_key:
                process.env.S3_SECRET_ACCESS_KEY,
              region: process.env.S3_REGION,
              bucket: process.env.S3_BUCKET,
              endpoint: process.env.S3_ENDPOINT,

              additional_client_config: {
                forcePathStyle: true,
              },
            },
          },
        ],
      },
    },

    {
      resolve: testimonialsModulePath,
    },
  ],
})