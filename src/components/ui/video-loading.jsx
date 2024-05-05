import { cn } from "@/lib/utils";
import { useState } from "react";
import { Skeleton } from "./skeleton";

export default function VideoWithLoading({
  className,
  src,
  onLoadedData,
  ...rest
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <video
        src={src}
        {...rest}
        onLoadedData={() => {
          setIsLoaded(true);
          onLoadedData?.();
        }}
        className="rounded-t-lg object-cover w-full aspect-[4/3] cursor-pointer"
        autoPlay
        loop
        muted
      />
      {!isLoaded && (
        <Skeleton className="absolute top-0 left-0 w-full h-full" />
      )}
    </div>
  );
}
