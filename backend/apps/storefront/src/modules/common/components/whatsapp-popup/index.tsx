"use client"

import { useEffect, useState } from "react"

const WHATSAPP_NUMBER = "918668782155"

const MESSAGE = "Hi Kovea Touch, I need help choosing a product."

export default function WhatsAppPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const openWhatsApp = () => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      MESSAGE
    )}`

    window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {/* WhatsApp Popup */}
      {showPopup && isOpen && (
        <div className="absolute bottom-[72px] right-0 w-[300px] overflow-hidden rounded-2xl border border-[#2b2724]/10 bg-white shadow-[0_12px_40px_rgba(43,39,36,0.16)]">
          {/* Header */}
          <div className="flex items-start justify-between border-b border-[#2b2724]/10 px-5 py-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#96745c]">
                Kovea Touch
              </p>

              <h3 className="mt-1 text-[17px] font-medium text-[#2b2724]">
                Need some help?
              </h3>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close WhatsApp popup"
              className="flex h-7 w-7 items-center justify-center rounded-full text-[#766c63] transition-colors hover:bg-[#f7f3ee] hover:text-[#2b2724]"
            >
              <span className="text-xl leading-none">×</span>
            </button>
          </div>

          {/* Content */}
          <div className="px-5 py-4">
            <p className="text-sm leading-6 text-[#766c63]">
              Have a question about a product, order, or which skincare option
              is right for you?
            </p>

            <button
              type="button"
              onClick={openWhatsApp}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#2b2724] px-5 py-3 text-sm text-white transition-colors duration-200 hover:bg-[#765d49]"
            >
              {/* WhatsApp Icon */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.49 0 .14 5.34.14 11.91c0 2.1.55 4.15 1.6 5.96L.04 24l6.27-1.64a11.91 11.91 0 0 0 5.75 1.47h.01c6.56 0 11.9-5.34 11.9-11.91 0-3.18-1.24-6.16-3.45-8.44ZM12.07 21.84h-.01a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.72.97.99-3.63-.23-.37a9.9 9.9 0 0 1-1.52-5.31C2.17 6.44 6.61 2 12.06 2c2.64 0 5.12 1.03 6.99 2.9a9.84 9.84 0 0 1 2.9 7c0 5.47-4.44 9.91-9.88 9.94Zm5.43-7.43c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.48-1.75-1.65-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.49 1.7.63.72.23 1.37.2 1.89.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z"
                  fill="currentColor"
                />
              </svg>

              Chat with us on WhatsApp
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Chat with Kovea Touch on WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_25px_rgba(37,211,102,0.28)] transition-all duration-300 hover:scale-105"
      >
        {isOpen ? (
          <span className="text-2xl font-light leading-none">×</span>
        ) : (
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.49 0 .14 5.34.14 11.91c0 2.1.55 4.15 1.6 5.96L.04 24l6.27-1.64a11.91 11.91 0 0 0 5.75 1.47h.01c6.56 0 11.9-5.34 11.9-11.91 0-3.18-1.24-6.16-3.45-8.44ZM12.07 21.84h-.01a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.72.97.99-3.63-.23-.37a9.9 9.9 0 0 1-1.52-5.31C2.17 6.44 6.61 2 12.06 2c2.64 0 5.12 1.03 6.99 2.9a9.84 9.84 0 0 1 2.9 7c0 5.47-4.44 9.91-9.88 9.94Zm5.43-7.43c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.48-1.75-1.65-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.49 1.7.63.72.23 1.37.2 1.89.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z"
              fill="currentColor"
            />
          </svg>
        )}
      </button>
    </div>
  )
}