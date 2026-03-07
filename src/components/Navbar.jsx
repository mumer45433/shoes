import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import CartDrawer from "../components/CartDrawer";

export default function Navbar({ user, setUser }) {
  const cartItems = useCartStore((state) => state.cartItems);
  
  // ✅ Store se states nikaalein
  const { isCartOpen, setCartOpen } = useCartStore();
  
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // ❌ local 'cartOpen' state ki ab zaroorat nahi hai
  
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll effect check
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    setUser(null);
    setProfileOpen(false);
    navigate("/");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "Orders", path: "/orders" },
  ];

  return (
    <> 
      <nav className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled 
          ? "bg-white/90 backdrop-blur-md shadow-lg py-2" 
          : "bg-white py-4 border-b border-gray-100 shadow-sm" 
      }`}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="flex justify-between items-center h-12">
            
            {/* Logo Section */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-red-600 p-1.5 rounded-lg group-hover:rotate-12 transition-transform shadow-md shadow-red-200">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <span className="text-2xl font-black tracking-tighter text-gray-900 uppercase">
                Sho<span className="text-red-600">ies</span>
              </span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              <div className="flex items-center gap-7">
                {navLinks.map((link) => (
                  <div key={link.path} className="relative group">
                    <Link
                      to={link.path}
                      className={`text-sm font-bold uppercase tracking-widest transition-all ${
                        location.pathname === link.path ? "text-red-600" : "text-gray-500 hover:text-red-500"
                      }`}
                    >
                      {link.name}
                    </Link>
                    {location.pathname === link.path && (
                      <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-600 rounded-full" />
                    )}
                  </div>
                ))}
              </div>

              {/* Icons & Account */}
              <div className="flex items-center gap-5 border-l pl-6 border-gray-200">
                
                {/* ✅ Desktop Cart Button - Connected to Store */}
                <button
                  onClick={() => setCartOpen(true)}
                  className="relative p-2 text-gray-700 hover:bg-gray-50 rounded-full transition-all group"
                >
                  <svg className="w-6 h-6 group-hover:text-red-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  {totalQuantity > 0 && (
                    <span className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white animate-bounce">
                      {totalQuantity}
                    </span>
                  )}
                </button>

                {/* User Profile Dropdown */}
                {user ? (
                  <div className="relative">
                    <button
                      onClick={() => setProfileOpen(!profileOpen)}
                      className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full hover:bg-gray-100 border border-gray-100 transition-all"
                    >
                      <div className="w-7 h-7 bg-red-600 rounded-full flex items-center justify-center text-white text-[10px] font-black uppercase">
                        {user.username.charAt(0)}
                      </div>
                      <span className="text-xs font-bold text-gray-700">{user.username}</span>
                    </button>

                    {profileOpen && (
                      <div className="absolute right-0 mt-3 w-44 bg-white border border-gray-100 shadow-2xl rounded-2xl overflow-hidden py-1 animate-in slide-in-from-top-2 duration-200">
                        <Link to="/profile" className="block px-4 py-2 text-sm text-gray-600 hover:bg-red-50 hover:text-red-600 font-bold" onClick={() => setProfileOpen(false)}>
                          My Profile
                        </Link>
                        <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-black border-t border-gray-50 mt-1">
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to="/signin"
                    className="bg-gray-900 text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-red-600 transition-all shadow-md active:scale-95"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>

            {/* Mobile UI */}
            <div className="md:hidden flex items-center gap-4">
              {/* ✅ Mobile Cart Button - Connected to Store */}
              <button onClick={() => setCartOpen(true)} className="relative p-2">
                 <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {totalQuantity > 0 && (
                  <span className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">
                    {totalQuantity}
                  </span>
                )}
              </button>
              <button onClick={() => setIsOpen(!isOpen)} className="text-gray-900 p-1">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
      {/* Mobile Menu */}
{isOpen && (
  <div className="md:hidden mt-4 pb-6 space-y-4 border-t border-gray-100 pt-5">
    {navLinks.map((link) => (
      <Link key={link.path} to={link.path} className="block text-lg font-black uppercase text-gray-800" onClick={() => setIsOpen(false)}>
        {link.name}
      </Link>
    ))}

    {/* ✅ Minimal Sign In Link */}
    {!user ? (
      <Link 
        to="/signin" 
        className="block text-lg font-black uppercase text-red-600 pt-2 border-t border-gray-50"
        onClick={() => setIsOpen(false)}
      >
        Sign In →
      </Link>
    ) : (
      <button onClick={handleLogout} className="block text-lg font-black uppercase text-red-600 pt-2 border-t border-gray-50">
        Logout
      </button>
    )}
  </div>
)}
        </div>
      </nav>
      
      {/* ✅ CartDrawer ab props nahi leta, kyunke wo direct Store se chalta hai */}
      <CartDrawer />
    </>
  );
}