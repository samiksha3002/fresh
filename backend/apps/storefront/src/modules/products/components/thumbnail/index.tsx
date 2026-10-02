
import { Container, clx } from "@medusajs/ui"
import Image from "next/image"
import React from "react"

import PlaceholderImage from "@modules/common/icons/placeholder-image"

type ThumbnailProps = {
  thumbnail?: string | null
  images?: any[] | null
  size?: "small" | "medium" | "large" | "full" | "square"
  isFeatured?: boolean
  className?: string
  "data-testid"?: string
}

const Thumbnail: React.FC<ThumbnailProps> = ({
  thumbnail,
  images,
  size = "small",
  isFeatured,
  className,
  "data-testid": dataTestid,
}) => {
  const initialImage = thumbnail || images?.[0]?.url

  return (
    <Container
      data-testid={dataTestid}
      className={clx(
        "relative w-full overflow-hidden bg-white",
        "transition-colors duration-300",
        className,
        {
          "aspect-[4/5]": isFeatured,
          "aspect-[4/5]": !isFeatured && size !== "square",
          "aspect-square": size === "square",
          "w-[180px]": size === "small",
          "w-[290px]": size === "medium",
          "w-[440px]": size === "large",
          "w-full": size === "full",
        }
      )}
    >
      <ImageOrPlaceholder image={initialImage} size={size} />
    </Container>
  )
}

const ImageOrPlaceholder = ({
  image,
  size,
}: Pick<ThumbnailProps, "size"> & { image?: string | null }) => {
  return image ? (
    <Image
      src={image}
      alt="Skincare product"
      fill
      className="object-contain object-center scale-[1.7] transition-transform duration-500 group-hover:scale-[1.6]"
      draggable={false}
      quality={80}
      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
    />
  ) : (
    <div className="absolute inset-0 flex items-center justify-center bg-[#f8f6f2]">
      <PlaceholderImage size={size === "small" ? 16 : 24} />
    </div>
  )
}

export default Thumbnail
