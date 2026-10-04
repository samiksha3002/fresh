
import { defineConfig, loadEnv } from "@medusajs/framework/utils"

// Load environment variables before evaluating the config
loadEnv(process.env.NODE_ENV || "development", process.cwd())

// Existing Redis configuration
const REDIS_URL = process.env.REDIS_URL

const useRedis =
  !!REDIS_URL && process.env.DISABLE_REDIS !== "true"

// Dedicated cache URL is optional; REDIS_URL is the fallback
const CACHE_REDIS_URL =
  process.env.CACHE_REDIS_URL || REDIS_URL

// Enable Medusa caching only when explicitly enabled and Redis is available
const useCaching =
  process.env.MEDUSA_FF_CACHING === "true" &&
  !!CACHE_REDIS_URL &&
  process.env.DISABLE_REDIS !== "true"

// Do not print Redis URLs because they may contain credentials
console.log("Redis configured:", useRedis)
console.log("Redis caching enabled:", useCaching)

// Existing Redis modules
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

// Redis caching provider
const cachingModules = useCaching
  ? [
      {
        resolve: "@medusajs/medusa/caching",
        options: {
          providers: [
            {
              resolve: "@medusajs/caching-redis",
              id: "caching-redis",
              is_default: true,
              options: {
                redisUrl: CACHE_REDIS_URL,
              },
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
    ...(useRedis ? { redisUrl: REDIS_URL } : {}),

    http: {
      storeCors:
        process.env.STORE_CORS ||
        "http://localhost:8000,http://localhost:7001",

      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET!,
      cookieSecret: process.env.COOKIE_SECRET!,
    },
  },

  modules: [
    // Existing Redis event bus, workflow engine and locking
    ...redisModules,

    // Redis caching, enabled conditionally
    ...cachingModules,

    // Existing S3 file storage
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

    // Existing Testimonials module
    {
      resolve: "./src/modules/testimonials",
    },
  ],
})
