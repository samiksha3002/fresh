import { defineConfig } from "@medusajs/framework/utils"

export default defineConfig({
  admin: {
    // Render par true aur Vercel par false rahega
    disable: process.env.DISABLE_ADMIN === "true",
    // Admin ko batana zaroori hai ki API kahan host hai
    backendUrl: process.env.MEDUSA_BACKEND_URL,
  },

  projectConfig: {
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
    },
  },
})