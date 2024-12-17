import React from "react";
import { useUser } from "../context/authUser";

export default function PlaceOrder() {
    const { user } = useUser();

    return (
        <>
            {user ? (
                <div className="max-w-4xl mx-auto bg-gray-100 p-4 rounded-lg shadow-md">

                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-semibold text-gray-800">Place Your Order</h2>
                    </div>

                    <div className="bg-white p-4 rounded-lg mb-6 border">
                        <h3 className="text-lg font-medium mb-4">1. Delivery Address</h3>
                        <div className="flex items-start gap-4 p-4 border rounded mb-4">
                            <input
                                type="radio"
                                id="address1"
                                name="address"
                                className="mt-1"
                                defaultChecked
                            />
                            <label htmlFor="address1" className="text-gray-600">
                                <strong>John Doe</strong> <br />
                                123 Main Street, Apt 4B, City, State, 560034 <br />
                                Phone: 9876543210
                            </label>
                        </div>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                            + Add New Address
                        </button>
                    </div>

                    <div className="bg-white p-4 rounded-lg mb-6 border">
                        <h3 className="text-lg font-medium mb-4">2. Order Summary</h3>
                        <div className="flex justify-between items-center border-b pb-4 mb-4">
                            <div>
                                <p className="font-semibold">Product Name</p>
                                <p className="text-gray-600">₹ 1,299</p>
                            </div>
                            <p className="text-gray-600">Qty: 1</p>
                        </div>
                        <div className="text-right font-semibold text-lg">
                            Total: ₹ 1,299
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg mb-6 border">
                        <h3 className="text-lg font-medium mb-4">3. Payment Method</h3>
                        <div className="flex items-center mb-2">
                            <input type="radio" id="cod" name="payment" className="mr-2" />
                            <label htmlFor="cod" className="text-gray-700">
                                Cash on Delivery (COD)
                            </label>
                        </div>
                        <div className="flex items-center mb-2">
                            <input type="radio" id="upi" name="payment" className="mr-2" />
                            <label htmlFor="upi" className="text-gray-700">
                                UPI Payment
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input type="radio" id="card" name="payment" className="mr-2" />
                            <label htmlFor="card" className="text-gray-700">
                                Credit / Debit Card
                            </label>
                        </div>
                    </div>

                    <div className="text-center">
                        <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-lg">
                            Place Order
                        </button>
                    </div>
                </div>
            ) : (
                <>
                
                    <div className="text-center mt-10 text-gray-700">
                        <p>Please log in to place an order.</p>
                    </div>
                </>
            )}
        </>
    );
}
