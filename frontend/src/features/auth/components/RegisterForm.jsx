import { useState } from "react";
import useAuth from "../hooks/useAuth";
import "../styles/auth.css";

const RegisterForm = () => {
    const { handleSignUp, loading, error } = useAuth();
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleSignUp(name, username, email, password);
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <p className="auth-error">{error}</p>}

            <div className="form-group">
                <label>Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    required
                />
            </div>

            <div className="form-group">
                <label>Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    required
                />
            </div>

            <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
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
                {loading ? "Signing up..." : "Sign Up"}
            </button>
        </form>
    );
};

export default RegisterForm;