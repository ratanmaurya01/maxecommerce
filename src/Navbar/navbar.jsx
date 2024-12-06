import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <nav className="bg-blue-600 text-white shadow-md fixed w-full z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <NavLink
                        to="/"
                        className="text-2xl font-bold"
                        onClick={closeMenu}
                    >
                        My Logo
                    </NavLink>

                    {/* Mobile Menu Button */}
                    <div className="flex md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="text-white hover:text-gray-200 focus:outline-none"
                        >
                            <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {isOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16m-7 6h7"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <div
                        className={`${isOpen ? 'block' : 'hidden'} md:flex md:items-center md:space-x-6 absolute md:relative top-16 md:top-0 left-0 w-full md:w-auto bg-blue-600 md:bg-transparent md:flex-row md:space-x-4 p-4 md:p-0`}
                    >
                        {/* Search Input */}
                        <div className="relative md:block mb-4 md:mb-0">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg
                                    className="w-4 h-4 text-gray-500"
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
                                <span className="sr-only">Search icon</span>
                            </div>
                            <input
                                type="text"
                                id="search-navbar"
                                className="block w-full md:w-72 p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Search..."
                            />
                        </div>

                        {/* Links */}
                        <NavLink
                            to="#"
                            className="block py-2 px-4 rounded-md hover:bg-blue-500"
                            onClick={closeMenu}
                        >
                            Seller/Buyer
                        </NavLink>
                        <NavLink
                            to="#"
                            className="block py-2 px-4 rounded-md hover:bg-blue-500"
                            onClick={closeMenu}
                        >
                            Products
                        </NavLink>
                        <NavLink
                            to="#"
                            className="block py-2 px-4 rounded-md hover:bg-blue-500"
                            onClick={closeMenu}
                        >
                            Contact Us
                        </NavLink>
                        <NavLink
                            to="#"
                            className="block py-2 px-4 rounded-md hover:bg-blue-500"
                            onClick={closeMenu}
                        >
                            Services
                        </NavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
}
