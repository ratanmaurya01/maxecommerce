import React from 'react'
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

    // Convert grouped object into an array
    const cartItemsGrouped = Object.values(groupedItems);

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
    

    <div className='px-10'>
                <div className="max-w-4xl mx-auto mt-8 p-2 shadow-lg rounded-lg">
                    <h2 className="text-2xl font-bold mb-4">Your Cart shopping</h2>
                    <ul className="space-y-4">
                        {cartItemsGrouped.map((item, index) => (
                            <li
                                key={`${item.id}-${index}`}
                                className="flex items-center justify-between pb-4"
                            >
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
                                <p className="text-red-500 font-bold">Quantity: {item.count}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            
   </>
  )
}

export default CardDetails
