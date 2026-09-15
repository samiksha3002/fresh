"use client"

import { useState, useEffect } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"

// Yahan aap apne 5-5 second wale alag-alag texts aur images define kar sakte hain
const heroSlides = [
  {
    id: 1,
    rating: "4.9 (840+ Glowing Reviews)",
    title: ["Pure.", "Radiant.", "Skincare."],
    description: "Elevate your daily routine with clean, nourishing formulations designed specifically for healthy, glowing skin.",
    buttonText: "SHOP SKINCARE",
    buttonLink: "/store",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: 2,
    rating: "5.0 (1.2k+ Verified Users)",
    title: ["Defy.", "Restore.", "Protect."],
    description: "Discover our age-defying serums and moisturizers, crafted to restore your skin's natural barrier and youthful glow.",
    buttonText: "EXPLORE SERUMS",
    buttonLink: "/store?category=serums-retinoids",
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: 3,
    rating: "4.8 (500+ Happy Customers)",
    title: ["Cleanse.", "Refresh.", "Revive."],
    description: "Wash away the day with our gentle, hydrating cleansers, leaving your skin feeling fresh and deeply purified.",
    buttonText: "SHOP CLEANSERS",
    buttonLink: "/store?category=cleansers-body-washes",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=1200",
  }
]

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto-play logic: Har 5 seconds (5000ms) mein slide change karega
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % heroSlides.length)
    }, 5000)

    // Component unmount hone par timer clear karna zaroori hai
    return () => clearInterval(timer)
  }, [])

  const activeData = heroSlides[currentSlide]

  return (
    <div className="relative bg-[#fcfbf9] w-full pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      <div className="content-container mx-auto px-6 md:px-8 max-w-7xl">
        
        {/* The 'key' prop forces React to re-run the animations every time currentSlide changes */}
        <div key={currentSlide} className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* LEFT: Text Content with Staggered Slide-Up */}
          <div className="flex flex-col items-start z-10">
            
            {/* Reviews / Stars */}
            <div className="flex items-center gap-2 mb-6 opacity-0 animate-[slideUpFade_1s_ease-out_0.2s_forwards]">
              <div className="flex text-amber-500 text-lg">
                ★★★★★
              </div>
              <span className="text-zinc-600 text-sm font-medium">
                {activeData.rating}
              </span>
            </div>
            
            {/* Main Title */}
            <h1 className="text-5xl md:text-6xl lg:text-[5.5rem] font-serif text-zinc-900 leading-[1.05] tracking-tight mb-6 opacity-0 animate-[slideUpFade_1s_ease-out_0.4s_forwards]">
              {activeData.title.map((line, index) => (
                <span key={index}>
                  {line}
                  {index !== activeData.title.length - 1 && <br />}
                </span>
              ))}
            </h1>
            
            {/* Description */}
            <p className="text-zinc-600 text-base md:text-lg mb-10 max-w-md font-light leading-relaxed opacity-0 animate-[slideUpFade_1s_ease-out_0.6s_forwards]">
              {activeData.description}
            </p>
            
            {/* Button */}
            <div className="opacity-0 animate-[slideUpFade_1s_ease-out_0.8s_forwards]">
              <LocalizedClientLink
                href={activeData.buttonLink}
                className="inline-block bg-[#0f172a] text-white px-8 py-4 rounded-full text-sm font-medium tracking-wide transition-all duration-300 hover:bg-zinc-800 hover:shadow-xl hover:-translate-y-1 active:scale-95"
              >
                {activeData.buttonText}
              </LocalizedClientLink>
            </div>
          </div>

          {/* RIGHT: Image with Soft Zoom and Float Animation */}
          <div className="relative w-full aspect-[4/5] md:aspect-[3/4] lg:aspect-[4/5] opacity-0 animate-[fadeIn_1.5s_ease-out_0.5s_forwards]">
            <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] bg-zinc-100">
              <Image
                src={activeData.image}
                alt={`Skincare slide ${currentSlide + 1}`}
                fill
                className="object-cover object-center animate-[softZoom_20s_ease-in-out_infinite]"
                priority
              />
            </div>
            
            {/* Decorative soft glow behind the image */}
            <div className="absolute -inset-4 bg-zinc-200/50 rounded-[2.5rem] -z-10 blur-2xl opacity-50"></div>
          </div>

        </div>

        {/* Carousel Dots Navigation at the bottom */}
        <div className="flex justify-center items-center gap-3 mt-16 z-20 relative">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-500 rounded-full ${
                currentSlide === index 
                  ? "w-8 h-2 bg-zinc-800" 
                  : "w-2 h-2 bg-zinc-300 hover:bg-zinc-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

      </div>

      {/* Global Animation Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideUpFade {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          0% { opacity: 0; transform: scale(0.98); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes softZoom {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
      `}} />
    </div>
  )
}

export default Hero