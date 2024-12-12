import React, { useState, useEffect } from 'react';
import Product from '../Image/Product/Product6.jpg';
import Product2 from '../Image/Product/Product2.jpg';
import Product3 from '../Image/Product/Product3.jpg';
import Product4 from '../Image/Product/Product4.jpg';
import Product5 from '../Image/Product/Product5.jpg';

function IconSlider() {
    const slides = [Product, Product2, Product3, Product4, Product5];
    const [currentIndex, setCurrentIndex] = useState(0);
    const slideInterval = 5000; // Change slide every 3 seconds
    
    // Automatic sliding
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, slideInterval);

        return () => clearInterval(interval); // Cleanup on unmount
    }, [slides.length]);

    // Handlers for dot and button navigation
    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    const goToPrevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    };

    const goToNextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    return (
        <>

            <div className="w-full" data-carousel="slide">

                <div className="relative flex h-60 sm:h-80 md:h-96 lg:h-[200px] overflow-hidden rounded-sm">
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className={`absolute w-full h-full transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                            data-carousel-item
                        >
                            <img
                                src={slide}
                                className="block w-full h-full object-cover blur-0"
                                alt={`Slide ${index + 1}`}
                            />
                        </div>
                    ))}
                </div>

                <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-gray-700' : 'bg-gray-300'}`}
                            aria-current={index === currentIndex}
                            aria-label={`Slide ${index + 1}`}
                            onClick={() => goToSlide(index)}
                        ></button>
                    ))}
                </div>

                <button
                    type="button"
                    className="absolute top-1/2 left-0 z-30 flex items-center justify-center h-10 w-10 transform -translate-y-1/2 cursor-pointer group focus:outline-none"
                    onClick={goToPrevSlide}
                    data-carousel-prev
                >
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-300/30 group-hover:bg-gray-300/50">
                        <svg
                            className="w-6 h-6 text-gray-700"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                        <span className="sr-only">Previous</span>
                    </span>
                </button>

                <button
                    type="button"
                    className="absolute top-1/2 right-0 z-30 flex items-center justify-center h-10 w-10 transform -translate-y-1/2 cursor-pointer group focus:outline-none"
                    onClick={goToNextSlide}
                    data-carousel-next
                >
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-300/30 group-hover:bg-gray-300/50">
                        <svg
                            className="w-6 h-6 text-gray-700"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                        <span className="sr-only">Next</span>
                    </span>
                </button>

            </div>




        </>
    );
}

export default IconSlider;
