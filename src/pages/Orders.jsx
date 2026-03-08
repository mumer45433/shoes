import { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ Loading state add ki

  useEffect(() => {
    setLoading(true);
    fetch("https://shoback.vercel.app/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false); // ✅ Data aa gaya, loader band
      })
      .catch((err) => {
        console.error(err);
        setLoading(false); // Error ki surat mein bhi loader band karein
      });
  }, []);

  const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);

  const statusColors = {
    Completed: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  // ✅ Loader UI
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600"></div>
        <p className="mt-4 text-gray-500 font-bold animate-pulse">Fetching Orders...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Orders Dashboard</h1>
        <p className="text-gray-500">Manage and track all customer orders</p>
      </div>

      {/* STATS SECTION */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-white shadow rounded-xl p-5 border hover:shadow-xl transition">
          <p className="text-gray-500 text-sm">Total Orders</p>
          <h2 className="text-3xl font-bold">{orders.length}</h2>
        </div>
        <div className="bg-white shadow rounded-xl p-5 border hover:shadow-xl transition">
          <p className="text-gray-500 text-sm">Revenue</p>
          <h2 className="text-3xl font-bold text-green-600">₹{totalRevenue}</h2>
        </div>
        <div className="bg-white shadow rounded-xl p-5 border hover:shadow-xl transition">
          <p className="text-gray-500 text-sm">Latest Order</p>
          <h2 className="text-lg font-semibold">{orders[0] ? `#${orders[0].id}` : "None"}</h2>
        </div>
      </div>

      {/* ORDERS GRID */}
      {orders.length === 0 ? (
        <div className="text-center text-gray-500 text-lg mt-20 bg-gray-50 p-10 rounded-3xl border-2 border-dashed">
          No orders found in the database.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-2xl shadow-md border hover:shadow-xl transition duration-300 flex flex-col overflow-hidden">
              <div className="flex justify-between items-center p-4 border-b bg-gray-50/50">
                <div>
                  <h2 className="font-bold text-lg">Order #{order.id}</h2>
                  <p className="text-xs text-gray-400">
                    {order.created_at ? new Date(order.created_at).toLocaleString() : "N/A"}
                  </p>
                </div>
                <span className={`text-[10px] uppercase tracking-widest px-3 py-1 rounded-full font-bold ${statusColors[order.status] || "bg-gray-100 text-gray-700"}`}>
                  {order.status || "Pending"}
                </span>
              </div>

              <div className="p-4 border-b text-sm text-gray-700 space-y-2 bg-white">
                <div className="flex items-center gap-2">
                    <span className="text-gray-400">👤</span>
                    <p className="font-semibold">{order.customer_details?.name || "N/A"}</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-gray-400">📞</span>
                    <p>{order.customer_details?.phone || "N/A"}</p>
                </div>
                <div className="flex items-start gap-2">
                    <span className="text-gray-400">📍</span>
                    <p className="text-xs line-clamp-1">{order.customer_details?.address || "N/A"}</p>
                </div>
              </div>

              <div className="p-4 flex-grow bg-white">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Items</p>
                <ul className="space-y-2 text-sm">
                  {order.items?.map((item, idx) => (
                    <li key={idx} className="flex justify-between items-center text-gray-600">
                      <span>{item.name} <span className="text-gray-400 text-xs">x{item.quantity}</span></span>
                      <span className="font-medium">₹{item.price * item.quantity}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 border-t bg-gray-50 flex justify-between items-center">
                <span className="text-gray-500 text-sm font-bold uppercase tracking-widest">Total Bill</span>
                <span className="text-xl font-black text-red-600">₹{order.total}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}