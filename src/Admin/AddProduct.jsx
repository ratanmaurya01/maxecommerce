import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../Firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useUser } from "../context/authUser";

const AddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    type: "",
    description: "",
    category: "",
    stock: "",
    images: [],
  });

  const [uploading, setUploading] = useState(false); // To track upload progress
  const [error, setError] = useState(null); // To display any error during image upload

  const  {user} = useUser(); 
  
  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };



  const handleImageUpload = (e) => {
    const files = e.target.files;
    const uploadedImages = [];
    setUploading(true);
    setError(null);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const storageRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // You can add a progress bar here if you wish
        },
        (error) => {
          setUploading(false);
          setError("Failed to upload image. Please try again.");
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          uploadedImages.push(downloadURL);
          if (uploadedImages.length === files.length) {
            setUploading(false);
            setForm((prevForm) => ({ ...prevForm, images: uploadedImages }));
          }
        }
      );
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        !form.name ||
        !form.price ||
        !form.type ||
        !form.description ||
        !form.category ||
        !form.stock ||
        form.images.length === 0
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

      await addDoc(collection(db, "products"), {
        ...form,
        price: parsedPrice,
        stock: parsedStock,
        email: user?.email,
        createdAt: serverTimestamp(),
      });

      alert("Product added successfully!");
      setForm({
        name: "",
        price: "",
        type: "",
        description: "",
        category: "",
        stock: "",
        images: [],
      });
    } catch (error) {
      console.error("Error adding product: ", error.message);
      alert("Failed to add product.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
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
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <div>
          <input
            type="file"
            name="images"
            onChange={handleImageUpload}
            multiple
            className="w-full p-2 border border-gray-300 rounded"
          />
          {uploading && <p>Uploading images...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {form.images.length > 0 && (
            <div className="mt-2">
              <h3>Uploaded Images:</h3>
              <ul>
                {form.images.map((url, index) => (
                  <li key={index}>
                    <img src={url} alt={`Product ${index}`} className="w-24 h-24 object-cover" />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
