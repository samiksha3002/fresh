// apps/storefront/app/products/[handle]/loading.tsx
export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="h-6 w-48 bg-gray-200 mb-4"></div>
      <div className="h-64 w-full bg-gray-200"></div>
    </div>
  )
}
