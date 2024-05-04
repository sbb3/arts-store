"use client";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import CartItem from "./cart-item";
import { useToast } from "@/components/ui/use-toast";

const CartToggler = () => {
  const { cartItems } = useCart();
  const itemCount = cartItems?.length;
  const { toast } = useToast();

  const [isSliderOpened, setIsSliderOpen] = useState(false);

  useEffect(() => {
    setIsSliderOpen(true);
  }, []);
  return (
    <Sheet>
      <SheetTrigger
        className="group -m-2 flex items-center p-2
        border border-gray-200 rounded-md shadow-md
      "
      >
        <ShoppingCart className="h-6 w-6 " />
        <span className="ml-1 text-sm font-medium text-gray-700 group-hover:text-gray-800">
          {isSliderOpened ? itemCount : 0}
        </span>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle>
            <span className="text-sm font-normal text-gray-400">
              {itemCount} items
            </span>
          </SheetTitle>
          {itemCount > 0 ? (
            <>
              <div className="flex w-full flex-col pr-6 space-y-4">
                <ScrollArea>
                  {cartItems.map(({ product }) => (
                    <CartItem key={product.id} product={product} />
                  ))}
                </ScrollArea>
              </div>
              <div className="space-y-4">
                <div className="space-y-1.5 text-sm">
                  <SheetFooter>
                    <SheetTrigger asChild>
                      <Button
                        className="w-full"
                        onClick={() => {
                          toast({
                            title: "🚧 Feature not available",
                            description: "This feature is not available yet",
                          });
                        }}
                      >
                        Checkout
                      </Button>
                    </SheetTrigger>
                  </SheetFooter>
                </div>
              </div>
            </>
          ) : (
            <div className="flex h-full flex-col items-center justify-center space-y-1">
              <div className="text-gray-500 text-sm">Your cart is empty</div>
            </div>
          )}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default CartToggler;
