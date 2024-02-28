import React from "react";
import {
  RouterProvider,
  createBrowserRouter,
  createHashRouter,
} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Products from "./components/Products/Products";
import NotFound from "./components/NotFound/NotFound";
import AuthContextProvider from "./Context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "react-query";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import CartContextProvider from "./Context/CartContext";
import Cart from "./components/Cart/Cart";
import Address from "./components/Address/Address";

const myRouter = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Register /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },

      { path: "cart", element: <Cart /> },
      { path: "address/:id", element: <Address /> },
      { path: "product-details/:id", element: <ProductDetails /> },
      { path: "*", element: <NotFound /> },
    ],
  }, //Route
]);

export default function App() {
  const query = new QueryClient();
  return (
    <>
      <QueryClientProvider client={query}>
        <CartContextProvider>
          <AuthContextProvider>
            <RouterProvider router={myRouter} />
          </AuthContextProvider>
        </CartContextProvider>
      </QueryClientProvider>
    </>
  );
}
