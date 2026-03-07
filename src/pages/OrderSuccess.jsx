import { Link } from "react-router-dom";

export default function OrderSuccess() {
  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Order Placed Successfully!</h1>
      <p className="mb-6">Thank you for ordering. Your food will be delivered soon.</p>
      <Link
        to="/menu"
        className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-500 transition"
      >
        Back to Menu
      </Link>
    </div>
  );
}