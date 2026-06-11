import { Link } from "react-router-dom";
import { useAuthContext } from "../../auth/auth.context.jsx";
import PostFeed from "../components/PostFeed.jsx";


import "../styles/posts.css"

const Home = () => {
    const { user } = useAuthContext();

    return (
        <div className="home-page">

            {/* hero — only show if not logged in */}
            {!user && (
                <div className="home-hero">
                    <h1>Ideas worth sharing</h1>
                    <p>Discover stories, thinking, and expertise from writers on any topic.</p>
                    <div className="home-hero-btns">
                        <Link to="/register" className="home-hero-btn-solid">Start reading</Link>
                        <Link to="/login" className="home-hero-btn-outline">Sign in</Link>
                    </div>
                </div>
            )}

            <div className="home-feed">
                <p className="home-feed-label">Latest posts</p>
                <PostFeed />
            </div>
        </div>
    );
};

export default Home;