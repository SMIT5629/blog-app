import { Link } from "react-router-dom";
import { useAuthContext } from "../../auth/auth.context.jsx";
import { useDeletePost } from "../hooks/usePosts.js";
import { FaTrash } from "react-icons/fa"
import LikeButton from "./LikeButton.jsx";


const PostCard = ({ post, onDelete }) => {
    const { user } = useAuthContext();
    const { handleDeletePost, loading } = useDeletePost();

    const isOwner = user && user._id === post.author?._id;

    const handleDelete = async (e) => {
        e.preventDefault();
        await handleDeletePost(post._id);
        if (onDelete) onDelete(post._id);
    };

    return (
        <div className="post-card">
            <Link to={`/posts/${post._id}`}>
                {post.cover_image ? (
                    <img
                        className="post-card-img"
                        src={post.cover_image}
                        alt={post.title}
                    />
                ) : (
                    <div className="post-card-img-placeholder">
                        <i className="ti ti-photo" aria-hidden="true"></i>
                    </div>
                )}
            </Link>

            <div className="post-card-body">
                <Link to={`/profile/${post.author?._id}`} className="post-card-username">

                    <img
                        className="post-card-avatar"
                        src={post.author.avatar_image}
                    />

                    @{post.author?.username}
                </Link>
                <span className="post-card-type">{post.type}</span>
                <Link to={`/posts/${post._id}`} className="post-card-title">
                    {post.title}
                </Link>

                {/* footer */}
                <div className="post-card-footer">
                    <span className="post-card-views">
                        <i className="ti ti-eye" aria-hidden="true"></i>
                        {post.views} views
                    </span>

                    <LikeButton postId={post._id} />

                    {isOwner && (
                        <button
                            className="post-card-delete-btn"
                            onClick={handleDelete}
                            disabled={loading}
                        >
                            {loading ? "Deleting..." : <FaTrash />}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PostCard;