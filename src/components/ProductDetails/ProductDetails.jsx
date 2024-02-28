import axios from "axios";
import React, { useContext } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";

function ProductDetails() {
  let { id } = useParams();
  function getProductDetails() {
    return axios.get(
      `https://route-ecommerce.onrender.com/api/v1/products/${id}`
    );
  }
  const { data, isLoading } = useQuery(
    `getProductDetails-${id}`,
    getProductDetails
  );
  const product = data?.data?.data;
  const { addToCart, setCartCounter } = useContext(cartContext);
  async function pdAddToCart(productId) {
    try {
      let data = await addToCart(productId);
      setCartCounter(data.data.numOfCartItems);
    } catch {
      console.log("yaba");
    }
  }
  if (isLoading) {
    return <>Loading....</>;
  }
  return (
    <>
      <div className="container py-5">
        <div className="row align-items-center">
          <div className="col-md-3">
            <img src={product.imageCover} className="w-100 rounded-2" alt="" />
          </div>
          <div className="col-md-9">
            <h3>{product.title}</h3>
            <p className="text-muted">{product.description}</p>
            <h5>{product.category.name}</h5>
            <div className="d-flex justify-content-between align-items-center py-2">
              <span>{product.price} $</span>
              <span>
                {" "}
                <i className="fa-solid fa-star text-warning"></i>{" "}
                {product.ratingsAverage}
              </span>
            </div>
            <button
              onClick={() => pdAddToCart(id)}
              className="w-100 btn btn-success mt-3"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
