import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Shipping Policy | Kovea Touch",
  description: "Read the shipping policy for Kovea Touch.",
}

export default function ShippingPolicyPage() {
  return (
    <div className="py-16 md:py-24 max-w-3xl mx-auto px-6 font-sans min-h-[50vh]">
      <h1 className="text-3xl md:text-4xl font-medium text-gray-900 mb-10 text-center tracking-wide">
        Shipping Policy
      </h1>
      
      <div className="text-gray-600 leading-relaxed space-y-8 text-sm md:text-base text-justify md:text-left">
        
        {/* NEXT DAY SHIPPING */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 tracking-wide">Next Day Shipping</h2>
          <p>
            We offer next-day shipping to our customers and can ship to virtually any address in the world. Note that there are restrictions on some products, and some products cannot be shipped to international destinations.
          </p>
          <p>
            When you place an order, we will estimate shipping and delivery dates for you based on the availability of your items and the shipping options you choose. If your items show delivered but you never received them, let us know and we'll come to a resolution together.
          </p>
        </section>

        {/* RATES & WEIGHTS */}
        <section className="space-y-4">
          <p>
            Please also note that the shipping rates for many items we sell are weight-based. The weight of any such item can be found on its detail page. To reflect the policies of the shipping companies we use, all weights will be rounded up to the next full pound.
          </p>
        </section>

        {/* RETURN TO SENDER */}
        <section className="space-y-4 p-5 bg-gray-50 border border-gray-100 rounded-md">
          <p className="font-medium text-gray-800">
            Important Note on Returned Packages:
          </p>
          <p className="text-sm">
            Finally, we are not responsible for the shipping & duties fees of RETURN TO SENDER orders. This applies especially if the postal service determines the address provided is undeliverable.
          </p>
        </section>

      </div>
    </div>
  )
}