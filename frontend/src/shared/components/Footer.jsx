import { Link } from "react-router-dom";
import { FiGithub, FiTwitter, FiInstagram, FiFeather } from "react-icons/fi";


const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-inner">

                {/* logo + tagline */}
                <div className="footer-brand">
                    <Link to="/" className="footer-logo">
                        <FiFeather size={18} />
                        Inkwell
                    </Link>
                    <p className="footer-tagline">Ideas worth sharing.</p>
                </div>

                {/* nav links */}
                <div className="footer-links">
                    <p className="footer-links-title">Navigate</p>
                    <Link to="/" className="footer-link">Home</Link>
                    <Link to="/about" className="footer-link">About</Link>
                    <Link to="/contact" className="footer-link">Contact</Link>
                </div>

                {/* social links */}
                <div className="footer-social-wrap">
                    <p className="footer-links-title">Follow us</p>
                    <div className="footer-socials">
                        <a href="https://github.com" target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="GitHub">
                            <FiGithub size={18} />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="Twitter">
                            <FiTwitter size={18} />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="Instagram">
                            <FiInstagram size={18} />
                        </a>
                    </div>
                </div>
            </div>

            {/* copyright */}
            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} Inkwell. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;