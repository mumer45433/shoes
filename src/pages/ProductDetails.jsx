import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../utils/api";
import { useCartStore } from "../store/cartStore";
import ProductCard from "../components/ProductCard";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const addToCart = useCartStore((state) => state.addToCart);
  const [selectedSize, setSelectedSize] = useState(null);
  const [wishlisted, setWishlisted] = useState(false);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.fetchProducts();
      setAllProducts(data);

      const foundProduct = data.find((p) => p.id === Number(id));
      setProduct(foundProduct);
      if (foundProduct) setMainImage(foundProduct.image);
    };
    fetchData();
  }, [id]);

  if (!product) return <p className="text-center py-10">Loading...</p>;

  const handleAddToCart = () => {
    if (!selectedSize && product.size) {
      alert("Please select a size");
      return;
    }
    addToCart({ ...product, selectedSize });

 
  };

  const toggleWishlist = () => setWishlisted(!wishlisted);

  // Related products: same category excluding current product
  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">

        {/* LEFT: IMAGE GALLERY */}
        <div className="space-y-4">
          <div className="relative">
            <img
              src={mainImage}
              alt={product.name}
              className="w-full rounded-xl object-cover h-[400px] shadow-md"
            />

            {/* Discount badge */}
            {product.discount && (
              <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                -{product.discount}%
              </div>
            )}

            {/* Wishlist heart */}
            <button
              onClick={toggleWishlist}
              className={`absolute top-2 right-2 text-2xl transition-colors ${
                wishlisted ? "text-red-500" : "text-gray-400 hover:text-red-500"
              }`}
            >
              ♥
            </button>
          </div>

          {/* Thumbnails */}
          {product.gallery && product.gallery.length > 0 && (
            <div className="flex gap-3 mt-2">
              {product.gallery.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`thumb-${idx}`}
                  onClick={() => setMainImage(img)}
                  className="w-20 h-20 object-cover rounded-md cursor-pointer border hover:ring-2 hover:ring-red-600 transition"
                />
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: DETAILS */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
            <p className="text-gray-500 mb-2">Brand: {product.brand}</p>

            {/* Rating stars */}
            <div className="flex gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`text-sm ${
                    star <= (product.rating || 5) ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>

            <p className="text-gray-600 mb-6">{product.description}</p>

            {/* Price with discount */}
            <div className="mb-6 flex items-center gap-3">
              {product.discount ? (
                <>
                  <span className="text-2xl font-bold text-red-600">
                    Rs {Math.round(product.price * (1 - product.discount / 100))}
                  </span>
                  <span className="line-through text-gray-400">
                    Rs {product.price}
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold text-red-600">
                  Rs {product.price}
                </span>
              )}
            </div>

            {/* SIZE SELECTOR */}
            {product.size && (
              <div className="mb-6">
                <p className="font-semibold mb-2">Select Size</p>
                <div className="flex gap-3 flex-wrap">
                  {product.size.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`border px-4 py-2 rounded-lg transition ${
                        selectedSize === s ? "bg-black text-white" : "hover:bg-gray-100"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ADD TO CART BUTTON */}
          <button
            onClick={handleAddToCart}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-500 transition mt-4 w-full"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">You may also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}