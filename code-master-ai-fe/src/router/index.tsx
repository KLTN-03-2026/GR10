import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout";
import Home from "../pages/home";
import Introduce from "../pages/introduce";
import Course from "../pages/course";
import Cart from "../pages/cart";
import Blog from "../pages/blog";
import CheckoutPage from "../pages/checkout";
import PurchaseHistoryContent from "../pages/purchase";
import AuthLayout from "../layout/authLayout";
import AuthForm from "../components/authForm";
import CourseDetailPage from "../pages/courseDetail";
import PaymentSuccessContent from "../pages/paymentSuccess";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/introduce",
        element: <Introduce />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/course",
        element: <Course />,
      },
      {
        path: "/course/:id",
        element: <CourseDetailPage />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
      {
        path: "/history-order",
        element: <PurchaseHistoryContent />,
      },
      {
        path: "/payment-success/:orderId",
        element: <PaymentSuccessContent />,
      },
    ],
  },
  {
    path: "/register",
    element: (
      <AuthLayout>
        <AuthForm type="register" />
      </AuthLayout>
    ),
  },
  {
    path: "/login",
    element: (
      <AuthLayout>
        <AuthForm type="login" />
      </AuthLayout>
    ),
  },
]);
