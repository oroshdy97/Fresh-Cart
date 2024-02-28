import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { authContext } from "../../Context/AuthContext";
export default function Login() {
  const { setToken } = useContext(authContext);
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const userData = {
    email: "",
    password: "",
  };
  async function addUser(values) {
    await axios
      .post("https://route-ecommerce.onrender.com/api/v1/auth/signin", values)
      .then((x) => {
        setSuccess(true);
        localStorage.setItem("token", x.data.token);
        setToken(x.data.token);
        setTimeout(() => {
          navigate("/products");
        }, 3000);
      })
      .catch((x) => {
        console.log(x);
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 3000);
      });
  }
  function validationSchema() {
    let schema = Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
    });
    return schema;
  }
  const myFormik = useFormik({
    initialValues: userData,
    onSubmit: addUser,
    validationSchema,
  });

  return (
    <>
      <div className="w-75 m-auto p-5">
        <h2>Login Now: </h2>
        {success ? (
          <div className="alert alert-success text-center">Welcome</div>
        ) : (
          ""
        )}
        {error ? (
          <div className="alert alert-danger text-center">
            Something Went Wrong
          </div>
        ) : (
          ""
        )}
        <form onSubmit={myFormik.handleSubmit}>
          <label htmlFor="email">email: </label>
          <input
            onBlur={myFormik.handleBlur}
            onChange={myFormik.handleChange}
            value={myFormik.values.email}
            id="email"
            type="email"
            placeholder="email"
            className="form-control mb-3"
          />
          {myFormik.errors.email && myFormik.touched.email ? (
            <div className="alert alert-danger">{myFormik.errors.email}</div>
          ) : (
            ""
          )}

          <label htmlFor="password">password: </label>
          <input
            onBlur={myFormik.handleBlur}
            onChange={myFormik.handleChange}
            value={myFormik.values.password}
            id="password"
            type="password"
            placeholder="password"
            className="form-control mb-3"
          />
          {myFormik.errors.password && myFormik.touched.password ? (
            <div className="alert alert-danger">{myFormik.errors.password}</div>
          ) : (
            ""
          )}

          <button
            type="submit"
            className="btn bg-main p-2 text-white rounded-3"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
}
