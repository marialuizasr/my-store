import { create } from "zustand";

export type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  category?: string;
  description?: string;
  rating?: {
    rate: number;
    count: number;
  };
};

type CartItem = Product & { quantity: number };

type CartState = {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  getTotal: () => number;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addToCart: (product) => {
    const items = get().items;
    const index = items.findIndex((item) => item.id === product.id);

    if (index !== -1) {
      const updated = [...items];
      updated[index].quantity += 1;
      set({ items: updated });
    } else {
      set({ items: [...items, { ...product, quantity: 1 }] });
    }
  },
  removeFromCart: (id) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }));
  },
  clearCart: () => set({ items: [] }),
  getTotal: () => {
    return get().items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  },
}));
