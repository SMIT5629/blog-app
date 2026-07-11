import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuthContext } from "../../auth/auth.context.jsx";
import PostFeed from "../components/PostFeed.jsx";
import WhoToFollow from "../../profile/components/WhoToFollow.jsx";

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

            <div className="home-layout">
                <div className="home-feed">
                    {user && (
                        <section className="hero-section">
                            <h1>What's on your mind today?</h1>
                            <p>
                                Discover stories from writers across tech,
                                design, science, and life.
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
                        </section>
                    )}

                    <p className="home-feed-label">Latest posts</p>
                    <PostFeed type={selectedCategory} />
                </div>

                <aside className="home-sidebar">
                    <div className="sidebar-block">
                        <p className="sidebar-title">Recommended topics</p>
                        <div className="sidebar-card">
                            <p className="sidebar-card-title">Writing on Inkwell</p>
                            <p className="sidebar-card-text">
                                Explore a space to create, share, and discover
                                inspiring stories.
                            </p>
                            <Link to="/create-post" className="sidebar-card-btn">
                                Start writing
                            </Link>
                        </div>
                    </div>

                    <div className="sidebar-block">
                        <p className="sidebar-title">Who to follow</p>
                        <WhoToFollow />
                    </div>

                    <div className="sidebar-block">
                        <p className="sidebar-title">Recently saved</p>
                        <p className="sidebar-empty">No saved stories yet.</p>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default Home;