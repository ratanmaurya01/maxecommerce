import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

function ProductDetails() {

    const { id } = useParams();
    const { items: products } = useSelector((state) => state.products);

    const product = products.find((product) => product.id === id);

    if (!product) {
        return <div>Product not available </div>
    }

    return (
        <div>
            <div className="p-5">
                <h1 className="text-2xl font-bold">{product.name}</h1>
                <img
                    src={product.images && product.images[0] ? product.images[0] : 'https://via.placeholder.com/300'}
                    alt={product.name}
                    className="my-4 w-full h-auto rounded-md"
                />
                <p className="text-gray-700">{product.description}</p>
                <p className="text-gray-500">Category: {product.category}</p>
                <p className="text-gray-500">Price: ${product.price}</p>
                <p className="text-gray-500">Stock: {product.stock}</p>
            </div>
        </div>
    )
}

export default ProductDetails
