import React, { useState, useEffect } from "react";
import { collection, getDocs, } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../firebase/config";
import "./producttable.css";
import { SlBasket } from "react-icons/sl";
import { useNavigate } from "react-router-dom";

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  useEffect(() => {
    getProductsFromFirebase();
  }, []);

  const getProductsFromFirebase = async () => {
    try {
      const productsData = [];
      const querySnapshot = await getDocs(collection(db, "my-database"));
      querySnapshot.forEach((doc) => {
        productsData.push({ id: doc.id, ...doc.data() });
      });
      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching products: ", error);
      toast.error("Failed to fetch products!");
    }
  };
  const handleClickProduct = (id) => {
    navigate(`/editproduct/${id}`);
  };

  const handleSearchFunction = (e) => {
    const searchText = e.target.value.toLowerCase();
    setSearch(searchText);
    if (!searchText) {
      getProductsFromFirebase();
    } else {
      const filtered = products.filter((item) =>
        item.name.toLowerCase().includes(searchText)
      );
      setProducts(filtered); 
    }
  };

  if (!products) {
    <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="add-btn">
        <a href="/addproducts">
          <button className="btn btn-primary m-4">Add Product +</button>
        </a>
        <div className="search-container">
          <input
            type="text"
            className="form-control btn btn-primary text-light"
            value={search}
            onChange={handleSearchFunction}
            placeholder="Search Here..."
          />
        </div>
      </div>
      <div className="product-container m-4 shadow-lg p-4">
        {products.map((product, index) => (
          <div className="card-container" key={index}>
            <div
              className="cards"
              style={{ cursor: "pointer" }}
              onClick={() => handleClickProduct(product.id)}
            >
              <img src={product.image} alt={product.name} />
              <div className="card__content">
                <p className="card__title">{product.name}</p>
                <p className="card__description">{product.about}</p>
                <hr className="fw-bold" />
                <div className="card__price__btn">
                  <p className="card__price fw-bold">Price:{product.price}$</p>
                  <SlBasket className="basket" />
                </div>
              </div>
            </div>
          </div>
        ))}
        {
          products.length === 0 && (
            <div className="no-products text-danger">
              <h1>Products not Found</h1>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default ProductTable;
