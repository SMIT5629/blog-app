import { useState } from "react";
import { useGetAllPosts } from "../hooks/usePosts.js";
import PostCard from "./PostCard.jsx";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const SuggestedPosts = ({ excludePostId ,type}) => {
    const { posts, loading } = useGetAllPosts();
    const [currentIndex, setCurrentIndex] = useState(0);

    // filter out current post
     const filtered = posts.filter((p) => 
        p._id !== excludePostId && p.type === type  
    );
    const visible = filtered.slice(currentIndex, currentIndex + 2);

    const canPrev = currentIndex > 0;
    const canNext = currentIndex + 2 < filtered.length;

    const handlePrev = () => {
        if (canPrev) setCurrentIndex((prev) => prev - 1);
    };

    const handleNext = () => {
        if (canNext) setCurrentIndex((prev) => prev + 1);
    };

    if (loading) return null;
    if (!filtered.length) return null;

    return (
        <div className="suggested-posts">
            <div className="suggested-header">
                <p className="suggested-label">Suggested Blogs</p>
                <div className="suggested-btns">
                    <button
                        className="suggested-btn"
                        onClick={handlePrev}
                        disabled={!canPrev}
                        aria-label="Previous"
                    >
                        <FiChevronLeft size={18} />
                    </button>
                    <button
                        className="suggested-btn"
                        onClick={handleNext}
                        disabled={!canNext}
                        aria-label="Next"
                    >
                        <FiChevronRight size={18} />
                    </button>
                </div>
            </div>

            <div className="suggested-grid">
                {visible.map((post) => (
                    <PostCard key={post._id} post={post} />
                ))}
            </div>
        </div>
    );
};

export default SuggestedPosts;