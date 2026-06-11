import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../features/auth/auth.context.jsx";

const ProtectedRoute = () => {
    const { user, loading } = useAuthContext();

    if (loading) return <p>Loading...</p>;

    if (!user) return <Navigate to="/login" />;

    return <Outlet />; // renders the child route
};

export default ProtectedRoute;