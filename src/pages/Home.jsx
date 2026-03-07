import { useState, useEffect } from "react";
import { api } from "../utils/api";
import ProductCard from "../components/ProductCard";
import { useCartStore } from "../store/cartStore";
import { useNavigate } from "react-router-dom";
import { products as initialProducts } from "../data/products";

export default function Home() {
  const navigate = useNavigate();
  const { cartItems } = useCartStore();

  const banners = [
    { id: 1, image: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=400", title: "Stylish Sneakers", subtitle: "Trendy shoes for every occasion" },
    { id: 2, image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800", title: "Casual Shoes", subtitle: "Comfortable and modern" },
    { id: 3, image: "https://images.unsplash.com/photo-1520256862855-398228c41684?w=400", title: "Running Shoes", subtitle: "Performance meets style" },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState("All");

 
  useEffect(() => {
    const interval = setInterval(() => setCurrentSlide((prev) => (prev + 1) % banners.length), 4000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const categories = ["All", ...new Set(products.map((p) => p.category))];
  const filteredProducts = products.filter((p) => selectedCategory === "All" || p.category === selectedCategory);

  return (
    <div className="w-full px-4 md:px-8 py-6">

      {/* Hero carousel */}
      <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-8 shadow-lg">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"}`}
            style={{ backgroundImage: `url(${banner.image})`, backgroundSize: "cover", backgroundPosition: "center" }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white text-center p-4">
              <h2 className="text-3xl md:text-5xl font-extrabold mb-2">{banner.title}</h2>
              <p className="text-md md:text-xl font-medium">{banner.subtitle}</p>
            </div>
          </div>
        ))}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-3 h-3 rounded-full transition-all ${currentSlide === i ? "bg-red-600 w-6" : "bg-white bg-opacity-50"}`}
            ></button>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-4 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-6 py-2 rounded-full border-2 font-bold transition-all duration-300 ${
              selectedCategory === cat
                ? "bg-red-600 text-white border-red-600 shadow-lg scale-105"
                : "bg-white text-gray-600 border-gray-100 hover:border-red-500 hover:text-red-500"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl">
          <p className="text-gray-400 text-xl italic">No items found here yet!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Go to Menu Button */}
      <div className="flex justify-center mt-10">
        <button
          onClick={() => navigate("/menu")}
          className="bg-black text-white px-8 py-3 rounded-xl font-bold text-lg hover:bg-gray-800 transition"
        >
          Go to Menu
        </button>
      </div>
    </div>
  );
}