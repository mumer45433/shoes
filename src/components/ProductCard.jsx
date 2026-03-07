import { useState } from "react";
import { useCartStore } from "../store/cartStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function ProductCard({ product }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const [wishlisted, setWishlisted] = useState(false);
  const navigate = useNavigate();

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(product);
    const setCartOpen = useCartStore.getState().setCartOpen; 
  if (setCartOpen) setCartOpen(true);

 
  };

  const toggleWishlist = (e) => {
    e.stopPropagation();
    setWishlisted(!wishlisted);
  };

  const discountedPrice = product.discount
    ? Math.round(product.price * (1 - product.discount / 100))
    : product.price;

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="relative border rounded-xl shadow-md p-3 md:p-4 flex flex-col transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 group cursor-pointer bg-white"
    >
      {/* Discount Badge */}
      {product.discount && (
        <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] md:text-xs px-2 py-1 rounded font-semibold z-10">
          -{product.discount}%
        </div>
      )}

      {/* Wishlist Heart */}
      <button
        onClick={toggleWishlist}
        className={`absolute top-2 right-2 text-lg md:text-xl transition-colors z-10 ${
          wishlisted ? "text-red-500" : "text-gray-400 group-hover:text-red-500"
        }`}
      >
        ♥
      </button>

      {/* Product Image */}
      <div className="w-full h-32 md:h-48 overflow-hidden rounded-md mb-3">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Name & Brand */}
      <h2 className="font-semibold text-sm md:text-lg truncate">{product.name}</h2>
      <p className="text-gray-500 text-[10px] md:text-sm">{product.brand}</p>

      {/* Rating */}
      <div className="flex gap-0.5 md:gap-1 my-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-[10px] md:text-sm ${
              star <= product.rating ? "text-yellow-400" : "text-gray-300"
            }`}
          >
            ★
          </span>
        ))}
      </div>

      {/* Price & Add to Cart Section */}
      <div className="mt-auto flex flex-col gap-2 pt-2 border-t border-gray-50">
        <div className="flex flex-wrap items-baseline gap-1 md:gap-2">
          <span className="text-red-600 font-bold text-sm md:text-lg">
            ₹{discountedPrice}
          </span>
          {product.discount && (
            <span className="text-gray-400 line-through text-[10px] md:text-sm">
              ₹{product.price}
            </span>
          )}
        </div>

        <button
          onClick={handleAdd}
          className="bg-red-600 text-white text-xs md:text-sm px-2 py-1.5 rounded hover:bg-red-500 transition w-full sm:opacity-0 sm:group-hover:opacity-100 opacity-100"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}