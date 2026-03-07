import { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error(err));
  }, []);

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  // Map order status to badge color
  const statusColors = {
    Completed: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">

      {/* PAGE HEADER */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Orders Dashboard</h1>
        <p className="text-gray-500">Manage and track all customer orders</p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-white shadow rounded-xl p-5 border hover:shadow-xl transition">
          <p className="text-gray-500 text-sm">Total Orders</p>
          <h2 className="text-3xl font-bold">{orders.length}</h2>
        </div>

        <div className="bg-white shadow rounded-xl p-5 border hover:shadow-xl transition">
          <p className="text-gray-500 text-sm">Revenue</p>
          <h2 className="text-3xl font-bold text-green-600">
            ₹{totalRevenue}
          </h2>
        </div>

        <div className="bg-white shadow rounded-xl p-5 border hover:shadow-xl transition">
          <p className="text-gray-500 text-sm">Latest Order</p>
          <h2 className="text-lg font-semibold">
            {orders[0] ? `#${orders[0].id}` : "None"}
          </h2>
        </div>
      </div>

      {/* ORDERS GRID */}
      {orders.length === 0 ? (
        <div className="text-center text-gray-500 text-lg mt-20">
          No orders yet
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl shadow-md border hover:shadow-xl transition duration-300 flex flex-col"
            >
              {/* ORDER HEADER */}
              <div className="flex justify-between items-center p-4 border-b">
                <div>
                  <h2 className="font-bold text-lg">Order #{order.id}</h2>
                  <p className="text-sm text-gray-500">
                    {new Date(order.date).toLocaleString()}
                  </p>
                </div>

                <span
                  className={`text-xs px-3 py-1 rounded-full font-semibold ${statusColors[order.status] || "bg-gray-100 text-gray-700"}`}
                >
                  {order.status}
                </span>
              </div>

              {/* CUSTOMER INFO */}
              <div className="p-4 border-b text-sm text-gray-700 space-y-1">
                <p><strong>Name:</strong> {order.customer.name}</p>
                <p><strong>Phone:</strong> {order.customer.phone}</p>
                <p className="truncate"><strong>Address:</strong> {order.customer.address}</p>
              </div>

              {/* ITEMS */}
              <div className="p-4 flex-grow">
                <p className="font-semibold mb-2">Items</p>
                <ul className="space-y-1 text-sm">
                  {order.items.map((item) => (
                    <li
                      key={item.id}
                      className="flex justify-between border-b pb-1"
                    >
                      <span>{item.name} × {item.quantity}</span>
                      <span className="font-medium">₹{item.price * item.quantity}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* TOTAL */}
              <div className="p-4 border-t flex justify-between items-center">
                <span className="text-gray-600 font-semibold">Total</span>
                <span className="text-xl font-bold text-red-600">₹{order.total}</span>
              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}