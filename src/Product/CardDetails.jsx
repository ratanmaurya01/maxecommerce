import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function CardDetails() {
    const cartItems = useSelector((state) => state.cart.items);

    // Group items by ID and calculate their count
    const groupedItems = cartItems.reduce((acc, item) => {
        if (acc[item.id]) {
            acc[item.id].count += 1; // Increment count if the item already exists
        } else {
            acc[item.id] = { ...item, count: 1 }; // Initialize item with count = 1
        }
        return acc;
    }, {});

    // Convert grouped object into an array and store it in state
    const [cartItemsGrouped, setCartItemsGrouped] = useState(Object.values(groupedItems));
    // Handler to increment count
    const handleIncrement = (id) => {
        const updatedItems = cartItemsGrouped.map((item) =>
            item.id === id ? { ...item, count: item.count + 1 } : item
        );
        setCartItemsGrouped(updatedItems);
    };

    // Handler to decrement count
    const handleDecrement = (id) => {
        const updatedItems = cartItemsGrouped.map((item) =>
            item.id === id && item.count > 1 ? { ...item, count: item.count - 1 } : item
        );
        setCartItemsGrouped(updatedItems);
    };

    // Calculate totals
    const calculatePriceDetails = () => {
        let totalPrice = 0;
        let totalDiscount = 0;
        let deliveryCharge = 40;
        cartItemsGrouped.forEach((item) => {
            const originalPrice = item.price * item.count;
            const discount = item.discount ? item.discount * item.count : 0;
            totalPrice += originalPrice;
            totalDiscount += discount;
        });
        const totalAmount = totalPrice - totalDiscount + (totalPrice > 1000 ? 0 : deliveryCharge);
        return {
            totalPrice,
            totalDiscount,
            deliveryCharge: totalPrice > 1000 ? 0 : deliveryCharge,
            totalAmount,
            savings: totalDiscount,
        };
    };
    const { totalPrice, totalDiscount, deliveryCharge, totalAmount, savings } = calculatePriceDetails();
    if (cartItemsGrouped.length === 0) {
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
        <>

            <div className="px-1">
                <div className="max-w-4xl mx-auto mt-8 p-4 flex flex-col lg:flex-row">
                    {/* Cart Items Section */}
                    <div className="w-full lg:w-3/4">
                        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

                        {cartItemsGrouped.map((item, index) => (
                            <div
                                key={`${item.id}-${index}`}
                                className="p-4 mb-4 shadow-md rounded-lg space-y-4"
                            >
                                {/* Product Details */}
                                <div className="flex items-center space-x-4">
                                    <img
                                        src={
                                            item.images && item.images[0]
                                                ? item.images[0]
                                                : 'https://via.placeholder.com/100'
                                        }
                                        alt={item.name}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                    <div>
                                        <h3 className="text-lg font-semibold">{item.name}</h3>
                                        <div className="flex justify-between">
                                            <p className="text-gray-600">₹{item.price}</p>
                                            <p className="ml-10 text-red-500 font-bold ">
                                                Quantity: {item.count}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Quantity Control */}
                                <div className="flex items-center space-x-2">
                                    <button
                                        type="button"
                                        onClick={() => handleDecrement(item.id)}
                                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-1 px-3 rounded"
                                    >
                                        -
                                    </button>
                                    <input
                                        type="text"
                                        value={item.count}
                                        readOnly
                                        className="w-12 text-center border border-gray-300 rounded py-1"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleIncrement(item.id)}
                                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-1 px-3 rounded"
                                    >
                                        +
                                    </button>

                                    <div className="text-center">
                                        <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-1 px-4 rounded-lg">
                                            Place order
                                        </button>
                                    </div>
                                    <div className="text-center">
                                        <button className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-2 rounded-lg">
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Price Details Section */}
                    <div className="w-full lg:w-1/4 h-72  mt-8 lg:mt-12 shadow-md rounded-lg lg:ml-8 p-4 border-t  border-gray-300">
                        <h2 className="text-xl font-semibold mb-4">Price Details</h2>
                        <div className="space-y-2 text-gray-700">
                            <div className="flex justify-between">
                                <p>Price ({cartItemsGrouped.length} items)</p>
                                <p>₹{totalPrice}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Discount</p>
                                <p className="text-green-600">- ₹{totalDiscount}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Delivery Charges</p>
                                <p>
                                    {deliveryCharge > 0 ? `₹${deliveryCharge}` : <span className="text-green-600">Free</span>}
                                </p>
                            </div>
                            <hr />
                            <div className="flex justify-between font-semibold text-lg">
                                <p>Total Amount</p>
                                <p>₹{totalAmount}</p>
                            </div>
                            <div className="text-green-600 font-medium mt-2">
                                You will save ₹{savings} on this order
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CardDetails;
