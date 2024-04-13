import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { db, storage } from "../../firebase/config";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    about: "",
    price: "",
    image: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductFromFirebase();
  }, []);

  const getProductFromFirebase = async () => {
    try {
      const productRef = doc(db, "my-database", id);
      const productSnapshot = await getDoc(productRef);
      if (productSnapshot.exists()) {
        setProduct({ ...productSnapshot.data(), id: id });
      } else {
        toast.error("Product not found!");
      }
    } catch (error) {
      console.error("Error fetching product: ", error);
      toast.error("Failed to fetch product!");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    const imageUrl = URL.createObjectURL(file);
    setProduct({ ...product, image: imageUrl });
  };

  const uploadImageToStorage = async () => {
    try {
      const storageRef = ref(storage, `${imageFile.name}`);
      await uploadBytes(storageRef, imageFile);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading image: ", error);
      toast.error("Failed to upload image!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = product.image;
      if (imageFile) {
        imageUrl = await uploadImageToStorage();
      }
      const updatedProduct = { ...product, image: imageUrl };
      const productRef = doc(db, "my-database", id);
      await updateDoc(productRef, updatedProduct);
      toast.success("Product updated successfully!");
      navigate("/tableproducts");
    } catch (error) {
      console.error("Error updating product: ", error);
      toast.error("Failed to update product!");
    }
  };

  const handleDeleteProduct = async () => {
    if(window.confirm("Are you sure you want to delete this product?")){
      try {
        const productRef = doc(db,"my-database",id)
        await deleteDoc(productRef)
        toast.success("Product deleted successfully!")
        navigate("/tableproducts")
      } catch (error) {
        console.error("Error deleting product: ", error);
      toast.error("Failed to delete product!");
      }
    }
  }

  return (
    <div className="container">
      <h2>Edit Product</h2>
      {product.image && (
            <img
              src={product.image}
              alt="Product"
              className="mt-2 w-100"
              style={{ maxWidth: "200px" }}
            />
          )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={product.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="about" className="form-label">
            About
          </label>
          <textarea
            className="form-control"
            style={{ resize: "none" }}
            id="about"
            name="about"
            value={product.about}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            value={product.price}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image
          </label>
          <input
            type="file"
            className="form-control"
            id="image"
            name="image"
            onChange={handleImageChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update
        </button>
        <a className="btn btn-danger m-3" onClick={handleDeleteProduct}>Delete Product</a>
      </form>
    </div>
  );
};

export default EditProduct;
