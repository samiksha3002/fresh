import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Refund Policy | Kovea Touch",
  description: "Read the refund and return policy for Kovea Touch.",
}

export default function RefundPolicyPage() {
  return (
    <div className="py-16 md:py-24 max-w-3xl mx-auto px-6 font-sans min-h-[50vh]">
      <h1 className="text-3xl md:text-4xl font-medium text-gray-900 mb-10 text-center tracking-wide">
        Refund Policy
      </h1>
      
      <div className="text-gray-600 leading-relaxed space-y-6 text-sm md:text-base text-justify md:text-left">
        <p>
          You may return most new, unopened items within 30 days of delivery for a full refund. We'll also pay the return shipping costs if the return is a result of our error (you received an incorrect, defective item, etc.).
        </p>
        
        <p>
          You should expect to receive your refund within three weeks of giving your package to the return shipper, however, in many cases you will receive a refund sooner. This time period includes the transit time for us to receive your return from the shipper (5 to 10 business days), the time it takes us to process your return once we receive it (3 to 5 business days), and the time it takes your bank to process our refund request (5 to 10 business days).
        </p>
        
        <p>
          If you need to return an item, please contact us with your order number and details about the product you would like to return. We will respond quickly with instructions on how to return items from your order.
        </p>
      </div>
    </div>
  )
}