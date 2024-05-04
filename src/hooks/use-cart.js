import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useCart = create()(
  persist(
    (set) => ({
      cartItems: [],
      add: (product) =>
        set((state) => {
          return { cartItems: [...state.cartItems, { product }] };
        }),
      delete: (id) =>
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.product.id !== id),
        })),
    }),
    {
      name: "saved-cart-items",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
