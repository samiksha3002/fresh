"use client"

import { useState, useEffect } from "react"

const ANNOUNCEMENTS = [
  <>✨ Free shipping on all orders over $50 | Use code <span className="underline font-bold text-white">GLOW20</span> for 20% off</>,
  <>🌿 Formulated for sensitive skin | Dermatologist Approved</>,
  <>💫 New Arrivals: Shop the Advanced Anti-Aging Collection</>
]

export default function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setIsVisible(false)

      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % ANNOUNCEMENTS.length)
        setIsVisible(true)
      }, 500)

    }, 5000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="bg-black text-white text-xs py-2 px-4 text-center font-medium tracking-wide h-[32px] flex items-center justify-center overflow-hidden">
      <div
        className={`transition-opacity duration-500 ease-in-out ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {ANNOUNCEMENTS[currentIndex]}
      </div>
    </div>
  )
}