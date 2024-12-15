import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function CartPage() {
    const cartItems = useSelector((state) => state.cart.items);

    if (cartItems.length === 0) {
        return (
            <div className="text-center mt-8">
                <h2 className="text-2xl font-bold">Your Cart is Empty</h2>
                <Link to="/" className="text-blue-500 underline mt-4 inline-block">
                    Go back to products
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto mt-8 p-4">
            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
            <ul className="space-y-4">
                {cartItems.map((item) => (
                    <li key={item.id} className="flex items-center justify-between border-b pb-4">
                        <div className="flex items-center space-x-4">
                            <img
                                src={item.images && item.images[0] ? item.images[0] : 'https://via.placeholder.com/100'}
                                alt={item.name}
                                className="w-16 h-16 object-cover rounded"
                            />
                            <div>
                                <h3 className="text-lg font-semibold">{item.name}</h3>
                                <p className="text-gray-600">₹{item.price}</p>
                            </div>
                        </div>
                        <p className="text-red-500 font-bold">Quantity: 1</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
