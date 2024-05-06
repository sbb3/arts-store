import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { Skeleton } from "./skeleton";

export default function ImageWithLoading({
  className,
  src,
  alt,
  onLoad,
  ...rest
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        {...rest}
        onLoad={() => {
          setIsLoaded(true);
          onLoad?.();
        }}
        loading="lazy"
        className="rounded-t-lg object-cover w-full aspect-[4/3] cursor-pointer"
      />
      {!isLoaded && (
        <Skeleton className="w-full h-ful absolute top-0 left-0 l" />
      )}
    </div>
  );
}
