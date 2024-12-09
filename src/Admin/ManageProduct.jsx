import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../Firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    type: "",
    description: "",
    category: "",
    stock: "",
    image: "",  // Add image state
  });
  const [userEmail, setUserEmail] = useState(null);
  const [newImage, setNewImage] = useState(null);  // For storing new image before upload

  // Firebase storage reference
  const storage = getStorage();

  // Get logged-in user's email
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Fetch products from Firestore for the logged-in user
  useEffect(() => {
    if (!userEmail) return;

    const fetchProducts = async () => {
      try {
        const productsQuery = query(
          collection(db, "products"),
          where("email", "==", userEmail)
        );
        const querySnapshot = await getDocs(productsQuery);
        const productsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsList);
      } catch (error) {
        console.error("Error fetching products: ", error.message);
        alert("Failed to fetch products.");
      }
    };

    fetchProducts();
  }, [userEmail]);

  // Handle delete product
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteDoc(doc(db, "products", id));
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== id)
        );
        alert("Product deleted successfully.");
      } catch (error) {
        console.error("Error deleting product: ", error.message);
        alert("Failed to delete product.");
      }
    }
  };

  // Start editing a product
  const handleEdit = (product) => {
    setEditingProduct(product.id);
    setForm(product);
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
    if (!newImage) return null;

    const imageRef = ref(storage, `products/${newImage.name}`);
    try {
      await uploadBytes(imageRef, newImage);
      const imageUrl = await getDownloadURL(imageRef);
      return imageUrl;
    } catch (error) {
      console.error("Error uploading image: ", error.message);
      alert("Failed to upload image.");
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
        alert("Please fill in all fields.");
        return;
      }

      const parsedPrice = parseFloat(form.price);
      const parsedStock = parseInt(form.stock, 10);

      if (isNaN(parsedPrice) || isNaN(parsedStock)) {
        alert("Price and Stock must be valid numbers.");
        return;
      }

      let imageUrl = form.image; // Use existing image URL by default
      if (newImage) {
        imageUrl = await uploadImage(); // Upload new image if selected
      }

      await updateDoc(doc(db, "products", editingProduct), {
        ...form,
        price: parsedPrice,
        stock: parsedStock,
        image: imageUrl,  // Store image URL in the database
      });

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === editingProduct ? { ...form, id: editingProduct, image: imageUrl } : product
        )
      );

      alert("Product updated successfully!");
      handleCancel();
    } catch (error) {
      console.error("Error updating product: ", error.message);
      alert("Failed to update product.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Manage Products</h2>
      {products.length > 0 ? (
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
            {products.map((product) => (
              <tr key={product.id}>
                <td className="border border-gray-300 px-4 py-2">{product.name}</td>
                <td className="border border-gray-300 px-4 py-2">${product.price}</td>
                <td className="border border-gray-300 px-4 py-2">{product.category}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="w-16 h-16 object-cover" />
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
            <div className="flex justify-end space-x-2 mt-4">
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
    </div>
  );
};

export default ManageProducts;
