
"use client"

import { useEffect, useState } from "react"

export default function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    try {
      if (sessionStorage.getItem("kt-welcome-popup-dismissed")) {
        return
      }
    } catch {
      // Continue if browser storage is unavailable.
    }

    const timer = window.setTimeout(() => setIsOpen(true), 4000)

    return () => window.clearTimeout(timer)
  }, [])

  const closePopup = () => {
    setIsOpen(false)

    try {
      sessionStorage.setItem("kt-welcome-popup-dismissed", "true")
    } catch {
      // The popup can still be closed without storage.
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // UI only: connect a newsletter API before collecting real subscriptions.
    setSubmitted(true)
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/55 p-4 backdrop-blur-[2px]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closePopup()
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="kt-welcome-title"
        className="relative w-full max-w-[440px] overflow-visible bg-[var(--kt-white,#fff)] shadow-2xl"
      >
        <button
          type="button"
          onClick={closePopup}
          aria-label="Close welcome offer"
          className="absolute -right-3 -top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-xl text-[#25231f] shadow-md transition-transform hover:rotate-90"
        >
          ×
        </button>

        <div className="bg-[var(--kt-sand,#f2ece5)] px-6 py-9 text-center sm:px-10">
          <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.3em] text-[var(--kt-accent,#96745c)]">
            A little something for you
          </p>

          <h2
            id="kt-welcome-title"
            className="text-[32px] font-normal tracking-[-0.04em] text-[var(--kt-primary,#2b2724)] sm:text-[38px]"
          >
            Get 10% Off
          </h2>

          <p className="mx-auto mt-3 max-w-[300px] text-[12px] leading-6 text-[var(--kt-secondary,#766c63)]">
            Join the Kovea Touch community for skincare discoveries and
            updates made for your routine.
          </p>

          <div className="mx-auto mt-6 flex h-16 w-16 items-center justify-center rounded-full border border-[var(--kt-beige,#d8c9be)] bg-white text-3xl text-[var(--kt-accent,#96745c)]">
            ✉
          </div>
        </div>

        <div className="px-6 pb-7 pt-6 sm:px-9">
          {submitted ? (
            <div className="py-5 text-center">
              <p className="text-sm font-medium text-[var(--kt-primary,#2b2724)]">
                Thank you for your interest!
              </p>
              <p className="mt-2 text-xs text-[var(--kt-secondary,#766c63)]">
                Newsletter signup will be available once connected.
              </p>
              <button
                type="button"
                onClick={closePopup}
                className="mt-5 text-xs underline underline-offset-4"
              >
                Continue shopping
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <label htmlFor="kt-welcome-email" className="sr-only">
                Email address
              </label>

              <input
                id="kt-welcome-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email address"
                className="w-full border border-[var(--kt-border-strong,rgba(43,39,36,.18))] bg-[var(--kt-cream,#faf9f6)] px-4 py-3.5 text-sm outline-none transition-colors placeholder:text-[#999188] focus:border-[var(--kt-accent,#96745c)]"
              />

              <button
                type="submit"
                className="mt-3 w-full bg-[var(--kt-primary,#2b2724)] px-4 py-3.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-[var(--kt-accent,#96745c)]"
              >
                Unlock My Welcome Offer
              </button>

              <p className="mt-4 text-center text-[10px] leading-5 text-[var(--kt-secondary,#766c63)]">
                By signing up, you agree to receive Kovea Touch updates.
                You can unsubscribe at any time.
              </p>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}
