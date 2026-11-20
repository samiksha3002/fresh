"use client"

import { useEffect, useRef } from "react"
import {
  ANALYTICS_READY,
  EcommerceData,
  EcommerceName,
  trackEcommerce,
  trackPurchase,
} from "@lib/util/ecommerce"

export default function EcommerceEvent({
  name,
  data,
  dedupeKey,
}: {
  name: Exclude<EcommerceName, "add_to_cart">
  data: EcommerceData | null
  dedupeKey: string
}) {
  const sent = useRef(new Set<string>())
  useEffect(() => {
    const key = `${name}:${dedupeKey}`
    const send = () => {
      if (!data || sent.current.has(key)) return
      if (name === "purchase") {
        void trackPurchase(data).then((success) => {
          if (success) sent.current.add(key)
        })
      } else if (trackEcommerce(name, data)) {
        sent.current.add(key)
      }
    }
    send()
    // Only the currently mounted page can retry after consent. No historical
    // cart actions or pages are buffered or replayed after acceptance.
    window.addEventListener(ANALYTICS_READY, send)
    return () => window.removeEventListener(ANALYTICS_READY, send)
  }, [name, data, dedupeKey])
  return null
}
