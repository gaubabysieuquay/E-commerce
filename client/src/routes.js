import React from "react";
import { Navigate } from "react-router-dom";
import Components from "views/Components/Components.js";
import LandingPage from "views/LandingPage/LandingPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import LoginPage from "views/AuthPage/LoginPage.js";
import ProductPage from "views/ProductPage/ProductPage.js";
import CartPage from "views/ProductPage/CartPage.js";
import RegisterPage from "views/AuthPage/RegisterPage";
import Shipping from "views/ProductPage/Shipping";

const routes = (isLoggedIn) => [
  { path: "/", element: <Components /> },
  { path: "landing-page", element: <LandingPage /> },
  { path: "profile-page", element: <ProfilePage /> },
  { path: "signin", element: <LoginPage /> },
  { path: "register", element: <RegisterPage /> },
  { path: "cart", element: <CartPage /> },
  {
    path: "cart/:id",
    element: <CartPage />,
    children: [{ path: ":qty", element: <CartPage /> }],
  },
  { path: "product/:id", element: <ProductPage /> },
  {
    path: "shipping",
    element: isLoggedIn ? <Shipping /> : <Navigate to="/signin" />,
  },
  { path: "payment" },
];

export default routes;