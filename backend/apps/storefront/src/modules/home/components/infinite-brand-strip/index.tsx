"use client"

const items = [
  "Authentic Indian Skincare",
  "Thoughtfully Selected",
  "100% Genuine Care",
  "Carefully Delivered",
  "Everyday Self-Care",
  "Trusted Essentials",
]

const InfiniteBrandStrip = () => {
  return (
    <section className="w-full overflow-hidden border-y border-[#25231f]/10 bg-white">
      <div className="group relative flex h-[58px] items-center overflow-hidden">

        {/* First set */}
        <div className="flex shrink-0 items-center animate-[marquee_32s_linear_infinite] group-hover:[animation-play-state:paused]">

          {[...items, ...items].map((item, index) => (
            <div
              key={`first-${index}`}
              className="flex shrink-0 items-center"
            >
              <span className="whitespace-nowrap px-7 text-[9px] font-medium uppercase tracking-[0.28em] text-[#5f5a52] sm:px-9 sm:text-[10px]">
                {item}
              </span>

              <span className="text-[8px] text-[#a49e94]">
                ✦
              </span>
            </div>
          ))}

        </div>

        {/* Second set — makes the loop seamless */}
        <div
          aria-hidden="true"
          className="flex shrink-0 items-center animate-[marquee_32s_linear_infinite] group-hover:[animation-play-state:paused]"
        >

          {[...items, ...items].map((item, index) => (
            <div
              key={`second-${index}`}
              className="flex shrink-0 items-center"
            >
              <span className="whitespace-nowrap px-7 text-[9px] font-medium uppercase tracking-[0.28em] text-[#5f5a52] sm:px-9 sm:text-[10px]">
                {item}
              </span>

              <span className="text-[8px] text-[#a49e94]">
                ✦
              </span>
            </div>
          ))}

        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes marquee {
              from {
                transform: translateX(0);
              }

              to {
                transform: translateX(-100%);
              }
            }

            @media (prefers-reduced-motion: reduce) {
              .group > div {
                animation: none !important;
              }
            }
          `,
        }}
      />
    </section>
  )
}

export default InfiniteBrandStrip