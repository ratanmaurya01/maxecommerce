import React, { useState, useEffect } from "react";
import { deleteDoc, doc, updateDoc, } from "firebase/firestore";
import { db } from "../Firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useDispatch, useSelector } from 'react-redux';
import { useUser } from "../context/authUser";
import { fetchProducts, updateProduct, deleteProduct } from "../redux/productSlice";
import Cancel from "../Model/Cancel";
import toast, { Toaster } from 'react-hot-toast';

const ManageProducts = () => {
    const dispatch = useDispatch();
    const { user } = useUser();
    const userEmail = user?.email;
    const [deleteId, setDeleteId] = useState(null); // State to store the ID to delete
    const [editingProduct, setEditingProduct] = useState(null);
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [form, setForm] = useState({
        name: "",
        price: "",
        type: "",
        description: "",
        category: "",
        stock: "",
        image: "",  // Add image state
    });

    // Fetch products on component mount
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const [newImage, setNewImage] = useState(null);  // For storing new image before upload
    const storage = getStorage();
    const { items: products, loading } = useSelector((state) => state.products);
    const product = products.filter((product) => product.email === userEmail);
    const handleDelete = async (id) => {
        setIsModelOpen(true);
        setDeleteId(id);
    }

    const handleConfirm = async () => {
        try {
            await deleteDoc(doc(db, "products", deleteId)); // Use deleteId here
            // Update Redux store
            dispatch(deleteProduct(deleteId));
            toast("Product deleted successfully.");
        } catch (error) {
            console.error("Error deleting product: ", error.message);
            toast.error("Failed to delete product.");
        } finally {
            setIsModelOpen(false); // Close the modal
            setDeleteId(null); // Reset the ID state
        }
    };

    // Start editing a product
    const handleEdit = (product) => {
        setEditingProduct(product.id);
        setForm({
            ...product,
            image: product.images, // Set the existing image to form state
        });
    };

    // Cancel editing
    const handleCancel = () => {
        setEditingProduct(null);
        setForm({
            name: "",
            price: "",
            type: "",
            description: "",
            category: "",
            stock: "",
            image: "",
        });
        setNewImage(null);  // Clear the new image on cancel
    };

    // Handle image selection
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewImage(file);
        }
    };

    const uploadImage = async () => {
        const imageRef = ref(storage, `products/${newImage.name}`);
        try {
            await uploadBytes(imageRef, newImage);
            const imageUrl = await getDownloadURL(imageRef);
            return imageUrl;
        } catch (error) {
            console.error("Error uploading image: ", error.message);
            toast.error("Failed to upload image.");
            
            return null;
        }
    };

    // Update the product
    const handleUpdate = async () => {
        try {
            if (
                !form.name ||
                !form.price ||
                !form.type ||
                !form.description ||
                !form.category ||
                !form.stock
            ) {
                // alert("Please fill in all fields.");
                toast.error('Please fill in all fields.');
                return;
            }
            const parsedPrice = parseFloat(form.price);
            const parsedStock = parseInt(form.stock, 10);

            if (isNaN(parsedPrice) || isNaN(parsedStock)) {
                // alert("Price and Stock must be valid numbers.");
                toast.error("Price and Stock must be valid numbers.");
                return;
            }

            // Find the current product by ID to get its existing image
            const product = products.find((p) => p.id === editingProduct);
            const oldImage = product?.images;

            // Check for new image upload; fallback to the old image
            let imageUrl = oldImage;
            if (newImage) {
                imageUrl = await uploadImage(); // Upload new image and get URL
            }
            const updatedProduct = {
                ...form,
                price: parsedPrice,
                stock: parsedStock,
                image: imageUrl,
            };

            // Update in Firebase
            await updateDoc(doc(db, "products", editingProduct), updatedProduct);

            // Update Redux store
            dispatch(updateProduct({ id: editingProduct, ...updatedProduct }));
            toast("Product Save succesfully");
            handleCancel();
        } catch (error) {
            console.error("Error updating product: ", error.message);
            alert("Failed to update product.");
            toast.error('Failed to update product.');
        }
    };

    return (

        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-6">Manage Products</h2>
            {loading ? (
                // Skeleton Loader
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">Name</th>
                                <th className="border border-gray-300 px-4 py-2">Price</th>
                                <th className="border border-gray-300 px-4 py-2">Category</th>
                                <th className="border border-gray-300 px-4 py-2">Image</th>
                                <th className="border border-gray-300 px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...Array(5)].map((_, index) => (
                                <tr key={index} className="animate-pulse">
                                    <td className="border border-gray-300 px-4 py-2">
                                        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <div className="h-16 w-16 bg-gray-300 rounded"></div>
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <div className="h-8 w-16 bg-gray-300 rounded inline-block mr-2"></div>
                                        <div className="h-8 w-16 bg-gray-300 rounded inline-block"></div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : product.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">Name</th>
                                <th className="border border-gray-300 px-4 py-2">Price</th>
                                <th className="border border-gray-300 px-4 py-2">Category</th>
                                <th className="border border-gray-300 px-4 py-2">Image</th>
                                <th className="border border-gray-300 px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {product.map((product) => (
                                <tr key={product.id} className="text-nowrap">
                                    <td className="border border-gray-300 px-4 py-2">{product.name}</td>
                                    <td className="border border-gray-300 px-4 py-2">₹{product.price}</td>
                                    <td className="border border-gray-300 px-4 py-2">{product.category}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {product.image ? (
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-16 h-16 object-cover"
                                            />
                                        ) : (
                                            <span>No image</span>
                                        )}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <button
                                            className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                                            onClick={() => handleEdit(product)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-2 py-1 rounded"
                                            onClick={() => handleDelete(product.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="text-center text-gray-500 mt-6">
                    <p>No products available.</p>
                </div>
            )}

            {editingProduct && (
                <div className="mt-6">
                    <h3 className="text-xl font-bold">Edit Product</h3>
                    <form className="space-y-4 mt-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        <input
                            type="number"
                            name="price"
                            placeholder="Price"
                            value={form.price}
                            onChange={(e) => setForm({ ...form, price: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        <select
                            name="type"
                            value={form.type}
                            onChange={(e) => setForm({ ...form, type: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded"
                        >
                            <option value="">Select Type</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                        </select>
                        <textarea
                            name="description"
                            placeholder="Description"
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        <input
                            type="text"
                            name="category"
                            placeholder="Category"
                            value={form.category}
                            onChange={(e) => setForm({ ...form, category: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        <input
                            type="number"
                            name="stock"
                            placeholder="Stock"
                            value={form.stock}
                            onChange={(e) => setForm({ ...form, stock: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        <div className="mt-4">
                            <input
                                type="file"
                                onChange={handleImageChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                            {newImage && <p className="mt-2">Selected Image: {newImage.name}</p>}
                        </div>
                        <div className="flex justify-center space-x-2 mt-4">
                            <button
                                type="button"
                                className="bg-gray-500 text-white px-4 py-2 rounded"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="bg-green-500 text-white px-4 py-2 rounded"
                                onClick={handleUpdate}
                            >
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            )}
            {isModelOpen && (
                <Cancel
                    onClose={() => setIsModelOpen(false)}
                    onConfirm={handleConfirm}
                    message="Are you sure want to Delete."
                />
            )}


            <div>
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />
            </div>
        </div>
    );
};

export default ManageProducts;
