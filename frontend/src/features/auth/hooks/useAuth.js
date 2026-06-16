import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMe as getMeApi, signIn, signUp } from "../services/auth.api.js";
import { useAuthContext } from "../auth.context.jsx";

const useAuth = () => {
    const { login, logout } = useAuthContext();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSignUp = async (name, username, email, password) => {
        setLoading(true);
        setError(null);
        try {
            const data = await signUp(name, username, email, password);
            login(data.user);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleSignIn = async (identifier, password) => {
        setLoading(true);
        setError(null);
        try {
            const data = await signIn(identifier, password);
            login(data.user);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleSignOut = async () => {
        await logout();
        navigate("/login");
    };

    const getMe = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getMeApi();
            login(data.user);
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }   
    };

    return { loading, error, handleSignUp, handleSignIn, handleSignOut, getMe };
};

export default useAuth;
