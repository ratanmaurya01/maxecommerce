import React, { useRef, useState, useEffect } from "react";

export default function Search({ onClose }) {
    const [searchTerm, setSearchTerm] = useState(""); // Current search input
    const [recentSearches, setRecentSearches] = useState([]); // Store recent searches
    const modalRef = useRef(null);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim() !== "") {
            setRecentSearches((prev) => {
                // Add new search term and limit recent searches to 5 items
                const updatedSearches = [searchTerm, ...prev].slice(0, 5);
                return updatedSearches;
            });
            setSearchTerm(""); // Clear the input field after submitting
        }
    };

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                onClose(); // Trigger the close function
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, [onClose]);


    return (
        <>

            <div
                id="static-modal"
                aria-hidden="true"
                className="fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-50"
            >
                <div
                    ref={modalRef}
                    className="relative p-5 w-full max-w-2xl mx-auto mt-16"
                >
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <form onSubmit={handleSearchSubmit} className="p-1 md:p-3 w-full">
                                <div className="relative">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <svg
                                        onClick={handleSearchSubmit}
                                            className="w- h-5 text-gray-500 dark:text-gray-400"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                            />
                                        </svg>
                                    </div>
                                    <input
                                        type="search"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder="Search Mockups, Logos..."
                                        className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </div>
                            </form>
                        </div>

                        <div className="p-4 md:p-5">
                            <h4 className="text-lg font-semibold text-gray-700 dark:text-white">
                                Recent Searches
                            </h4>
                            {recentSearches.length > 0 ? (
                                <ul className="mt-2 space-y-2">
                                    {recentSearches.map((item, index) => (
                                        <li
                                            key={index}
                                            className="p-2 bg-gray-100 rounded-md dark:bg-gray-600 dark:text-white"
                                        >
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500 dark:text-gray-400">
                                    No recent searches
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>




        </>
    );
}
