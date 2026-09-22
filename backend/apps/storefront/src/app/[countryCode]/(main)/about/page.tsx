import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function AboutPage() {
  return (
    <main className="bg-[#f8f6f1] text-[#25231f]">

      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="border-b border-[#25231f]/10">
        <div className="mx-auto max-w-[1440px] px-6 py-20 sm:px-10 md:py-28 lg:px-16 lg:py-36">
          
          <div className="grid items-end gap-12 lg:grid-cols-[1.25fr_0.75fr]">
            
            <div>
              <p className="mb-7 text-[10px] font-medium uppercase tracking-[0.28em] text-[#77736b]">
                About Koviea Touch
              </p>

              <h1 className="max-w-5xl font-serif text-[48px] font-normal leading-[0.98] tracking-[-0.035em] sm:text-[64px] md:text-[78px] lg:text-[92px]">
                Rooted in India.
                <br />
                <span className="italic text-[#6f6a61]">
                  Delivered to your doorstep.
                </span>
              </h1>
            </div>

            <div className="max-w-md lg:pb-2">
              <div className="mb-8 h-px w-16 bg-[#25231f]" />

              <p className="text-[15px] leading-7 text-[#5f5b54]">
                At Koviea Touch, we believe that taking care of your skin
                shouldn&apos;t be limited by borders.
              </p>

              <p className="mt-5 text-[15px] leading-7 text-[#5f5b54]">
                We bring India&apos;s most trusted skincare and wellness
                essentials directly to your daily routine — wherever you
                call home.
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* =========================================================
          BRAND INTRO
      ========================================================= */}
      <section className="bg-[#eeece6]">
        <div className="mx-auto max-w-[1440px] px-6 py-20 sm:px-10 md:py-28 lg:px-16">
          
          <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">

            {/* Left editorial block */}
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#77736b]">
                Our Story
              </p>

              <div className="mt-10 flex items-end gap-5">
                <span className="font-serif text-[100px] leading-none tracking-[-0.08em] text-[#302e29] md:text-[130px]">
                  5
                </span>

                <div className="pb-3">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-[#77736b]">
                    Years
                  </p>

                  <p className="mt-1 text-sm text-[#5f5b54]">
                    of bringing trusted care closer to you.
                  </p>
                </div>
              </div>
            </div>


            {/* Story */}
            <div className="max-w-3xl">
              <h2 className="font-serif text-[38px] font-normal leading-tight tracking-[-0.025em] sm:text-[48px] md:text-[56px]">
                Care that travels with you.
              </h2>

              <div className="mt-8 space-y-6 text-[15px] leading-8 text-[#5f5b54]">
                <p>
                  For the past five years, our goal has been simple: bring
                  India&apos;s most trusted skincare and wellness essentials
                  directly to your daily routine — whether you live in the
                  US, UK, or Australia.
                </p>

                <p>
                  We understand that finding authentic products from India
                  can sometimes feel complicated when you live thousands of
                  miles away. Koviea Touch was created to make that experience
                  easier, more reliable, and more personal.
                </p>

                <p>
                  From the products we source to the way we pack every order,
                  we believe the little details matter. Your routine deserves
                  products you can trust and an experience you can feel good
                  about.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* =========================================================
          TRUST SECTION
      ========================================================= */}
      <section className="bg-[#f8f6f1]">
        <div className="mx-auto max-w-[1440px] px-6 py-20 sm:px-10 md:py-28 lg:px-16">

          <div className="mb-14 max-w-2xl md:mb-20">
            <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#77736b]">
              What We Stand For
            </p>

            <h2 className="mt-6 font-serif text-[40px] font-normal leading-tight tracking-[-0.025em] sm:text-[50px] md:text-[58px]">
              Simple promises.
              <br />
              <span className="italic text-[#77736b]">
                Meaningful care.
              </span>
            </h2>
          </div>


          <div className="grid border-t border-[#25231f]/10 md:grid-cols-3">

            {/* Card 01 */}
            <div className="border-b border-[#25231f]/10 py-10 md:border-b-0 md:border-r md:pr-10 md:py-12 lg:pr-14">
              <p className="text-[11px] tracking-[0.2em] text-[#918c83]">
                01
              </p>

              <h3 className="mt-8 font-serif text-[28px] font-normal">
                100% Genuine Care
              </h3>

              <p className="mt-5 text-[14px] leading-7 text-[#68645d]">
                Every product is carefully sourced, authentic, and vetted
                for quality. If we wouldn&apos;t use it in our own homes,
                we don&apos;t stock it.
              </p>
            </div>


            {/* Card 02 */}
            <div className="border-b border-[#25231f]/10 py-10 md:border-b-0 md:border-r md:px-10 md:py-12 lg:px-14">
              <p className="text-[11px] tracking-[0.2em] text-[#918c83]">
                02
              </p>

              <h3 className="mt-8 font-serif text-[28px] font-normal">
                Worry-Free Delivery
              </h3>

              <p className="mt-5 text-[14px] leading-7 text-[#68645d]">
                We pack every order with care so your routine arrives safe,
                fresh, and ready to use — from our hands to your doorstep.
              </p>
            </div>


            {/* Card 03 */}
            <div className="py-10 md:py-12 md:pl-10 lg:pl-14">
              <p className="text-[11px] tracking-[0.2em] text-[#918c83]">
                03
              </p>

              <h3 className="mt-8 font-serif text-[28px] font-normal">
                Real People. Fast Answers.
              </h3>

              <p className="mt-5 text-[14px] leading-7 text-[#68645d]">
                Have a question about a product or tracking an order?
                You&apos;ll always have a real person ready to help.
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* =========================================================
          AUTHENTIC INDIAN CARE
      ========================================================= */}
      <section className="bg-[#26241f] text-[#f8f6f1]">
        <div className="mx-auto max-w-[1440px] px-6 py-20 sm:px-10 md:py-28 lg:px-16">

          <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">

            {/* Large number / visual */}
            <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden border border-white/10 bg-[#302e28] md:min-h-[480px]">
              
              <div className="absolute left-8 top-8 text-[10px] uppercase tracking-[0.3em] text-white/40">
                Koviea Touch
              </div>

              <div className="text-center">
                <p className="font-serif text-[72px] italic leading-none text-[#e8e3d8] sm:text-[92px]">
                  India
                </p>

                <div className="mx-auto mt-7 h-px w-16 bg-white/30" />

                <p className="mt-6 text-[10px] uppercase tracking-[0.3em] text-white/50">
                  Authentic care
                </p>
              </div>

              <div className="absolute bottom-8 right-8 text-[10px] uppercase tracking-[0.2em] text-white/30">
                Est. 2021
              </div>
            </div>


            {/* Content */}
            <div className="max-w-2xl">

              <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-white/50">
                Authentic Indian Personal Care
              </p>

              <h2 className="mt-7 font-serif text-[42px] font-normal leading-[1.05] tracking-[-0.025em] sm:text-[54px] md:text-[64px]">
                The care you know.
                <br />
                <span className="italic text-white/55">
                  Wherever you are.
                </span>
              </h2>

              <div className="mt-9 space-y-6 text-[15px] leading-8 text-white/65">
                <p>
                  India has always had a deep connection with personal care,
                  beauty, wellness, and everyday rituals. We want to make
                  those familiar products easier to access, no matter where
                  life takes you.
                </p>

                <p>
                  Koviea Touch connects you with authentic Indian personal
                  care products while keeping the experience simple,
                  thoughtful, and dependable.
                </p>

                <p>
                  Because your everyday ritual shouldn&apos;t have to feel
                  far away.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>


      {/* =========================================================
          DESTINATIONS
      ========================================================= */}
      <section className="border-b border-[#25231f]/10 bg-[#f8f6f1]">
        <div className="mx-auto max-w-[1440px] px-6 py-20 sm:px-10 md:py-24 lg:px-16">

          <div className="grid items-center gap-10 md:grid-cols-[1fr_auto]">

            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#77736b]">
                Wherever You Call Home
              </p>

              <h2 className="mt-5 font-serif text-[38px] font-normal tracking-[-0.025em] sm:text-[48px]">
                From India,
                <span className="italic text-[#77736b]">
                  {" "}with care.
                </span>
              </h2>
            </div>


            <div className="flex flex-wrap gap-3 md:justify-end">
              {["United States", "United Kingdom", "Australia"].map(
                (country) => (
                  <span
                    key={country}
                    className="border border-[#25231f]/15 px-5 py-3 text-[10px] uppercase tracking-[0.18em] text-[#656159]"
                  >
                    {country}
                  </span>
                )
              )}
            </div>

          </div>
        </div>
      </section>


      {/* =========================================================
          FINAL CTA
      ========================================================= */}
      <section className="bg-[#eeece6]">
        <div className="mx-auto max-w-[1440px] px-6 py-24 text-center sm:px-10 md:py-32 lg:px-16">

          <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#77736b]">
            Your Daily Ritual
          </p>

          <h2 className="mx-auto mt-7 max-w-4xl font-serif text-[44px] font-normal leading-[1.05] tracking-[-0.03em] sm:text-[58px] md:text-[72px]">
            Your daily self-care ritual,
            <br />
            <span className="italic text-[#77736b]">
              made effortless.
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-xl text-[14px] leading-7 text-[#68645d]">
            Discover authentic Indian skincare and personal care essentials,
            thoughtfully brought closer to you.
          </p>

          <div className="mt-10">
            <LocalizedClientLink
              href="/store"
              className="inline-flex items-center border border-[#25231f] bg-[#25231f] px-8 py-4 text-[10px] font-medium uppercase tracking-[0.22em] text-white transition-all duration-300 hover:bg-transparent hover:text-[#25231f]"
            >
              Explore the Collection
            </LocalizedClientLink>
          </div>

        </div>
      </section>

    </main>
  )
}