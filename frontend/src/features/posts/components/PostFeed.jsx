import { useGetAllPosts } from "../hooks/usePosts.js";
import PostCard from "./PostCard.jsx";
import { useState } from "react";

const PostFeed = ({ type = null, excludePostId = null }) => {
    const { posts: initialPosts, loading, error } = useGetAllPosts();
    const [posts, setPosts] = useState(null);

    const displayPosts = posts || initialPosts;

    const filteredPosts = displayPosts.filter((post) => {
        if (excludePostId && post._id === excludePostId) return false;
        if (type && post.type !== type) return false;
        return true;
    });

    const handleDelete = (deletedId) => {
        setPosts((prev) =>
            (prev || initialPosts).filter((p) => p._id !== deletedId)
        );
    };

    if (loading) return <p className="feed-loading">Loading posts...</p>;
    if (error) return <p className="feed-error">{error}</p>;
    if (!filteredPosts.length) return <p className="feed-empty">No posts yet.</p>;

    return (
        <div className="post-feed">
            {filteredPosts.map((post) => (
                <PostCard
                    key={post._id}
                    post={post}
                    onDelete={handleDelete}
                />
            ))}
        </div>
    );
};

export default PostFeed;