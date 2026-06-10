import { useState } from "react";
import useAuth from "../hooks/useAuth";
import "../styles/auth.css";

const LoginForm = () => {
    const { handleSignIn, loading, error } = useAuth();
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleSignIn(identifier, password);
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <p className="auth-error">{error}</p>}

            <div className="form-group">
                <label>Email or Username</label>
                <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="Enter email or username"
                    required
                />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    required
                />
            </div>

            <button className="auth-btn" type="submit" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
            </button>
        </form>
    );
};

export default LoginForm;