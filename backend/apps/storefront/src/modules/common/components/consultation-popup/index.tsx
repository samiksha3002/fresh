"use client"

import { useEffect, useState } from "react"

const CONSULTATION_EMAIL = "support@koveatouch.com"

const EMAIL_SUBJECT = "Kovea Touch — Product Consultation"

const EMAIL_BODY = `Hi Kovea Touch,

I would like some guidance regarding your products.

My question is:

Thank you.`

export default function ConsultationPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const openEmail = () => {
    const mailtoUrl = `mailto:${CONSULTATION_EMAIL}?subject=${encodeURIComponent(
      EMAIL_SUBJECT
    )}&body=${encodeURIComponent(EMAIL_BODY)}`

    window.location.href = mailtoUrl
  }

  if (!showButton) return null

  return (
    <div className="fixed bottom-[92px] right-5 z-[99] sm:bottom-[98px] sm:right-6">
      {/* ====================================================== */}
      {/* CONSULTATION POPUP */}
      {/* ====================================================== */}

      {isOpen && (
        <div className="absolute bottom-[70px] right-0 w-[310px] overflow-hidden rounded-[20px] border border-[#2b2724]/10 bg-white shadow-[0_16px_50px_rgba(43,39,36,0.18)]">
          {/* Header */}
          <div className="flex items-start justify-between border-b border-[#2b2724]/10 px-5 py-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-[#96745c]">
                Kovea Touch
              </p>

              <h3 className="mt-1.5 text-[18px] font-medium tracking-[-0.01em] text-[#2b2724]">
                Let&apos;s help you find the right choice
              </h3>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close consultation"
              className="ml-3 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[#766c63] transition-all duration-200 hover:bg-[#f7f3ee] hover:text-[#2b2724]"
            >
              <span className="text-xl font-light leading-none">×</span>
            </button>
          </div>

          {/* Content */}
          <div className="px-5 py-5">
            <p className="text-[13px] leading-[1.7] text-[#766c63]">
              Have a question about a product, your skincare routine, or what
              might suit your needs?
            </p>

            <p className="mt-2 text-[13px] leading-[1.7] text-[#766c63]">
              Send us your question and our team will be happy to guide you.
            </p>

            {/* Email Button */}
            <button
              type="button"
              onClick={openEmail}
              className="mt-5 flex w-full items-center justify-center gap-2.5 rounded-full bg-[#2b2724] px-5 py-3.5 text-[13px] font-medium tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#765d49] hover:shadow-[0_8px_22px_rgba(43,39,36,0.18)]"
            >
              {/* Mail Icon */}
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <rect
                  x="3"
                  y="5"
                  width="18"
                  height="14"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />

                <path
                  d="M4 7L12 13L20 7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              Email Our Team
            </button>
          </div>
        </div>
      )}

      {/* ====================================================== */}
      {/* ICON-ONLY FLOATING BUTTON */}
      {/* ====================================================== */}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Contact Kovea Touch"
        title="Contact Kovea Touch"
        className={`group flex h-14 w-14 items-center justify-center rounded-full border transition-all duration-300 sm:h-[58px] sm:w-[58px] ${
          isOpen
            ? "border-[#2b2724] bg-[#2b2724] text-white shadow-[0_10px_30px_rgba(43,39,36,0.24)]"
            : "border-[#2b2724]/10 bg-white text-[#2b2724] shadow-[0_8px_25px_rgba(43,39,36,0.14)] hover:-translate-y-0.5 hover:border-[#2b2724]/20 hover:bg-[#f7f3ee] hover:shadow-[0_12px_32px_rgba(43,39,36,0.20)]"
        }`}
      >
        {isOpen ? (
          <span className="text-[25px] font-light leading-none">×</span>
        ) : (
          /* Premium Mail Icon */
          <svg
            width="23"
            height="23"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:scale-105"
          >
            <rect
              x="3"
              y="5"
              width="18"
              height="14"
              rx="2.5"
              stroke="currentColor"
              strokeWidth="1.5"
            />

            <path
              d="M4.5 7L12 12.7L19.5 7"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
    </div>
  )
}