import { useCartStore } from "../store/cartStore";
import { useNavigate } from "react-router-dom";

export default function CartSidebar() {
  const { cartItems, removeFromCart, updateQuantity } = useCartStore();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="lg:sticky lg:top-24 border border-gray-700 rounded-[2rem] bg-gray-50 shadow-2xl flex flex-col max-h-[85vh]">

      {/* Header */}
      <div className="p-6 border-b border-gray-200 bg-white rounded-t-[2rem]">
        <h2 className="text-xl font-black text-gray-800 uppercase tracking-tight">
          Your Basket
        </h2>
        <p className="text-xs font-bold text-gray-400 mt-1">
          {cartItems.length} items added
        </p>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">

        {cartItems.length === 0 ? (
          <div className="text-center py-12 flex flex-col items-center">
            <div className="bg-white p-4 rounded-full mb-3 text-3xl shadow">
              🛒
            </div>
            <p className="text-gray-400 font-medium">
              Your basket is empty.
            </p>
          </div>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="group p-3 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 transition-all"
            >
              <div className="flex justify-between items-start gap-2">
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-gray-800 text-sm truncate">
                    {item.name}
                  </p>

                  <p className="text-xs font-black text-red-600 mt-0.5">
                    ₹{item.price * item.quantity}
                  </p>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-gray-300 hover:text-red-500 transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Quantity */}
              <div className="flex items-center justify-between mt-3">

                <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-0.5">

                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-red-600 font-bold"
                  >
                    −
                  </button>

                  <span className="w-8 text-center text-xs font-black text-gray-800">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-red-600 font-bold"
                  >
                    +
                  </button>

                </div>

                <span className="text-[10px] text-gray-400 font-bold italic">
                  ₹{item.price} ea.
                </span>

              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      {cartItems.length > 0 && (
        <div className="p-6 bg-white border-t border-gray-200 rounded-b-[2rem] space-y-4">

          <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">
              Total:
            </span>

            <span className="text-3xl font-black text-gray-900 tracking-tighter">
              ₹{totalPrice}
            </span>
          </div>

          <button
            onClick={() => navigate("/checkout")}
            className="w-full bg-red-600 text-white py-4 rounded-2xl font-black text-lg shadow-xl hover:bg-red-700 transition-all active:scale-[0.98] uppercase tracking-wider"
          >
            Checkout
          </button>

          <p className="text-[10px] text-gray-400 text-center font-bold">
            SECURE CHECKOUT • NO EXTRA FEES
          </p>

        </div>
      )}
    </div>
  );
}