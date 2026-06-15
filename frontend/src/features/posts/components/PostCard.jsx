import { Link } from "react-router-dom";
import { useAuthContext } from "../../auth/auth.context.jsx";
import { useDeletePost } from "../hooks/usePosts.js";
import { FaTrash } from "react-icons/fa";
import LikeButton from "./LikeButton.jsx";

const PostCard = ({ post, onDelete }) => {
    const { user } = useAuthContext();
    const { handleDeletePost, loading } = useDeletePost();

    const isOwner = user && (user._id === post.author?._id || user.id === post.author?._id);

    const handleDelete = async (e) => {
        e.preventDefault();
        await handleDeletePost(post._id);
        if (onDelete) onDelete(post._id);
    };

    return (
        <div className="post-card">

            {/* ── Row 1: Author + Date ── */}
            <div className="post-card-meta">
                <Link to={`/profile/${post.author?._id}`} className="post-card-author-wrap">
                    {post.author?.avatar_image ? (
                        <img
                            src={post.author.avatar_image}
                            className="post-card-avatar-img"
                            alt={post.author.name}
                        />
                    ) : (
                        <div className="post-card-avatar-placeholder">
                            {post.author?.name?.charAt(0).toUpperCase()}
                        </div>
                    )}
                    <span className="post-card-author">{post.author?.username}</span>
                </Link>
                {post.type && <span className="post-card-type">{post.type}</span>}
                <span className="post-card-date">
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                        month: "short", day: "numeric", year: "numeric"
                    })}
                </span>
            </div>

            {/* ── Row 2: Content + Thumbnail ── */}
            <div className="post-card-main">
                <div className="post-card-content">
                    <Link to={`/posts/${post._id}`} className="post-card-title">
                        {post.title}
                    </Link>
                    {post.excerpt && (
                        <p className="post-card-excerpt">{post.excerpt}</p>
                    )}
                </div>

                <Link to={`/posts/${post._id}`} className="post-card-thumb-wrap">
                    {post.cover_image ? (
                        <img
                            className="post-card-thumb"
                            src={post.cover_image}
                            alt={post.title}
                        />
                    ) : (
                        <div className="post-card-thumb-placeholder">
                            <i className="ti ti-photo" aria-hidden="true"></i>
                        </div>
                    )}
                </Link>
            </div>

            {/* ── Row 3: Footer ── */}
            <div className="post-card-footer">
                <span className="post-card-views">
                    <i className="ti ti-eye" aria-hidden="true"></i>
                    {post.views}
                </span>

                <LikeButton postId={post._id} />

                <div className="post-card-footer-right">
                    <button className="post-card-icon-btn" aria-label="Bookmark">
                        <i className="ti ti-bookmark" aria-hidden="true"></i>
                    </button>

                    {isOwner && (
                        <button
                            className="post-card-delete-btn"
                            onClick={handleDelete}
                            disabled={loading}
                            aria-label="Delete post"
                        >
                            {loading ? "..." : <FaTrash />}
                        </button>
                    )}
                </div>
            </div>

        </div>
    );
};

export default PostCard;