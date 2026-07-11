import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useAuthContext } from "../../features/auth/auth.context.jsx";
import useAuth from "../../features/auth/hooks/useAuth.js";
import { FiHome, FiEdit, FiLogOut, FiUser, FiChevronDown } from "react-icons/fi";

const Navbar = () => {
    const { user } = useAuthContext();
    const { handleSignOut } = useAuth();
    const userId = user?._id || user?.id;
    const profilePath = userId ? `/profile/${userId}` : "/profile/me";

    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-logo">
                <i className="ti ti-feather" aria-hidden="true"></i>
                Inkwell
            </Link>

            <div className="navbar-right">
                <Link to="/" className="navbar-icon-btn" aria-label="Home">
                    <FiHome size={18} />
                </Link>

                {user ? (
                    <>
                        <Link to="/create-post" className="navbar-icon-btn" aria-label="Write a post">
                            <FiEdit size={18} />
                        </Link>

                        <div className="navbar-menu" ref={menuRef}>
                            <button
                                className="navbar-menu-trigger"
                                onClick={() => setMenuOpen((prev) => !prev)}
                                aria-expanded={menuOpen}
                                aria-label="Account menu"
                            >
                                {user.avatar_image ? (
                                    <img
                                        src={user.avatar_image}
                                        className="navbar-avatar-img"
                                        alt={user.username}
                                    />
                                ) : (
                                    <span className="navbar-avatar-placeholder">
                                        {user.username?.[0]?.toUpperCase()}
                                    </span>
                                )}
                                <FiChevronDown size={14} className="navbar-menu-chevron" />
                            </button>

                            {menuOpen && (
                                <div className="navbar-menu-dropdown">
                                    <Link
                                        to={profilePath}
                                        className="navbar-menu-item"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        <FiUser size={15} />
                                        Profile
                                    </Link>
                                    <button
                                        className="navbar-menu-item navbar-menu-item-danger"
                                        onClick={() => {
                                            setMenuOpen(false);
                                            handleSignOut();
                                        }}
                                    >
                                        <FiLogOut size={15} />
                                        Sign out
                                    </button>
                                </div>
                            )}
                        </div>
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