import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function HeroSection() {
  return (
    <AspectRatio
      ratio={16 / 9}
      className="relative text-white max-h-[693px] rounded-lg md:rounded-2xl overflow-hidden 
        box-shadow-lg md:box-shadow-xl lg:box-shadow-2xl  
        "
    >
      <div className="animate-in flex items-center justify-center absolute z-20 bg-red/20 p-5 w-full h-full">
        <h1 className="text-xl md:text-4xl lg:text-6xl font-black drop-shadow-2xl text-center w-full ">
          Find the Perfect Painting{" "}
        </h1>
      </div>

      <div className="h-full absolute z-10 w-full">
        <video className="h-full object-cover w-full" autoPlay loop muted>
          <source
            src="https://utfs.io/f/b98faa6f-f601-40a2-affd-41d46a7374cf-fbazt0.mp4"
            type="video/mp4"
            className="scale-105 tranlate-y-5"
          />
        </video>
      </div>
    </AspectRatio>
  );
}
