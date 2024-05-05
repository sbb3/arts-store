"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import VideoWithLoading from "../ui/video-loading";

export default function HeroSection() {
  return (
    <AspectRatio
      ratio={16 / 9}
      className="relative text-white max-h-[693px] rounded-lg md:rounded-2xl overflow-hidden 
        box-shadow-lg md:box-shadow-xl lg:box-shadow-2xl  
        "
    >
      <div className="animate-in flex items-center justify-center absolute z-20 bg-black/20 p-5 w-full h-full">
        <h1 className="text-xl md:text-4xl lg:text-6xl font-black drop-shadow-2xl text-center w-full animate-fadeIn">
          Find the Perfect Painting{" "}
        </h1>
      </div>

      <div className="h-full absolute z-10 w-full">
        <VideoWithLoading
          src="https://res.cloudinary.com/dgcfd6vjx/video/upload/f_auto:video,q_auto/xzouxk8uayzycnxnrwtv"
          className="h-full object-cover w-full"
        />
      </div>
    </AspectRatio>
  );
}
