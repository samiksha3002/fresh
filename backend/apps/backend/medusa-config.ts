import { defineConfig } from "@medusajs/framework/utils"

export default defineConfig({
  admin: {
    disable: true,
  },

  projectConfig: {
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
    },
  },
})