import { retrieveOrder } from "@lib/data/orders"
import { purchaseData } from "@lib/util/ecommerce"
import EcommerceEvent from "@modules/common/components/ecommerce-event"
import OrderCompletedTemplate from "@modules/order/templates/order-completed-template"
import { Metadata } from "next"
import { notFound } from "next/navigation"

type Props = {
  params: Promise<{ id: string }>
}
export const metadata: Metadata = {
  title: "Order Confirmed",
  description: "You purchase was successful",
}

export default async function OrderConfirmedPage(props: Props) {
  const params = await props.params
  const order = await retrieveOrder(params.id).catch(() => null)

  if (!order) {
    return notFound()
  }

  return (
    <>
      <EcommerceEvent
        name="purchase"
        data={purchaseData(order)}
        dedupeKey={order.id}
      />
      <OrderCompletedTemplate order={order} />
    </>
  )
}
