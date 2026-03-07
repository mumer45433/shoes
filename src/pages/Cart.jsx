import { useCartStore } from "../store/cartStore";
import { useNavigate, Link } from "react-router-dom";

export default function Cart() {
  const { cartItems, removeFromCart, clearCart, updateQuantity } = useCartStore(); // Ensure updateQuantity is in your store
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 0 ? 50 : 0;
  const total = subtotal + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-64 h-64 mb-8 bg-gray-50 rounded-full flex items-center justify-center">
           <span className="text-8xl">🛒</span>
        </div>
        <h1 className="text-3xl font-black text-gray-900 mb-2">Your Cart is Empty</h1>
        <p className="text-gray-500 mb-8 max-w-sm">Looks like you haven't added any delicious meals yet. Start exploring our menu!</p>
        <Link to="/menu" className="bg-red-600 text-white px-10 py-4 rounded-2xl font-black shadow-xl shadow-red-200 hover:bg-red-700 transition-all active:scale-95">
          Back to Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* LEFT: Items List */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-black text-gray-900">Your Cart</h1>
            <button 
              onClick={clearCart}
              className="text-gray-400 hover:text-red-600 font-bold text-sm transition-colors uppercase tracking-widest"
            >
              Clear All
            </button>
          </div>

          <div className="space-y-6">
            {cartItems.map((item) => (
              <div key={item.id} className="group bg-white border border-gray-100 p-4 md:p-6 rounded-[2rem] shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-center gap-6">
                {/* Item Image */}
                <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-100 rounded-2xl overflow-hidden shrink-0 shadow-inner">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>

                {/* Info */}
                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-xl font-black text-gray-800 mb-1">{item.name}</h2>
                  <p className="text-gray-400 text-sm font-bold uppercase tracking-tight mb-4">{item.category}</p>
                  
                  <div className="flex items-center justify-center sm:justify-start gap-4">
                    <span className="text-2xl font-black text-red-600">₹{item.price}</span>
                    <div className="h-6 w-[1px] bg-gray-200"></div>
                    <span className="text-gray-500 font-bold">Subtotal: ₹{item.price * item.quantity}</span>
                  </div>
                </div>

                {/* Quantity Controls & Remove */}
                <div className="flex flex-col items-center sm:items-end gap-4">
                   <div className="flex items-center bg-gray-100 rounded-xl p-1 border border-gray-200">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-10 h-10 flex items-center justify-center font-bold text-gray-600 hover:bg-white hover:rounded-lg transition-all"
                      >
                        −
                      </button>
                      <span className="w-12 text-center font-black text-gray-900">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-10 h-10 flex items-center justify-center font-bold text-gray-600 hover:bg-white hover:rounded-lg transition-all"
                      >
                        +
                      </button>
                   </div>
                   <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-xs font-black text-gray-400 hover:text-red-600 uppercase tracking-widest transition-colors"
                   >
                     Remove Item
                   </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Order Summary */}
        <aside className="w-full lg:w-[400px]">
          <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white sticky top-28 shadow-2xl shadow-gray-300">
            <h2 className="text-2xl font-black mb-8">Summary</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-400 font-medium">
                <span>Items Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-400 font-medium">
                <span>Delivery Fee</span>
                <span>₹{deliveryFee}</span>
              </div>
              <div className="h-[1px] bg-gray-800 my-4"></div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Total Amount</p>
                  <p className="text-4xl font-black text-white">₹{total}</p>
                </div>
                <div className="text-green-400 text-xs font-bold bg-green-400/10 px-2 py-1 rounded">
                  GST Included
                </div>
              </div>
            </div>

            <button 
              onClick={() => navigate("/checkout")}
              className="w-full bg-red-600 py-5 rounded-2xl font-black text-xl hover:bg-red-700 transition-all shadow-xl shadow-red-900/20 active:scale-95 flex items-center justify-center gap-3"
            >
              Go to Checkout
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>

            <p className="text-center text-gray-500 text-[10px] mt-6 uppercase tracking-widest font-bold">
              Secure Checkout • Fast Delivery
            </p>
          </div>
        </aside>

      </div>
    </div>
  );
}