import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AddToCart from "../cart/add-to-cart";
import ImageWithLoading from "../ui/image-loading";
import { Star } from "lucide-react";
export default function ShowProductModalDetails({
  isOpen,
  setIsOpen,
  product,
}) {
  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
      <DialogContent className="w-full max-w-[1200px] flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 lg:w-[80%] h-[300px] md:h-[500px] relative">
          <ImageWithLoading
            src={product.image}
            alt={product.name}
            className="rounded-t-lg object-cover w-full h-full"
            width={500}
            height={500}
            quality={20}
          />
        </div>
        <div className="w-full md:w-1/2 lg:w-1/2 p-4 flex flex-col justify-between gap-4 ">
          <div className="flex flex-col gap-4  ">
            <DialogHeader>
              <DialogTitle>{product.name}</DialogTitle>
            </DialogHeader>
            <p className="text-lg font-bold ">${product.price}</p>
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  size={20}
                  className={`${
                    // index < product.reviews ? "text-yellow-500" : "text-gray-300"
                    index < parseInt(product?.reviews || 0)
                      ? "text-yellow-500"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <DialogDescription className="text-sm  ">
              {product.description}
            </DialogDescription>
          </div>
          <AddToCart product={product} type="text" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
