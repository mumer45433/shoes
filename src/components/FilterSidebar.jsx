export default function FilterSidebar({
  categories,
  selectedCategory,
  setSelectedCategory,
  selectedBrand,
  setSelectedBrand,
  selectedColor,
  setSelectedColor,
  selectedSize,
  setSelectedSize
}) {
  const brands = ["All", "Nike", "Adidas", "Puma"];

  const colors = [
    { name: "All", code: "#e5e7eb" },
    { name: "Black", code: "#000000" },
    { name: "White", code: "#ffffff" },
    { name: "Red", code: "#ef4444" }
  ];

  const sizes = ["All", "39", "40", "41", "42", "43"];

  return (
    <aside className="w-72 shrink-0 bg-white border border-gray-200 rounded-2xl shadow-md p-6 space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">Filters</h2>

      {/* CATEGORY */}
      <div>
        <p className="font-semibold mb-3 text-gray-700">Category</p>
        <div className="space-y-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`w-full text-left px-3 py-2 rounded-lg transition
                ${
                  selectedCategory === cat
                    ? "bg-black text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* BRAND */}
      <div>
        <p className="font-semibold mb-3 text-gray-700">Brand</p>
        <div className="space-y-2">
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => setSelectedBrand(brand)}
              className={`w-full text-left px-3 py-2 rounded-lg transition
                ${
                  selectedBrand === brand
                    ? "bg-black text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>

      {/* COLOR */}
      <div>
        <p className="font-semibold mb-3 text-gray-700">Color</p>
        <div className="flex flex-wrap gap-3">
          {colors.map((color) => (
            <button
              key={color.name}
              onClick={() => setSelectedColor(color.name)}
              className={`w-8 h-8 rounded-full border-2 transition
                ${
                  selectedColor === color.name
                    ? "border-black scale-110"
                    : "border-gray-300"
                }`}
              style={{ backgroundColor: color.code }}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {/* SIZE */}
      <div>
        <p className="font-semibold mb-3 text-gray-700">Size</p>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-3 py-1 rounded-lg border text-sm font-medium transition
                ${
                  selectedSize === size
                    ? "bg-black text-white border-black"
                    : "border-gray-300 text-gray-600 hover:bg-gray-100"
                }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}