import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function SignIn({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    setLoading(true);

    // Dummy login logic - Isse aap apne backend se connect kar sakte hain
    setTimeout(() => {
      if (username && password) {
        setUser({ username });
        navigate("/");
      } else {
        alert("Please enter credentials");
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center p-4 bg-gray-50">
      <div className="max-w-5xl w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* LEFT: Image Section (Hidden on mobile) */}
        <div className="hidden md:block md:w-1/2 relative">
          <img 
            src="https://images.unsplash.com/photo-1520256862855-398228c41684?w=400" 
            alt="Delicious Pizza" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-12 text-white">
            <h2 className="text-4xl font-black mb-4">Join the Foodie Tribe!</h2>
            <p className="text-lg opacity-80 font-light">
              Unlock exclusive deals and the fastest delivery in town.
            </p>
          </div>
        </div>

        {/* RIGHT: Form Section */}
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
          <div className="mb-10 text-center md:text-left">
            <h1 className="text-4xl font-black text-gray-900 mb-3">Welcome Back!</h1>
            <p className="text-gray-500 font-medium">Please enter your details to sign in.</p>
          </div>

          <form onSubmit={handleSignIn} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Username</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-12 py-4 outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all font-medium"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-12 py-4 outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all font-medium"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between px-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 accent-red-600 rounded" />
                <span className="text-sm text-gray-600 font-medium">Remember me</span>
              </label>
              <Link to="/forgot-password" size="sm" className="text-sm font-bold text-red-600 hover:text-red-700">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-red-600 text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-red-200 hover:bg-red-700 hover:shadow-red-300 transition-all transform active:scale-[0.98] ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin"></div>
                  Checking...
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-gray-500 font-medium">
            Don't have an account?{" "}
            <Link to="/signup" className="text-red-600 font-black hover:underline">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}