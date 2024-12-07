import React, { useState, useEffect, useRef } from 'react';
import { NavLink , useNavigate } from 'react-router-dom';
import { useUser } from '../context/authUser';

export default function Navbar() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useUser(); // Access user and logout from context

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);


    const handlogOut = () => {
        logout();
       navigate('/');
        
    }

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    // Toggles dropdown visibility
    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    // Closes dropdown
    const closeDropdown = () => {
        setIsDropdownOpen(false);
    };

    // Handles clicks outside the dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                closeDropdown();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);



    return (
        <nav className="bg-blue-600 text-white shadow-md fixed w-full z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <NavLink
                        to="/"
                        className="text-2xl font-bold"
                        onClick={closeMenu}
                    >
                        My Logo
                    </NavLink>
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
                    <div
                        className={`${isOpen ? 'block' : 'hidden'} md:flex md:items-center md:space-x-6 absolute md:relative top-16 md:top-0 left-0 w-full md:w-auto bg-blue-600 md:bg-transparent md:flex-row md:space-x-4 p-4 md:p-0`}
                    >
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

                        <NavLink
                            to="#"
                            className="block py-2 px-4 rounded-md hover:bg-blue-500"
                            onClick={closeMenu}
                        >
                            A
                        </NavLink>
                        <NavLink
                            to="#"
                            className="block py-2 px-4 rounded-md hover:bg-blue-500"
                            onClick={closeMenu}
                        >
                            B
                        </NavLink>
                        <NavLink
                            to="#"
                            className="block py-2 px-4 rounded-md hover:bg-blue-500"
                            onClick={closeMenu}
                        >
                            Contact Us
                        </NavLink>

                        {user ? (


                            <div className="relative" ref={dropdownRef}>
                                {/* Dashboard Toggle */}
                                <NavLink
                                    to="#"
                                    className="block py-2 px-4 rounded-md hover:bg-blue-500"
                                    onClick={toggleDropdown}
                                >
                                    <div className="flex items-center gap-2">
                                        <img
                                            id="avatarButton"
                                            className="w-10 h-10 rounded-full cursor-pointer"
                                            src="/docs/images/people/profile-picture-5.jpg"
                                            alt="User dropdown"
                                        />
                                        Dashboard
                                    </div>
                                </NavLink>

                                {/* Dropdown */}
                                {isDropdownOpen && (
                                    <div
                                        id="userDropdown"
                                        className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                                    >
                                        <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                            <div>Bonnie Green</div>
                                            <div className="font-medium truncate">
                                                name@flowbite.com
                                            </div>
                                        </div>
                                        <ul
                                            className="py-2 text-sm text-gray-700 dark:text-gray-200"
                                            aria-labelledby="avatarButton"
                                        >
                                            <li>
                                                <a
                                                    href="#"
                                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                >
                                                    Dashboard
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="#"
                                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                >
                                                    Settings
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="#"
                                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                >
                                                    Earnings
                                                </a>
                                            </li>
                                        </ul>
                                        <div className="py-1">
                                            <p
                                                onClick={handlogOut}
                                                className="block px-4 cursor-pointer py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                            >
                                                Sign out
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <NavLink
                                    to="/login"
                                    className="block py-2 px-4 rounded-md hover:bg-blue-500"
                                    onClick={closeMenu}
                                >
                                    Login
                                </NavLink>
                            </>
                        )}

                    </div>
                </div>
            </div>
        </nav>
    );
}
