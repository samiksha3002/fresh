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
    const handleScroll = () => {
      if (ticking.current) return

      ticking.current = true

      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY
        const previousScrollY = lastScrollY.current

        // Always show at the very top
        if (currentScrollY <= 20) {
          setVisible(true)
          lastScrollY.current = currentScrollY
          ticking.current = false
          return
        }

        const difference = currentScrollY - previousScrollY

        // Ignore tiny movements
        if (Math.abs(difference) > 6) {
          if (difference > 0) {
            // Scrolling DOWN
            setVisible(false)
          } else {
            // Scrolling UP
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
        sticky
        top-0
        inset-x-0
        z-50
        font-sans
        transition-transform
        duration-300
        ease-out
        ${
          visible
            ? "translate-y-0"
            : "-translate-y-full"
        }
      `}
    >
      {children}
    </div>
  )
}