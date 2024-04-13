import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db, storage } from "../firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";


const Products = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState(null); // Faylni qabul qilish uchun null qilib qo'yamiz
  const [productAbout, setProductAbout] = useState("");
  const navigate = useNavigate()

  const handleProductName = (e) => {
    setProductName(e.target.value);
  };
  const handlProductPrice = (e) => {
    setProductPrice(e.target.value);
  };
  const handleProductImage = (e) => {
    // Faylni olish
    const file = e.target.files[0];
    setProductImage(file);
  };
  const handleProductAbout = (e) => {
    setProductAbout(e.target.value);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    try {
      // Fayl URL manbasini olish
      const imageRef = ref(storage, productName);
      await uploadBytesResumable(imageRef, productImage);
      const imageURL = await getDownloadURL(imageRef);
      await addDoc(collection(db, "my-database"), {
        name: productName,
        price: productPrice,
        about: productAbout,
        image: imageURL, //faylni yuklagan URL si
      });
      toast.success("Product successfully added!");
      navigate("/tableproducts")

      // Formani tozalash
      setProductName("");
      setProductPrice("");
      setProductImage(null); // Faylni qabul qilish uchun null qilib qo'yamiz
      setProductAbout("");
      // Malumotlarni yangilash
    } catch (error) {
      console.error("Error adding product: ", error);
      toast.error("Failed to add product!");
    }
  };

  return (
    <div className="container mt-4 w-80">
      <div className="card shadow-lg p-3 mb-5 rounded">
        <h1 className="fs-3">
          Mahsulot ma'lumotlarini kiritish uchun quyidagi maydonlarni to'ldiring
        </h1>
        <form onSubmit={handleSaveProduct}>
          <div className="mb-3">
            <label htmlFor="productName" className="form-label">
              Mahsulot Nomi
            </label>
            <input
              type="text"
              className="form-control"
              id="productName"
              value={productName}
              onChange={handleProductName}
              placeholder="Mahsulot nomini kiriting"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="productPrice" className="form-label">
              Mahsulot Narxi
            </label>
            <input
              type="text"
              className="form-control"
              id="productPrice"
              value={productPrice}
              onChange={handlProductPrice}
              placeholder="Mahsulot narxini kiriting"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="productImage" className="form-label">
              Mahsulot Rasm Manzili
            </label>
            <input
              type="file"
              className="form-control"
              // value={}
              onChange={handleProductImage}
              id="productImage"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="aboutproduct" className="form-label">
              Mahsulot haqida
            </label>
            <textarea
              name="aboutproduct"
              id="aboutproduct"
              value={productAbout}
              onChange={handleProductAbout}
              className="form-control"
              style={{ resize: "none" }}
              placeholder="Mahsulot haqida..."
              rows="5"
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Mahsulotni qo'shish
          </button>
        </form>
      </div>
      {/* <ProductTable products={products} /> */}
    </div>
  );
};

export default Products;
