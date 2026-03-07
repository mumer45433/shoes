import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Orders from "./pages/Orders";
import SignIn from "./pages/SignIn";
import ProductDetails from "./pages/ProductDetails";
import Footer from "./components/Footer"; // ✅ import here
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
            <Toaster position="top-right" reverseOrder={false} />

      <div className="flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-1">
          <Routes>
            {/* 1. Menu Page (Full Width - No Container) */}
            <Route path="/menu" element={<Menu />} />

            {/* 2. Baki Pages (Inside Container) */}
            <Route
              path="*"
              element={
                <div className="max-w-7xl mx-auto px-4 mt-6">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/order-success" element={<OrderSuccess />} />
                    <Route path="/orders" element={<Orders />} />
                     <Route path="/signin" element={<SignIn />} />
                     <Route path="/product/:id" element={<ProductDetails />} />
                  </Routes>
                </div>
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
export default App;