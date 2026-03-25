import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout";
import Home from "../pages/home";
import Introduce from "../pages/introduce";
import Course from "../pages/course";
import Cart from "../pages/cart";
import Blog from "../pages/blog";
import AuthLayout from "../layout/authLayout";
import AuthForm from "../components/authForm";
export const router = createBrowserRouter([

    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/introduce",
                element: <Introduce />
            },
            {
                path: "/blog",
                element: <Blog />
            },
            {
                path: "/course",
                element: <Course />
            },
            {
                path: "/cart",
                element: <Cart />
            },
        ]
    }, {
        path: "/register",
        element: <AuthLayout><AuthForm type="register" /></AuthLayout>
    },
    {
        path: "/login",
        element: <AuthLayout><AuthForm type="login" /></AuthLayout>
    },



])