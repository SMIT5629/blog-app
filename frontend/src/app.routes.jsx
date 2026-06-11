import { createBrowserRouter } from "react-router-dom";

import ProtectedRoute from "./shared/components/ProtectedRoute";

import Home from "./features/posts/pages/Home";
import PostDetail from "./features/posts/pages/PostDetail";
import CreatePost from "./features/posts/pages/CreatePost";

import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";

import Layout from "./shared/components/Layout.jsx";

export const router = createBrowserRouter([
    {
        element: <Layout />,  // navbar renders here
        children: [
            { path: "/", element: <Home /> },
            { path: "/posts/:id", element: <PostDetail /> },
            { path: "/login", element: <Login /> },
            { path: "/register", element: <Register /> },
            {
                element: <ProtectedRoute />,
                children: [
                    { path: "/create-post", element: <CreatePost /> },
                ]
            }
        ]
    }
]);