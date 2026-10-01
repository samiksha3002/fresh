
import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import { Noto_Sans } from "next/font/google"

import "styles/globals.css"

import WhatsAppPopup from "@modules/common/components/whatsapp-popup"
import ConsultationPopup from "@modules/common/components/consultation-popup"

const notoSans = Noto_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-sans",
})

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <body className={notoSans.variable}>
        <main className="relative">
          {props.children}
        </main>

        <ConsultationPopup />
        <WhatsAppPopup />
      </body>
    </html>
  )
}
