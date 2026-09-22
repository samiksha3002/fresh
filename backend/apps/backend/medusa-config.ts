import { defineConfig } from "@medusajs/framework/utils"

export default defineConfig({
  admin: {
    disable: false,
    backendUrl: process.env.MEDUSA_BACKEND_URL,
  },

  projectConfig: {
    http: {
      storeCors: process.env.STORE_CORS  || "http://localhost:8000,http://localhost:7001",
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET!,
      cookieSecret: process.env.COOKIE_SECRET!,
    },
  },

  modules: {
    // Product images / file storage
    file: {
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

    // Existing Testimonials module — unchanged
    testimonials: {
      resolve: "./src/modules/testimonials",
    },
  },
})