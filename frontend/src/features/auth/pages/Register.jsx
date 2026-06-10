import { Link } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";
import "../styles/auth.css";

const Register = () => {
    return (
        <div className="auth-page">
            <div className="auth-card">
                <h1>Create Account</h1>
                <p className="auth-subtitle">Join us today</p>
                <RegisterForm />
                <p className="auth-footer">
                    Already have an account? <Link to="/login">Sign In</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;