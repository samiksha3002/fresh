import { defineConfig } from "@medusajs/framework/utils"

// Redis modules tabhi load honge jab REDIS_URL set ho
// (local me REDIS_URL na ho to sab pehle jaisa chalega)
const redisModules = process.env.REDIS_URL
  ? [
      {
        resolve: "@medusajs/medusa/event-bus-redis",
        options: { redisUrl: process.env.REDIS_URL },
      },
      {
        resolve: "@medusajs/medusa/workflow-engine-redis",
        // Medusa purana ho (< v2.12.2) to redisUrl ki jagah url likhna
        options: { redis: { redisUrl: process.env.REDIS_URL } },
      },
      {
        resolve: "@medusajs/medusa/locking",
        options: {
          providers: [
            {
              resolve: "@medusajs/medusa/locking-redis",
              id: "locking-redis",
              is_default: true,
              options: { redisUrl: process.env.REDIS_URL },
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
    // NEW: Redis
    redisUrl: process.env.REDIS_URL,

    http: {
      storeCors: process.env.STORE_CORS  || "http://localhost:8000,http://localhost:7001",
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET!,
      cookieSecret: process.env.COOKIE_SECRET!,
    },
  },

  modules: [
    // NEW: Redis event bus, workflow engine, locking
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