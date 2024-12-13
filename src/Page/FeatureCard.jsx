import React from 'react';
import { TbTruckDelivery, TbDiscount } from "react-icons/tb";
import { RiRefund2Fill } from "react-icons/ri";
import { MdSupportAgent } from "react-icons/md";

// Smaller component for each feature card
function FeatureCardItem({ icon, title, desc }) {
    return (
        <div className="p-4 px-3 border rounded shadow-md text-center">
            <div className="text-primary mb-2">{icon}</div>
            <h3 className="font-bold text-lg">{title}</h3>
            <p className="text-gray-600">{desc}</p>
        </div>
    );
}

// Main FeatureCard component
export default function FeatureCard() {
    const data = [
        {
            icon: (
                <div className="text-4xl">
                    <TbTruckDelivery />
                </div>
            ),
            title: "Free Shipping",
            desc: "Get free shipping on all orders over $50",
        },
        {
            icon: (
                <div className="text-4xl">
                    <RiRefund2Fill />
                </div>
            ),
            title: "Easy Returns",
            desc: "Hassle-free returns within 30 days",
        },
        {
            icon: (
                <div className="text-4xl">
                    <TbDiscount />
                </div>
            ),
            title: "Best Discounts",
            desc: "Amazing discounts on $99.0",
        },
        {
            icon: (
                <div className="text-4xl">
                    <MdSupportAgent />
                </div>
            ),
            title: "24/7 Support",
            desc: "Customer support available 24/7",
        },
    ];

    return (
        <div className="container px-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-8">
            {data.map((item) => (
                <FeatureCardItem
                    key={item.title}
                    icon={item.icon}
                    title={item.title}
                    desc={item.desc}
                />
            ))}
        </div>
    );
}
