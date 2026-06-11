import { useGetAllPosts } from "../hooks/usePosts.js";
import PostCard from "./PostCard.jsx";
import { useState } from "react";


const PostFeed = () => {
    const { posts: initialPosts, loading, error } = useGetAllPosts();
    const [posts, setPosts] = useState(null);

    // use local state after first load so we can remove deleted posts
    const displayPosts = posts || initialPosts;

    const handleDelete = (deletedId) => {
        setPosts((prev) =>
            (prev || initialPosts).filter((p) => p._id !== deletedId)
        );
    };

    if (loading) return <p className="feed-loading">Loading posts...</p>;
    if (error) return <p className="feed-error">{error}</p>;
    if (!displayPosts.length) return <p className="feed-empty">No posts yet.</p>;

    return (
        <div className="post-feed">
            {displayPosts.map((post) => (
                <PostCard key={post._id} post={post} onDelete={handleDelete} />
            ))}
        </div>
    );
};

export default PostFeed;