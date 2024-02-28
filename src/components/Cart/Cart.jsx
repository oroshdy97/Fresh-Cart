import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";

function Cart() {
  const { getCart, deleteItem, updateQuantity } = useContext(cartContext);
  const [data, setData] = useState(null);
  async function userCart() {
    let { data } = await getCart();
    console.log(data);
    setData(data);
  }
  async function deleteCartItem(productId) {
    let { data } = await deleteItem(productId);
    setData(data);
    console.log(data);
  }
  async function updateItemQuantity(productId, count) {
    let { data } = await updateQuantity(productId, count);
    setData(data);
    console.log(data);
  }
  useEffect(() => {
    userCart();
  });
  if (data === null) <>Loading...</>;
  return (
    <>
      <div className="container py-5">
        {console.log(data)}
        <h2>Your Cart</h2>
        <p className="text-main">
          Total Cart Price: {data?.data?.totalCartPrice}$
        </p>
        {data?.data?.products.map((product, i) => {
          return (
            <div key={i} className="row py-4 border-bottom">
              <div className="col-md-1">
                <img
                  src={product.product.imageCover}
                  className="w-100"
                  alt=""
                />
              </div>
              <div className="col-md-11 d-flex justify-content-between align-items-center">
                <div className="col-md-9">
                  <h4>{product.product.title}</h4>
                  <p>Price : {product.price} $</p>
                  <button
                    onClick={() => {
                      deleteCartItem(product.product._id);
                    }}
                    className="btn-danger btn"
                  >
                    Remove
                  </button>
                </div>
                <div className="col-md-3">
                  <button
                    onClick={() => {
                      updateItemQuantity(
                        product.product._id,
                        product.count + 1
                      );
                    }}
                    className="btn btn-success"
                  >
                    +
                  </button>
                  <span className="mx-2">{product.count}</span>
                  <button
                    disabled={product.count <= 1 ? true : false}
                    onClick={() => {
                      updateItemQuantity(
                        product.product._id,
                        product.count - 1
                      );
                    }}
                    className="btn btn-success"
                  >
                    -
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        <Link
          to={`/address/${data?.data?._id}`}
          className="btn my-3 btn-success"
        >
          Shipping Address
        </Link>
      </div>
    </>
  );
}

export default Cart;
