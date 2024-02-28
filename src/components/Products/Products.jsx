import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

export default function Products() {
  function getAllProducts() {
    return axios.get("https://route-ecommerce.onrender.com/api/v1/products");
  }
  const { data, isLoading } = useQuery("allProducts", getAllProducts);
  const products = data?.data?.data;
  console.log(products);
  if (isLoading) {
    return <>loading...</>;
  }
  return (
    <div className="container py-5">
      <div className="row gy-3">
        {products.map((product) => (
          <div key={product.id} className="col-lg-2">
            <Link to={`/product-details/${product.id}`}>
              <img src={product.imageCover} className="w-100" alt="" />
              <h6 className="text-main ">{product.category.name}</h6>
              <h4 className="text-center">
                {product.title.split(" ").slice(0, 2).join(" ")}
              </h4>
              <div className="py-2 d-flex justify-content-between align-items-center">
                <span>{product.price} $</span>
                <span>
                  <i className="fa-solid fa-star text-warning"></i>{" "}
                  {product.ratingsAverage}
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
