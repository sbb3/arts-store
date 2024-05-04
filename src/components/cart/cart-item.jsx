import { useCart } from "@/hooks/use-cart";
import { X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const CartItem = ({ product }) => {
  const { delete: deleteProduct } = useCart();
  const { toast } = useToast();

  return (
    <div className="space-y-3 py-2">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative aspect-square h-16 w-16 min-w-fit overflow-hidden rounded">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="absolute object-cover"
              loader={({ src }) => src}
            />
          </div>

          <div className="flex flex-col self-start space-y-1">
            <span className="line-clamp-1 text-sm font-medium mb-1">
              {product.name}
            </span>
          </div>
        </div>

        <div className="flex flex-col space-y-1 font-medium">
          <span className="ml-auto line-clamp-1 text-sm">{product.price}</span>
          <div
            className="mt-4 text-xs font-medium text-gray-500
            flex items-center gap-2 justify-end
            "
          >
            <Button
              onClick={() => {
                deleteProduct(product.id);
                toast({
                  title: "Item removed",
                  description: `${product.name} has been removed from your cart`,
                });
              }}
              className="flex items-center  p-1  rounded-md"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
