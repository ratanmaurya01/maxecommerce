import React from 'react';
import { FiHome, FiSettings, FiUser, FiBell, FiMail } from 'react-icons/fi';



function IconSlider() {
    return (
        <div className="relative w-full" data-carousel="slide">

            {/* Slider Items */}
            <div className="relative flex h-56 overflow-hidden rounded-lg md:h-96">

                <div className="hiden hiden duration-700 ease-in-out flex items-center justify-center text-6xl text-gray-700" data-carousel-item>
                    <img
                    src='/Image/Product/Product.jpg'
                    />
                </div>

                <div className=" hiden duration-700 ease-in-out flex items-center justify-center text-6xl text-gray-700" data-carousel-item>
                    <FiSettings />
                </div>

                <div className=" hiden duration-700 ease-in-out flex items-center justify-center text-6xl text-gray-700" data-carousel-item>
                    <FiUser />
                </div>

                <div className=" hiden duration-700 ease-in-out flex items-center justify-center text-6xl text-gray-700" data-carousel-item>
                    <FiBell />
                </div>

                <div className=" hiden duration-700 ease-in-out flex items-center justify-center text-6xl text-gray-700" data-carousel-item>
                    <FiMail />
                </div>
            </div>

            {/* Indicators */}
            <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3">
                <button type="button" className="w-3 h-3 rounded-full bg-gray-300" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
                <button type="button" className="w-3 h-3 rounded-full bg-gray-300" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
                <button type="button" className="w-3 h-3 rounded-full bg-gray-300" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
                <button type="button" className="w-3 h-3 rounded-full bg-gray-300" aria-current="false" aria-label="Slide 4" data-carousel-slide-to="3"></button>
                <button type="button" className="w-3 h-3 rounded-full bg-gray-300" aria-current="false" aria-label="Slide 5" data-carousel-slide-to="4"></button>
            </div>

            {/* Navigation Buttons */}
            <button type="button" className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-300/30 group-hover:bg-gray-300/50">
                    <svg className="w-6 h-6 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="sr-only">Previous</span>
                </span>
            </button>

            <button type="button" className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-300/30 group-hover:bg-gray-300/50">
                    <svg className="w-6 h-6 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="sr-only">Next</span>
                </span>
            </button>

        </div>
    );
}

export default IconSlider;
