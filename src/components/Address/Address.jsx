import React, { useContext } from "react";
import { cartContext } from "../../Context/CartContext";
import { useParams } from "react-router-dom";

function Address() {
  const { id } = useParams();
  const { pay } = useContext(cartContext);
  async function payment(cartId) {
    let data = await pay(cartId);
    console.log(data);
    if (data.status === 200) {
      window.location.href = data.data.session.url;
    }
  }
  return (
    <>
      <div className="container py-5">
        <label htmlFor="">Details</label>
        <textarea className="w-100 mb-3"></textarea>
        <label htmlFor="">Phone</label>
        <input type="tel" className="form-control" />
        <label htmlFor="">City</label>
        <input type="text" className="form-control mt-3" />
        <button
          onClick={() => {
            payment(id);
          }}
          className="mt-3 btn btn-success"
        >
          Go To Payment
        </button>
      </div>
    </>
  );
}

export default Address;
