import React from "react";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Slider from "./Slider";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FeatureCard from "./FeatureCard";
import Pagination from "./Pagination";
export default function Home() {
    const navigate = useNavigate();
    const { items: products, loading } = useSelector((state) => state.products)
    const handleClickProductDetails = (id) => {
        navigate(`/product/${id}`);
    }

    return (
        <>
            <div className="mt-5 mb-5 relative ">
                <Slider />
            </div>
            <div>
                <FeatureCard />
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
                                className="py-0 max-w-sm bg-white border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700 rounded-lg"
                            >
                                <div className="py-0 px-0 overflow-hidden rounded-lg">
                                    <img
                                        className="w-full h-48 object-cover "
                                        src={product.images && product.images[0] ? `${product.images[0]}?${new Date().getTime()}` : 'https://via.placeholder.com/300'}
                                        alt={product.name}
                                    />
                                </div>
                                <div className="p-2">
                                    <h5 className="mb-1 tracking-tight text-gray-900 dark:text-white">{product.name}</h5>
                                    <div className="flex justify-between">
                                        <p className="font-normal text-gray-700 dark:text-gray-400">₹{product.price}</p>
                                        <p
                                            onClick={() => handleClickProductDetails(product.id)}
                                            className="cursor-pointer inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800"
                                        >
                                            Detials
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}

            </div>
            <div className="flex justify-center items-center mb-5">
                <Pagination />
            </div>

        </>
    );
}
