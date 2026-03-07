import { useCartStore } from "../store/cartStore";
import { useNavigate } from "react-router-dom";

export default function CartDrawer() {
  const { 
    cartItems, 
    removeFromCart, 
    clearCart, 
    updateQuantity, 
    isCartOpen, 
    setCartOpen 
  } = useCartStore();
  
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 0 ? 50 : 0;
  const total = subtotal + deliveryFee;

  return (
    <>
      {/* Overlay */}
      {isCartOpen && (
        <div 
          onClick={() => setCartOpen(false)} 
          className="fixed inset-0 bg-black/30 z-[60] transition-opacity duration-300" 
        />
      )}

      {/* Drawer Body */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[380px] bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col
          ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight">Your Cart</h2>
            <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
              {cartItems.length}
            </span>
          </div>
          <button 
            onClick={() => setCartOpen(false)} 
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 transition"
          >
            ✕
          </button>
        </div>

        {/* Cart Items List - Area height maximized */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/20">
          {cartItems.length === 0 ? (
       <div className="text-center mt-24">
              <div className="text-7xl mb-5 opacity-80">🛍️</div>
              <p className="text-gray-600 font-semibold text-lg">Your cart is feeling a bit empty.</p>
              <button 
                onClick={() => setCartOpen(false)}
                className="mt-5 text-red-600 font-bold text-base hover:underline active:scale-95 transition"
              >
                Go back & continue shopping
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              /* Item View with SHADOW and BORDER to separate from drawer */
              <div 
                key={item.id} 
                className="flex gap-3 bg-white p-3 rounded-2xl border border-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-md transition-shadow items-center"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-xl object-cover border border-gray-50 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-xs text-gray-800 truncate uppercase tracking-tight">{item.name}</h3>
                  <p className="text-red-600 font-black text-sm mt-0.5">₹{item.price}</p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-red-600 transition"
                      >
                        −
                      </button>
                      <span className="text-[10px] font-black w-6 text-center text-gray-800">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-red-600 transition"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                  title="Remove"
                >
                  <span className="text-lg">🗑️</span>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary - CHANGED COLOR & COMPACT */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-200 p-4 bg-gray-50 shadow-[0_-10px_20px_rgba(0,0,0,0.02)] sticky bottom-0 z-10">
            <div className="space-y-1.5 mb-4 px-1">
              <div className="flex justify-between text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                <span>Items Subtotal</span>
                <span className="text-gray-900">₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                <span>Delivery Charge</span>
                <span className="text-gray-900">₹{deliveryFee}</span>
              </div>
              <div className="flex justify-between text-xl font-black mt-3 pt-3 border-t border-gray-200 text-gray-950 uppercase italic tracking-tighter">
                <span>Net Total</span>
                <span className="text-red-600 underline decoration-red-200 underline-offset-4">₹{total}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  navigate("/checkout");
                  setCartOpen(false);
                }}
                className="w-full bg-red-600 text-white py-3.5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-red-700 active:scale-[0.98] transition-all shadow-lg shadow-red-200"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={clearCart}
                className="py-1.5 text-[10px] text-gray-400 font-bold hover:text-red-600 transition uppercase tracking-widest"
              >
                Clear Entire Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}