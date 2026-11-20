"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import { setEcommerceConsent } from "@lib/util/ecommerce"
import {
  analyticsPath,
  AnalyticsConsent,
  clearAnalyticsCookies,
  CONSENT_KEY,
  MEASUREMENT_ID,
  readConsent,
} from "@lib/util/analytics"

type AnalyticsWindow = Window & {
  dataLayer?: unknown[]
  gtag?: (...args: unknown[]) => void
  "ga-disable-G-LL0GGMMC7N"?: boolean
}

const advertisingDenied = {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
}

export default function AnalyticsConsentBanner() {
  const pathname = usePathname()
  const [consent, setConsent] = useState<AnalyticsConsent | null>(null)
  const [ready, setReady] = useState(false)
  const [open, setOpen] = useState(false)
  const [storageFailed, setStorageFailed] = useState(false)
  const lastPath = useRef<string | null>(null)
  const preferencesButton = useRef<HTMLButtonElement>(null)
  const acceptButton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const saved = readConsent()
    setConsent(saved)
    setOpen(saved === null)
    setReady(true)
    // Another tab can withdraw consent from this tab too.
    const sync = (event: StorageEvent) => {
      if (event.key === CONSENT_KEY || event.key === null) {
        const value = readConsent()
        if (value !== "accepted") setEcommerceConsent(false)
        setConsent(value)
        setOpen(value === null)
      }
    }
    window.addEventListener("storage", sync)
    return () => window.removeEventListener("storage", sync)
  }, [])

  useEffect(() => {
    if (!ready) return
    const analytics = window as AnalyticsWindow
    const disabledKey = `ga-disable-${MEASUREMENT_ID}` as const
    if (consent !== "accepted") {
      setEcommerceConsent(false)
      // Disable collection before updating consent: no cookieless analytics pings.
      analytics[disabledKey] = true
      const frame = document.getElementById(
        "fresh-ga4"
      ) as HTMLIFrameElement | null
      if (frame?.contentWindow) {
        const tagWindow = frame.contentWindow as AnalyticsWindow
        tagWindow[disabledKey] = true
      }
      analytics.gtag?.("consent", "update", {
        ...advertisingDenied,
        analytics_storage: "denied",
      })
      // Discard any commands still waiting for a slow/blocked script download.
      analytics.dataLayer?.splice(0)
      frame?.remove()
      delete analytics.gtag
      delete analytics.dataLayer
      clearAnalyticsCookies()
      lastPath.current = null
      return
    }

    analytics[disabledKey] = false
    if (!analytics.gtag) {
      analytics.dataLayer = []
      analytics.gtag = function () {
        analytics.dataLayer!.push(arguments)
      }
      analytics.gtag("consent", "default", {
        ...advertisingDenied,
        analytics_storage: "denied",
      })
      analytics.gtag("set", {
        send_page_view: false,
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
        ads_data_redaction: true,
        page_location: `${window.location.origin}${analyticsPath(
          window.location.pathname
        )}`,
        page_referrer: "",
        page_title: "Storefront",
      })
      analytics.gtag("js", new Date())
    }
    analytics.gtag("consent", "update", {
      ...advertisingDenied,
      analytics_storage: "granted",
    })
    analytics.gtag("config", MEASUREMENT_ID, {
      send_page_view: false,
      page_location: `${window.location.origin}${analyticsPath(
        window.location.pathname
      )}`,
      page_referrer: "",
      page_title: "Storefront",
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    })
    if (!document.getElementById("fresh-ga4")) {
      // Keep Google's remotely configured Enhanced Measurement away from the
      // storefront's history, forms and links. Only sanitized commands enter
      // this same-origin, empty document; GA cookies still use our origin.
      const frame = document.createElement("iframe")
      frame.id = "fresh-ga4"
      frame.title = "Analytics"
      frame.hidden = true
      frame.setAttribute("aria-hidden", "true")
      frame.referrerPolicy = "no-referrer"
      frame.src = "/assets/analytics-frame.html"
      frame.onload = () => {
        if (analytics[disabledKey] || !frame.isConnected) return
        const tagWindow = frame.contentWindow as AnalyticsWindow
        const tagDocument = frame.contentDocument!
        const bootstrap = tagDocument.createElement("script")
        bootstrap.textContent =
          "window.dataLayer = []; window.gtag = function () { window.dataLayer.push(arguments) }"
        tagDocument.head.appendChild(bootstrap)
        const tag = tagWindow.gtag!
        analytics.dataLayer?.forEach((command) =>
          tag.apply(tagWindow, Array.from(command as IArguments))
        )
        analytics.gtag = function () {
          analytics.dataLayer!.push(arguments)
          tag.apply(tagWindow, Array.from(arguments))
        }
        const script = tagDocument.createElement("script")
        script.async = true
        script.referrerPolicy = "no-referrer"
        script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`
        tagDocument.head.appendChild(script)
      }
      document.body.appendChild(frame)
    }
    setEcommerceConsent(true)
  }, [consent, ready])

  useEffect(() => {
    if (!ready || consent !== "accepted") return
    const analytics = window as AnalyticsWindow
    // Compare real paths locally, but send only the redacted path. Query/hash
    // changes and React Strict Mode effect replays must not add page views.
    if (lastPath.current !== pathname) {
      analytics.gtag?.(
        "set",
        "page_location",
        `${window.location.origin}${analyticsPath(pathname)}`
      )
      analytics.gtag?.("event", "page_view", {
        send_to: MEASUREMENT_ID,
        page_location: `${window.location.origin}${analyticsPath(pathname)}`,
        page_referrer: "",
        page_title: "Storefront",
      })
      lastPath.current = pathname
    }
  }, [consent, pathname, ready])

  function choose(value: AnalyticsConsent) {
    if (value === "rejected") setEcommerceConsent(false)
    try {
      localStorage.setItem(CONSENT_KEY, value)
      setStorageFailed(false)
    } catch {
      setStorageFailed(true)
    }
    setConsent(value)
    setOpen(false)
    preferencesButton.current?.focus()
  }

  if (!ready) return null

  const buttonClass =
    "min-h-11 rounded border border-[#2b2724] px-4 py-2 text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2b2724]"

  return (
    <>
      <button
        ref={preferencesButton}
        type="button"
        aria-expanded={open}
        aria-controls="cookie-preferences"
        onClick={() => {
          setOpen(true)
          requestAnimationFrame(() => acceptButton.current?.focus())
        }}
        className="fixed bottom-3 left-3 z-[110] min-h-11 rounded border border-[#2b2724]/30 bg-white px-3 py-2 text-xs text-[#2b2724] shadow focus-visible:outline focus-visible:outline-2"
      >
        Cookie preferences
      </button>
      {storageFailed && !open && (
        <p
          role="status"
          className="fixed bottom-16 left-3 z-[110] max-w-xs rounded bg-white p-3 text-xs text-[#2b2724] shadow"
        >
          Your choice applies to this tab. Browser storage is unavailable, so we
          will ask again next visit.
        </p>
      )}
      {open && (
        <section
          id="cookie-preferences"
          aria-labelledby="cookie-preferences-title"
          className="fixed inset-x-0 bottom-0 z-[120] max-h-[85dvh] overflow-y-auto border-t border-[#2b2724]/20 bg-[#faf8f5] p-4 text-[#2b2724] shadow-xl sm:p-6"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl">
              <h2
                id="cookie-preferences-title"
                className="text-base font-semibold"
              >
                Cookie preferences
              </h2>
              <p className="mt-2 text-sm leading-6">
                Essential cookies keep your cart and sign-in working. With your
                permission, we use Google Analytics to understand page visits.
                Advertising tracking stays off. You can change or withdraw your
                choice here at any time.
              </p>
              <p className="mt-1 text-xs" role="status">
                Analytics: {consent === "accepted" ? "on" : "off"}. Advertising:
                off.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2">
              <button
                ref={acceptButton}
                type="button"
                className={`${buttonClass} bg-[#2b2724] text-white`}
                onClick={() => choose("accepted")}
              >
                Accept analytics
              </button>
              <button
                type="button"
                className={`${buttonClass} bg-white`}
                onClick={() => choose("rejected")}
              >
                {consent === "accepted"
                  ? "Withdraw consent"
                  : "Reject analytics"}
              </button>
              {consent !== null && (
                <button
                  type="button"
                  className={buttonClass}
                  onClick={() => {
                    setOpen(false)
                    preferencesButton.current?.focus()
                  }}
                >
                  Close
                </button>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
