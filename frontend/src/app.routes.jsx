import { createBrowserRouter } from "react-router-dom";

import ProtectedRoute from "./shared/components/ProtectedRoute";

import Home from "./features/posts/pages/Home";
import PostDetail from "./features/posts/pages/PostDetail";
import CreatePost from "./features/posts/pages/CreatePost";
import EditPost from "./features/posts/pages/EditPost";

import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";

import Profile from "./features/profile/pages/Profile";
import Followers from "./features/profile/pages/Followers";
import Following from "./features/profile/pages/Following";
import EditProfile from "./features/profile/pages/EditProfile";
import FollowFeedPage from "./features/profile/pages/FollowFeedPage.jsx";

import Layout from "./shared/components/Layout.jsx";


export const router = createBrowserRouter([
    {
        element: <Layout />,  // navbar renders here
        children: [
            { path: "/", element: <Home /> },
            { path: "/posts/:id", element: <PostDetail /> },
            { path: "/login", element: <Login /> },
            { path: "/register", element: <Register /> },
            { path: "/profile/:id", element: <Profile /> },
            { path: "/profile/:id/followers", element: <Followers /> },
            { path: "/profile/:id/following", element: <Following /> },
            { path: "/profile/me/edit", element: <EditProfile /> },
            { path: "/follow-feed", element: <FollowFeedPage /> },
            {
                element: <ProtectedRoute />,
                children: [
                    { path: "/create-post", element: <CreatePost /> },
                    { path: "/posts/:id/edit", element: <EditPost /> },
                ]
            }
        ]
    }
]);