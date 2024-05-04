"use client";

import { CardContent, Card } from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";

import AddToCart from "../cart/add-to-cart";
import ShowProductModalDetails from "./product-details";

export default function ProductCard({
  product = {
    name: "Product Name",
    price: 0,
    image: "/assets/images/product/tableau.webp",
    description: "Product description",
  },
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Card
        className="relative flex flex-col gap-4 p-3
    border border-gray-200 rounded-lg shadow-md w-full sm:max-w-[300px] 
    "
      >
        <Image
          alt={product.name}
          className="rounded-t-lg object-cover w-full aspect-[4/3] cursor-pointer"
          src={product.image}
          quality={100}
          width={200}
          height={200}
          onClick={() => setIsOpen(true)}
          loading="lazy"
          loader={({ src }) => src}
          unoptimized
        />
        <CardContent className="p-4 grid gap-4 h-full">
          <div className="flex items-center justify-start w-full overflow-auto ">
            <h3 className="font-semibold text-md">{product.name}</h3>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-xl font-semibold">${product.price}</div>
            <AddToCart product={product} />
          </div>
        </CardContent>
      </Card>
      <ShowProductModalDetails
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        product={product}
      />
    </>
  );
}
