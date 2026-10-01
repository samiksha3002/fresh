
"use client"

import { ReactNode, useEffect, useRef, useState } from "react"

export default function ScrollNav({
  children,
}: {
  children: ReactNode
}) {
  const [visible, setVisible] = useState(true)

  const lastScrollY = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    // Initialize the scroll position when the component mounts.
    lastScrollY.current = window.scrollY

    const handleScroll = () => {
      if (ticking.current) return

      ticking.current = true

      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY
        const previousScrollY = lastScrollY.current

        // Always show the navbar at the top.
        if (currentScrollY <= 20) {
          setVisible(true)
          lastScrollY.current = currentScrollY
          ticking.current = false
          return
        }

        const difference = currentScrollY - previousScrollY

        // Ignore tiny movements to prevent flickering.
        if (Math.abs(difference) > 6) {
          if (difference > 0) {
            // Scrolling down: hide navbar.
            setVisible(false)
          } else {
            // Scrolling up: show navbar.
            setVisible(true)
          }

          lastScrollY.current = currentScrollY
        }

        ticking.current = false
      })
    }

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div
      className={`
        fixed
        top-0
        inset-x-0
        z-50
        w-full
        font-sans
        bg-white
        text-[#2b2724]
        border-b
        border-[#e9e4de]
        shadow-sm
        transition-transform
        duration-300
        ease-out
        ${
          visible
            ? "translate-y-0"
            : "-translate-y-full"
        }
      `}
      style={{
        backgroundColor: "#ffffff",
        opacity: 1,
        isolation: "isolate",
      }}
    >
      {children}
    </div>
  )
}
