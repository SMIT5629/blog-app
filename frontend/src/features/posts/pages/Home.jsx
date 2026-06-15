import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuthContext } from "../../auth/auth.context.jsx";
import PostFeed from "../components/PostFeed.jsx";


const Home = () => {
    const { user } = useAuthContext();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const categories = [
        "TECH",
        "LIFESTYLE",
        "TRAVEL",
        "FOOD",
        "OTHER",
    ];

    return (
        <div className="home-page">
            {user && (
                <section className="hero-section">
                    <h1>What's on your mind today?</h1>
                    <p>
                        Discover stories from writers across tech, design,
                        science, and life.
                    </p>


                    <div className="categories">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                className={selectedCategory === cat ? "active" : ""}
                                onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </section>)
            }
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
                <PostFeed type={selectedCategory} />
            </div>
        </div>
    );
};

export default Home;