"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { ShoppingBag, ShoppingCart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import clsx from "clsx";

const AddToCart = ({ product, type = "icon" }) => {
  const { cartItems, add, delete: deleteProduct } = useCart();
  const [isAlreadyInCart, setIsAlreadyInCart] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsAlreadyInCart(
      cartItems.some((item) => item.product.id === product.id)
    );
  }, [cartItems, product]);

  return (
    <>
      {isAlreadyInCart ? (
        <Button
          onClick={() => {
            deleteProduct(product.id);
            toast({
              title: "Item removed",
              description: `${product.name} has been removed from your cart`,
            });
          }}
          variant="primary 
            ml-auto py-4 
            "
        >
          <ShoppingBag className="w-6 h-6" />
          {type === "text" && (
            <span
              className="ml-2 font-semibold text-sm
              
            "
            >
              Remove from Cart
            </span>
          )}
        </Button>
      ) : (
        <Button
          onClick={() => {
            add(product);
            toast({
              title: "Item added",
              description: `${product.name} has been added to your cart`,
            });
          }}
          className={clsx(
            "ml-auto py-4",
            type === "text" &&
              "w-full py-5 hover:text-white hover:bg-black transition-colors "
          )}
          size="sm"
          variant="outline"
        >
          <ShoppingCart className="w-6 h-6" />
          {type === "text" && (
            <span
              className="ml-2 font-semibold text-sm
              
            "
            >
              Add to Cart
            </span>
          )}
        </Button>
      )}
    </>
  );
};

export default AddToCart;
