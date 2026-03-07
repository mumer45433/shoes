import { useState, useEffect } from "react";
import { api } from "../utils/api";
import ProductCard from "../components/ProductCard";
import FilterSidebar from "../components/FilterSidebar";

export default function Menu() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedColor, setSelectedColor] = useState("All");
  const [selectedSize, setSelectedSize] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.fetchProducts();
      setProducts(data);
    };
    fetchData();
  }, []);

  const filteredProducts = products.filter((p) => {
    const matchCategory = selectedCategory === "All" || p.category === selectedCategory;
    const matchBrand = selectedBrand === "All" || p.brand === selectedBrand;
    const matchColor = selectedColor === "All" || p.color === selectedColor;
    const matchSize = selectedSize === "All" || p.size.includes(selectedSize);

    return matchCategory && matchBrand && matchColor && matchSize;
  });

  return (
    <div className="w-full px-4 py-6">
      {/* 1. flex-col: Mobile par filter upar, items niche.
          2. lg:flex-row: Computer par wahi purana sidebar design.
          3. items-start: Dono ko top se align rakhega.
      */}
      <div className="flex flex-col lg:flex-row items-start gap-8 md:gap-12">

        {/* LEFT FILTERS - Added mb-8 for mobile spacing */}
        <div className="w-full lg:w-64 shrink-0 mb-8 lg:mb-0">
          <FilterSidebar
            categories={["All", "Sneakers", "Casual"]}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
          />
        </div>

        {/* PRODUCTS - Added gap-y for better spacing between rows */}
        <div className="flex-1 self-start grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10 w-full">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </div>
  );
}