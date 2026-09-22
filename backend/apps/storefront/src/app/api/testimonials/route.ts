import { NextResponse } from "next/server"

const BACKEND_URL =
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL ||
  process.env.MEDUSA_BACKEND_URL

const PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY

export async function GET() {
  try {
    if (!BACKEND_URL) {
      return NextResponse.json(
        { error: "Medusa backend URL is missing" },
        { status: 500 }
      )
    }

    if (!PUBLISHABLE_KEY) {
      return NextResponse.json(
        { error: "Medusa publishable API key is missing" },
        { status: 500 }
      )
    }

    const response = await fetch(
      `${BACKEND_URL}/store/testimonials`,
      {
        method: "GET",
        headers: {
          "x-publishable-api-key": PUBLISHABLE_KEY,
        },
        cache: "no-store",
      }
    )

    const data = await response.json()

    return NextResponse.json(data, {
      status: response.status,
    })
  } catch (error) {
    console.error("Testimonials proxy error:", error)

    return NextResponse.json(
      {
        error: "Failed to load testimonials",
      },
      { status: 500 }
    )
  }
}