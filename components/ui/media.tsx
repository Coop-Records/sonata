"use client"

import Image from "next/image"
import { CSSProperties, useEffect, useState } from "react"

interface IMedia {
  link: string
  containerStyle?: CSSProperties
  containerClasses?: string
  imageClasses?: string
  className?: string
  blurLink?: string
  alt?: string
  fallbackLink?: string
}

const Media = ({
  link,
  containerClasses,
  containerStyle,
  blurLink,
  alt,
  imageClasses,
  fallbackLink,
}: IMedia) => {
  const [imgSrc, setImgSrc] = useState<string>(link)

  useEffect(() => {
    setImgSrc(link)
  }, [link])

  return (
    <div className={`relative ${containerClasses || ""}`} style={containerStyle || {}}>
      {link && (
        <Image
          className={`absolute w-[100%] object-contain ${imageClasses}`}
          src={imgSrc}
          layout="fill"
          alt={alt || "not found image"}
          placeholder="blur"
          blurDataURL={
            blurLink ||
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOcMXP2OQAGOQKc/DqDigAAAABJRU5ErkJggg=="
          }
          unoptimized
          onLoadingComplete={(result) => {
            if (result.naturalWidth === 0) {
              setImgSrc(fallbackLink || "")
            }
          }}
          onError={() => {
            setImgSrc(fallbackLink || "")
          }}
        />
      )}
    </div>
  )
}

export default Media
