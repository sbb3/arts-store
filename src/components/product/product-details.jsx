import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import AddToCart from "../cart/add-to-cart";

export default function ShowProductModalDetails({
  isOpen,
  setIsOpen,
  product,
}) {
  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
      <DialogContent className="w-full max-w-[1200px] flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 lg:w-[80%] h-[300px] md:h-[500px] relative">
          <Image
            alt={product.name}
            className="rounded-t-lg object-cover w-full h-full"
            src={product.image}
            quality={100}
            width={500}
            height={500}
            loader={({ src }) => src}
          />
        </div>
        <div className="w-full md:w-1/2 lg:w-1/2 p-4 flex flex-col justify-between gap-4 ">
          <div className="flex flex-col gap-4  ">
            <DialogHeader>
              <DialogTitle>{product.name}</DialogTitle>
            </DialogHeader>
            <p className="text-lg font-bold ">${product.price}</p>
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
