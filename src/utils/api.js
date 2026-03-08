const BASE_URL = "https://shoback.vercel.app";

export const api = {
  fetchProducts: async () => {
    try {
      const res = await fetch(`${BASE_URL}/products`);
      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json();
    } catch (err) {
      console.error(err);
      return [];
    }
  },

  placeOrder: async (orderData) => {
    try {
      const res = await fetch(`${BASE_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
      if (!res.ok) throw new Error("Failed to place order");
      return res.json();
    } catch (err) {
      console.error(err);
      return null;
    }
  },
};