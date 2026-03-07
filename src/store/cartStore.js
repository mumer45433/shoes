import { create } from "zustand";
import { api } from "../utils/api";

export const useCartStore = create((set) => ({
  cartItems: [],
  isCartOpen: false, // ✅ Drawer ki state

  // ✅ Drawer kholne/band karne ka function
  setCartOpen: (open) => set({ isCartOpen: open }),

  addToCart: (product) =>
    set((state) => {
      const existing = state.cartItems.find((item) => item.id === product.id);
      
      // Jab bhi item add ho, drawer ko true (open) kar do
      const newState = { isCartOpen: true }; 

      if (existing) {
        return {
          ...newState,
          cartItems: state.cartItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          ...newState,
          cartItems: [...state.cartItems, { ...product, quantity: 1 }],
        };
      }
    }),

  updateQuantity: (productId, newQuantity) =>
    set((state) => ({
      cartItems: state.cartItems
        .map((item) =>
          item.id === productId 
            ? { ...item, quantity: newQuantity } 
            : item
        )
        .filter((item) => item.quantity > 0), 
    })),

  removeFromCart: (productId) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== productId),
    })),

  clearCart: () => set({ cartItems: [] }),

  placeOrder: async (orderData) => {
    try {
      const response = await api.placeOrder(orderData);
      if (response) {
        set({ cartItems: [] }); 
        return response;
      }
    } catch (error) {
      console.error("Order failed:", error);
    }
    return null;
  },
}));