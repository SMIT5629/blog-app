import { Link } from "react-router-dom";
import { useAuthContext } from "../../features/auth/auth.context.jsx";
import useAuth from "../../features/auth/hooks/useAuth.js";
import { FiHome, FiEdit } from "react-icons/fi"   

const Navbar = () => {
    const { user } = useAuthContext();
    const { handleSignOut } = useAuth();

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-logo">
                <i className="ti ti-feather" aria-hidden="true"></i>
                Inkwell
            </Link>

            <div className="navbar-right">
                {user ? (
                    <>
                        <Link to="/" className="navbar-btn-ghost">
                            <FiHome size={20} />
                        </Link>
                        <Link to="/create-post" className="navbar-btn-ghost">
                            <FiEdit size={20} />
                        </Link>
                        <Link to={`/profile/${user._id}`} className="navbar-btn-ghost">
                            @{user.username}
                        </Link>
                        <button className="navbar-btn-ghost" onClick={handleSignOut}>
                            Sign out
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="navbar-btn-ghost">Sign in</Link>
                        <Link to="/register" className="navbar-btn-solid">Sign up</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;