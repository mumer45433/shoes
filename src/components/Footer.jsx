export default function Footer() {
  return (
<footer className="w-full bg-gray-800 text-white mt-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Branding */}
        <div>
          <h2 className="text-2xl font-bold text-red-500 mb-2">Foodies</h2>
          <p className="text-gray-300">Delicious food delivered fast to your door.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li><a href="/" className="hover:text-red-500 transition">Home</a></li>
            <li><a href="/cart" className="hover:text-red-500 transition">Cart</a></li>
            <li><a href="/orders" className="hover:text-red-500 transition">Orders</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-2">Contact Us</h3>
          <p>📞 +92 300 0000000</p>
          <p>✉️ contact@foodies.com</p>
          <p>🏠 Sadhoke, Gujranwala, Pakistan</p>
        </div>
      </div>

      <div className="border-t border-gray-700 py-4 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Foodies. All rights reserved.
      </div>
    </footer>
  );
}