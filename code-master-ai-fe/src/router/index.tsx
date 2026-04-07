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
import AdminLayout from "../layout/adminLayout";
import ArticleManage from "../pages/articleManage";
import CourseManage from "../pages/courseManage";
import ExerciseManage from "../pages/exerciseManage";
import UserManage from "../pages/userManage";
import CategoryManage from "../pages/categoryManage";
import RevenueStatisticsPage from "../pages/revenueManage";

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
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "/admin", element: <RevenueStatisticsPage /> },
      { path: "articles", element: <ArticleManage /> },
      { path: "courses", element: <CourseManage /> },
      { path: "exercises", element: <ExerciseManage /> },
      { path: "users", element: <UserManage /> },
      { path: "categories", element: <CategoryManage /> },
    ],
  },
]);
