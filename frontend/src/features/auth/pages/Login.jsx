import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import "../styles/auth.css";

const Login = () => {
    return (
        <div className="auth-page">
            <div className="auth-card">
                <h1>Welcome Back</h1>
                <p className="auth-subtitle">Sign in to your account</p>
                <LoginForm />
                <p className="auth-footer">
                    Don't have an account? <Link to="/register">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;