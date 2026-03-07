import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";

export default function Checkout() {
  const { cartItems, clearCart } = useCartStore();
  const placeOrder = useCartStore((state) => state.placeOrder);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 50; // Aap isse dynamic bhi kar sakte hain

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone || !address) {
      alert("Please fill all fields");
      return;
    }
    setLoading(true);
    const orderData = {
      customer: { name, phone, address },
      items: cartItems,
      total: totalPrice + deliveryFee,
      date: new Date(),
    };

    const result = await placeOrder(orderData);
    setLoading(false);

    if (result) {
      clearCart();
      navigate("/order-success");
    } else {
      alert("Failed to place order. Try again later.");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Your cart is empty</h1>
        <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/menu" className="bg-red-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-red-700 transition shadow-lg">
          Explore Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* LEFT: Checkout Form */}
        <div className="flex-1">
          <h1 className="text-4xl font-black mb-8 text-gray-900">Checkout</h1>
          
          <div className="bg-white border border-gray-100 shadow-xl rounded-3xl p-8">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="bg-red-100 text-red-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
              Delivery Information
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="03xx-xxxxxxx"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none transition"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Delivery Address</label>
                <textarea
                  placeholder="Street, House No, Landmark..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none transition"
                  rows="4"
                  required
                />
              </div>

              <div className="pt-4">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <span className="bg-red-100 text-red-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                  Payment Method
                </h2>
                <div className="p-4 border-2 border-red-100 bg-red-50 rounded-2xl flex items-center gap-4">
                   <div className="w-6 h-6 border-4 border-red-600 rounded-full"></div>
                   <div>
                     <p className="font-bold text-red-900">Cash on Delivery</p>
                     <p className="text-sm text-red-700">Pay when you receive your food</p>
                   </div>
                </div>
              </div>

              <button
                type="submit"
                className={`w-full bg-red-600 text-white py-4 rounded-2xl font-black text-xl shadow-lg hover:bg-red-700 transition transform active:scale-95 mt-8 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Processing Order..." : "Confirm & Place Order"}
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT: Order Summary Sidebar */}
        <aside className="w-full lg:w-[400px]">
          <div className="bg-gray-900 text-white rounded-3xl p-8 sticky top-24 shadow-2xl">
            <h2 className="text-2xl font-bold mb-8 border-b border-gray-700 pb-4">Order Summary</h2>
            
            <div className="space-y-4 mb-8 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center gap-4">
                  <div className="flex items-center gap-3">
                    <span className="bg-gray-800 px-2 py-1 rounded text-xs font-bold">{item.quantity}x</span>
                    <p className="text-sm font-medium text-gray-300 truncate w-32 md:w-48">{item.name}</p>
                  </div>
                  <p className="text-sm font-bold">₹{item.price * item.quantity}</p>
                </div>
              ))}
            </div>

            <div className="space-y-4 border-t border-gray-700 pt-6">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Delivery Fee</span>
                <span>₹{deliveryFee}</span>
              </div>
              <div className="flex justify-between text-2xl font-black pt-4 text-white">
                <span>Total</span>
                <span className="text-red-500">₹{totalPrice + deliveryFee}</span>
              </div>
            </div>

            <div className="mt-8 p-4 bg-gray-800/50 rounded-2xl border border-gray-700 border-dashed">
              <p className="text-xs text-gray-400 text-center">
                By placing this order, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}