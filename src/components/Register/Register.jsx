import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function Register() {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const userData = {
    name: "",
    email: "",
    phone: "",
    password: "",
    rePassword: "",
  };
  async function addUser(values) {
    await axios
      .post("https://route-ecommerce.onrender.com/api/v1/auth/signup", values)
      .then((x) => {
        setSuccess(true);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      })
      .catch((x) => {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 3000);
      });
  }
  function validationSchema() {
    let schema = Yup.object({
      name: Yup.string().min(3, "characters must exceed 3").required(),
      email: Yup.string().email().required(),
      phone: Yup.string().required(),
      password: Yup.string().min(6).required(),
      rePassword: Yup.string()
        .oneOf([Yup.ref("password")], "must match password")
        .required(),
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
        <h2>Register Now: </h2>
        {success ? (
          <div className="alert alert-success text-center">Account Created</div>
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
          <label htmlFor="name">name: </label>
          <input
            onBlur={myFormik.handleBlur}
            onChange={myFormik.handleChange}
            value={myFormik.values.name}
            id="name"
            type="text"
            placeholder="name"
            className="form-control mb-3"
          />
          {myFormik.errors.name && myFormik.touched.name ? (
            <div className="alert alert-danger">{myFormik.errors.name}</div>
          ) : (
            ""
          )}
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
          <label htmlFor="phone">phone: </label>
          <input
            onBlur={myFormik.handleBlur}
            onChange={myFormik.handleChange}
            value={myFormik.values.phone}
            id="phone"
            type="text"
            placeholder="phone"
            className="form-control mb-3"
          />
          {myFormik.errors.phone && myFormik.touched.phone ? (
            <div className="alert alert-danger">{myFormik.errors.phone}</div>
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
          <label htmlFor="rePassword">rePassword: </label>
          <input
            onBlur={myFormik.handleBlur}
            onChange={myFormik.handleChange}
            value={myFormik.values.rePassword}
            id="rePassword"
            type="password"
            placeholder="rePassword"
            className="form-control mb-3"
          />
          {myFormik.errors.rePassword && myFormik.touched.rePassword ? (
            <div className="alert alert-danger">
              {myFormik.errors.rePassword}
            </div>
          ) : (
            ""
          )}
          <button
            type="submit"
            className="btn bg-main p-2 text-white rounded-3"
          >
            Register
          </button>
        </form>
      </div>
    </>
  );
}
