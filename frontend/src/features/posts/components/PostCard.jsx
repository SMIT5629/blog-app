import { Link } from "react-router-dom";
import { useAuthContext } from "../../auth/auth.context.jsx";
import { useDeletePost } from "../hooks/usePosts.js";
import { FaTrash } from "react-icons/fa"   


const PostCard = ({ post, onDelete }) => {
    const { user } = useAuthContext();
    const { handleDeletePost, loading } = useDeletePost();

    const isOwner = user && user._id === post.author?._id;

    const handleDelete = async (e) => {
        e.preventDefault(); // prevent link navigation on delete
        await handleDeletePost(post._id);
        if (onDelete) onDelete(post._id);
    };

    return (
        <div className="post-card">
            {/* cover image — click goes to post detail */}
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
                {/* author */}
                <span className="post-card-username">@{post.author?.username}</span>

                {/* title — click goes to post detail */}
                <Link to={`/posts/${post._id}`} className="post-card-title">
                    {post.title}
                </Link>

                {/* footer */}
                <div className="post-card-footer">
                    <span className="post-card-views">
                        <i className="ti ti-eye" aria-hidden="true"></i>
                        {post.views} views
                    </span>

                    {isOwner && (
                        <button
                            className="post-card-delete-btn"
                            onClick={handleDelete}
                            disabled={loading}
                        >
                            {loading ? "Deleting..." :  <FaTrash />}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PostCard;