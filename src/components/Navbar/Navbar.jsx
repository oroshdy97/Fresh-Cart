import React, { useContext } from "react";

import logo from "../../images/freshcart-logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../../Context/AuthContext";
import { cartContext } from "../../Context/CartContext";

export default function Navbar() {
  const { token, setToken } = useContext(authContext);
  const { cartCounter, setCartCounter } = useContext(cartContext);
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="Fresh cart" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {token ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/cart">
                    Cart {cartCounter}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/products">
                    Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Categories
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Brands
                  </Link>
                </li>
              </ul>
            ) : (
              ""
            )}

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
              <li className="nav-item">
                <ul className="list-unstyled d-flex align-items-center">
                  <li>
                    <i className="me-2 fa-brands fa-instagram"></i>
                  </li>
                  <li>
                    <i className="me-2 fa-brands fa-facebook"></i>
                  </li>
                  <li>
                    <i className="me-2 fa-brands fa-tiktok"></i>
                  </li>
                  <li>
                    <i className="me-2 fa-brands fa-twitter"></i>
                  </li>
                  <li>
                    <i className="me-2 fa-brands fa-linkedin"></i>
                  </li>
                  <li>
                    <i className="me-2 fa-brands fa-youtube"></i>
                  </li>
                </ul>
              </li>
              {token !== null ? (
                <li className="nav-item">
                  <span role="button" onClick={logout} className="nav-link">
                    Logout
                  </span>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/Login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/Register">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
