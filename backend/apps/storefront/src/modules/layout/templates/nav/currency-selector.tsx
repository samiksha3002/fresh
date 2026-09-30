"use client"

import { usePathname, useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { updateRegion } from "@lib/data/cart"

type Region = {
  id: string
  currency_code?: string
  countries?: Array<{
    iso_2?: string
    display_name?: string
  }>
}

type CurrencySelectorProps = {
  regions: Region[] | null
}

/* ============================================================
   KOVEA TOUCH — ONLY 3 MARKETS
============================================================ */

const countries = [
  {
    code: "us",
    name: "United States",
    currency: "USD $",
  },
  {
    code: "au",
    name: "Australia",
    currency: "AUD $",
  },
  {
    code: "gb",
    name: "United Kingdom",
    currency: "GBP £",
  },
]

const allowedCountries = ["us", "au", "gb"]

/* ============================================================
   COMPONENT
============================================================ */

export default function CurrencySelector({
  regions,
}: CurrencySelectorProps) {
  const pathname = usePathname()
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  /* ==========================================================
     CURRENT COUNTRY FROM URL
  ========================================================== */

  const pathParts = pathname
    .split("/")
    .filter(Boolean)

  const urlCountry =
    pathParts[0]?.toLowerCase() || "us"

  const currentCountry = allowedCountries.includes(
    urlCountry
  )
    ? urlCountry
    : "us"

  const currentCountryData =
    countries.find(
      (country) =>
        country.code === currentCountry
    ) || countries[0]

  /* ==========================================================
     FIND CURRENT REGION / CURRENCY FROM MEDUSA
  ========================================================== */

  const currentRegion = regions?.find((region) =>
    region.countries?.some(
      (country) =>
        country.iso_2?.toLowerCase() ===
        currentCountry
    )
  )

  const currentCurrency =
    currentRegion?.currency_code?.toUpperCase() ||
    currentCountryData.currency

  /* ==========================================================
     CHANGE COUNTRY
  ========================================================== */

  const handleCountryChange = (
    countryCode: string
  ) => {
    setOpen(false)

    if (
      !countryCode ||
      countryCode === currentCountry
    ) {
      return
    }

    startTransition(async () => {
      try {
        await updateRegion(
          countryCode,
          pathname
        )
      } catch (error) {
        console.error(
          "Failed to change country:",
          error
        )

        router.refresh()
      }
    })
  }

  /* ==========================================================
     RENDER
  ========================================================== */

  return (
    <div className="relative hidden small:block">

      {/* ======================================================
          CURRENT COUNTRY
      ====================================================== */}

      <button
        type="button"
        onClick={() =>
          setOpen((value) => !value)
        }
        disabled={isPending}
        className="
          flex
          items-center
          gap-2
          whitespace-nowrap
          text-[13px]
          tracking-[0.01em]
          theme-text-muted
          hover:theme-text
          transition-colors
        "
        aria-label="Select country"
        aria-expanded={open}
      >

        <span>
          {currentCountryData.name}
        </span>

        <span className="text-black/25">
          |
        </span>

        <span>
          {currentCurrency}
        </span>

        {/* Chevron */}
        <svg
          className={`
            w-3
            h-3
            ml-0.5
            transition-transform
            duration-200
            ${
              open
                ? "rotate-180"
                : ""
            }
          `}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.6"
            d="M6 9l6 6 6-6"
          />
        </svg>

      </button>

      {/* ======================================================
          DROPDOWN
      ====================================================== */}

      {open && (
        <>

          {/* Invisible backdrop */}
          <button
            type="button"
            aria-label="Close country menu"
            className="
              fixed
              inset-0
              z-40
              cursor-default
            "
            onClick={() =>
              setOpen(false)
            }
          />

          {/* ==================================================
              PREMIUM COUNTRY MENU
          ================================================== */}

          <div
            className="
              absolute
              right-0
              top-[calc(100%+12px)]
              z-50
              w-[220px]
              bg-white
              border
              border-black/[0.08]
              shadow-[0_18px_45px_rgba(0,0,0,0.10)]
              rounded-[4px]
              overflow-hidden
            "
          >

            {/* Header */}
            <div
              className="
                px-5
                py-4
                border-b
                border-black/[0.07]
              "
            >
              <p
                className="
                  text-[9px]
                  uppercase
                  tracking-[0.22em]
                  text-[#9a9088]
                "
              >
                Shopping from
              </p>
            </div>

            {/* =================================================
                ONLY 3 COUNTRIES
                NO SCROLL
            ================================================= */}

            <div className="p-2">

              {countries.map(
                (country) => {

                  const isActive =
                    country.code ===
                    currentCountry

                  return (
                    <button
                      key={
                        country.code
                      }
                      type="button"
                      onClick={() =>
                        handleCountryChange(
                          country.code
                        )
                      }
                      disabled={isPending}
                      className={`
                        w-full
                        flex
                        items-center
                        justify-between
                        px-4
                        py-3.5
                        rounded-[3px]
                        text-left
                        transition-colors
                        duration-200
                        ${
                          isActive
                            ? "bg-[#f7f4f0]"
                            : "bg-white hover:bg-[#faf9f6]"
                        }
                      `}
                    >

                      <span
                        className="
                          text-[13px]
                          text-[#2b2724]
                          font-normal
                        "
                      >
                        {country.name}
                      </span>

                      {/* Active check */}
                      {isActive && (
                        <svg
                          className="
                            w-[15px]
                            h-[15px]
                            text-[#766c63]
                          "
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}

                    </button>
                  )
                }
              )}

            </div>

            {/* Subtle loading */}
            {isPending && (
              <div
                className="
                  px-5
                  py-2.5
                  border-t
                  border-black/[0.06]
                  bg-[#faf9f6]
                "
              >
                <p
                  className="
                    text-[9px]
                    uppercase
                    tracking-[0.15em]
                    text-[#9a9088]
                  "
                >
                  Updating...
                </p>
              </div>
            )}

          </div>

        </>
      )}

    </div>
  )
}