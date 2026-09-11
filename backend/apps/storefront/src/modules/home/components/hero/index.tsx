import { Button } from "@medusajs/ui"

const Hero = () => {
  return (
    <div className="relative w-full bg-[#fcf8f5] border-b border-gray-200 overflow-hidden">
      <div className="content-container mx-auto flex flex-col lg:flex-row items-center justify-between py-16 lg:py-24 px-6 md:px-8">
        
        {/* Left Side: Skincare Heading & CTA */}
        <div className="flex flex-col items-start max-w-xl z-10 mb-10 lg:mb-0">
          <div className="flex items-center gap-1 text-amber-600 mb-4">
            {"★".repeat(5)} <span className="text-gray-700 text-sm font-medium ml-2">4.9 (840+ Glowing Reviews)</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-[1.1] mb-6">
            Pure. <br />
            Radiant. <br />
            Skincare.
          </h1>
          
          <p className="text-gray-600 text-lg mb-8 max-w-md">
            Elevate your daily routine with clean, nourishing formulations designed specifically for healthy, glowing skin.
          </p>

          <a href="/store">
            <button className="bg-gray-900 text-white font-medium px-8 py-4 rounded-full hover:bg-gray-800 transition duration-300 shadow-md">
              SHOP SKINCARE
            </button>
          </a>
        </div>

        {/* Right Side: Skincare Product Showcase Image */}
        <div className="relative w-full lg:w-1/2 flex justify-center items-center">
          <div className="relative w-[350px] h-[350px] md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl bg-rose-100/30 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-rose-200/20 to-transparent z-10" />
            <img
              src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1000&auto=format&fit=crop" 
              alt="Skincare Products"
              className="object-cover w-full h-full transform hover:scale-105 transition duration-700"
            />
          </div>
        </div>

      </div>
    </div>
  )
}

export default Hero