import { defineConfig, loadEnv } from "@medusajs/framework/utils"

// .env ko config evaluate hone se pehle load karo
loadEnv(process.env.NODE_ENV || "development", process.cwd())

const REDIS_URL = process.env.REDIS_URL
// Local pe Redis band rakhna ho to .env mein DISABLE_REDIS=true daal do
const useRedis = !!REDIS_URL && process.env.DISABLE_REDIS !== "true"

// Debug line: useRedis define hone ke BAAD hi rakhna
console.log("useRedis =", useRedis, "| REDIS_URL =", REDIS_URL, "| DISABLE =", process.env.DISABLE_REDIS)

// Redis modules tabhi load honge jab useRedis true ho
const redisModules = useRedis
  ? [
      {
        resolve: "@medusajs/medusa/event-bus-redis",
        options: { redisUrl: REDIS_URL },
      },
      {
        resolve: "@medusajs/medusa/workflow-engine-redis",
        // Medusa purana ho (< v2.12.2) to redisUrl ki jagah url likhna
        options: { redis: { redisUrl: REDIS_URL } },
      },
      {
        resolve: "@medusajs/medusa/locking",
        options: {
          providers: [
            {
              resolve: "@medusajs/medusa/locking-redis",
              id: "locking-redis",
              is_default: true,
              options: { redisUrl: REDIS_URL },
            },
          ],
        },
      },
    ]
  : []

export default defineConfig({
  admin: {
    disable: false,
    backendUrl: process.env.MEDUSA_BACKEND_URL,
  },

  projectConfig: {
    // Redis sirf tab jab enabled ho
    ...(useRedis ? { redisUrl: REDIS_URL } : {}),

    http: {
      storeCors: process.env.STORE_CORS || "http://localhost:8000,http://localhost:7001",
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET!,
      cookieSecret: process.env.COOKIE_SECRET!,
    },
  },

  modules: [
    // Redis event bus, workflow engine, locking (conditional)
    ...redisModules,

    // Product images / file storage (unchanged)
    {
      resolve: "@medusajs/medusa/file",
      options: {
        providers: [
          {
            resolve: "@medusajs/medusa/file-s3",
            id: "s3",
            options: {
              file_url: process.env.S3_FILE_URL!,
              access_key_id: process.env.S3_ACCESS_KEY_ID!,
              secret_access_key: process.env.S3_SECRET_ACCESS_KEY!,
              region: process.env.S3_REGION!,
              bucket: process.env.S3_BUCKET!,
              endpoint: process.env.S3_ENDPOINT!,

              additional_client_config: {
                forcePathStyle: true,
              },
            },
          },
        ],
      },
    },

    // Existing Testimonials module (unchanged)
    {
      resolve: "./src/modules/testimonials",
    },
  ],
})