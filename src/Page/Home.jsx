import React from "react";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Slider from "./Slider";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function Home() {
    const navigate = useNavigate();
    const { items: products, loading } = useSelector((state) => state.products)
    console.log("product ", products)
    const handleClickProductDetails = (id) => {
        navigate(`/product/${id}`);
    }
    return (
        <>
            <div className="mb-5 relative">
                <Slider />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-3 py-3">
                {loading
                    ? Array.from({ length: 8 }).map((_, index) => (
                        <div key={index} className="max-w-sm bg-white border border-gray-200 rounded-xl shadow">
                            <Skeleton height={260} />
                            <div className="p-2">
                                <Skeleton height={24} width="80%" />
                                <Skeleton height={24} width="40%" />
                            </div>
                        </div>
                    ))
                    : products.length === 0
                        ? <div>No products available</div>
                        : products.map((product) => (
                            <div
                                key={product.id}
                                onClick={() => handleClickProductDetails(product.id)}
                                className="py-0 max-w-sm bg-white border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700"
                            >
                                <div>
                                    <img
                                        className="rounded-t-sm w-full h-48 object-cover rounded-xl"
                                        src={product.images && product.images[0] ? `${product.images[0]}?${new Date().getTime()}` : 'https://via.placeholder.com/300'}
                                        alt={product.name}
                                    />
                                </div>

                                <div className="p-2">
                                    <h5 className="mb-1 tracking-tight text-gray-900 dark:text-white">{product.name}</h5>
                                    <div className="flex justify-between">
                                        <p className="font-normal text-gray-700 dark:text-gray-400">₹{product.price}</p>
                                        <a
                                            href="#"
                                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800"
                                        >
                                            Add to Cart
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
            </div>


            {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-3 py-3 ">
                {isLoading
                    ? Array.from({ length: 8 }).map((_, index) => (
                        <div
                            key={index}
                            className="max-w-sm  bg-white border border-gray-200 rounded-xl shadow dark:bg-gray-800 dark:border-gray-700"
                        >
                            <Skeleton height={260} />
                            <div className="p-2">
                                <Skeleton height={24} width="80%" />
                                <Skeleton height={24} width="40%" />
                            </div>
                        </div>
                    ))
                    : products.length === 0
                        ? <div>No products available</div>
                        : products.map((product) => (
                            <>
                                <div
                                    key={product.id}
                                    className="py-0  max-w-sm bg-white border border-gray-200  shadow dark:bg-gray-800 dark:border-gray-700"
                                >
                                    <a href="#">
                                        <img
                                            className="rounded-t-sm w-full h-48 object-cover rounded-xl"
                                            src={product.images && product.images[0] ? `${product.images[0]}?${new Date().getTime()}` : 'https://via.placeholder.com/300'} // Fallback image if no image exists
                                            alt={product.name}
                                        />
                                    </a>
                                    <div className="p-2">
                                        <h5 className="mb-1 tracking-tight text-gray-900 dark:text-white">
                                            {product.name}
                                        </h5>
                                        <div className="flex justify-between">
                                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                                ₹{product.price}
                                            </p>
                                            <a
                                                href="#"
                                                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                            >
                                                Add to Cart
                                                <svg
                                                    className="w-4 h-4 ml-2"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M12 4v16m8-8H4"
                                                    />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                            </>

                        ))}
            </div> */}


        </>
    );
}




// import React, { useState, useEffect } from 'react';
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from '../Firebase'; // Make sure your db is configured correctly

// export default function Home() {
//     const [products, setProducts] = useState([]);

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const querySnapshot = await getDocs(collection(db, 'products'));
//                 const productList = querySnapshot.docs.map((doc) => ({
//                     id: doc.id,
//                     ...doc.data(),
//                 }));
//                 setProducts(productList); // Store the fetched products
//             } catch (error) {
//                 console.error('Error fetching products:', error.message);
//             }
//         };

//         fetchProducts();
//     }, []);

//     return (
//         <>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-3 py-3">
//                 {products.map((product) => (
//                     <div key={product.id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
//                         <a href="#">
//                             <img
//                                 className="rounded-t-sm w-full h-64 object-cover"
//                                 src={product.images[0]}
//                                 alt={product.name}
//                             />
//                         </a>
//                         <div className="p-5">
//                             <p>
//                                 <h5 className="mb-2 tracking-tight text-gray-900 dark:text-white">{product.name}</h5>
//                             </p>
//                             <div className='flex justify-between'>
//                                 <p className="font-normal text-gray-700 dark:text-gray-400">₹{product.price}</p>

//                                 <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
//                                     Add Card
//                                     <svg
//                                         className="w-4 h-4 ml-2"
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         fill="none"
//                                         viewBox="0 0 24 24"
//                                         stroke="currentColor"
//                                         strokeWidth={2}
//                                     >
//                                         <path
//                                             strokeLinecap="round"
//                                             strokeLinejoin="round"
//                                             d="M12 4v16m8-8H4"
//                                         />
//                                     </svg>
//                                 </a>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//         </>
//     );
// }
