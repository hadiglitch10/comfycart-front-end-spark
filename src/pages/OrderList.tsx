import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

interface Order {
  id: string;
  date: string;
  total: number;
  items: {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
  }[];
}

const OrderList: React.FC = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const userOrdersKey = user?.email ? `orders_${user.email}` : "orders_guest";

  useEffect(() => {
    const savedOrders = sessionStorage.getItem(userOrdersKey);
    setOrders(savedOrders ? JSON.parse(savedOrders) : []);
  }, [userOrdersKey]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Order #{order.id}</span>
                <span>{order.date}</span>
                <span className="font-semibold">Total: ${order.total.toFixed(2)}</span>
              </div>
              <div className="border-t pt-4 mt-2">
                <h3 className="font-medium mb-2">Items:</h3>
                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded" />
                      <div className="flex-1">
                        <div className="font-medium">{item.title}</div>
                        <div className="text-gray-600 text-sm">Quantity: {item.quantity}</div>
                      </div>
                      <div className="text-right font-semibold">${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderList; 