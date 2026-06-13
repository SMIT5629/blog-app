import { useState } from "react";
import { useAuthContext } from "../../auth/auth.context.jsx";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const CommentItem = ({ comment, onDelete, onEdit }) => {
    const { user } = useAuthContext();
    const [isEditing, setIsEditing] = useState(false);
    const [editBody, setEditBody] = useState(comment.body);

    const isOwner = user && (user._id === comment.user?._id || user.id === comment.user?._id);

    const handleEdit = async () => {
        if (!editBody.trim()) return;
        await onEdit(comment._id, editBody);
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setEditBody(comment.body);
        setIsEditing(false);
    };

    return (
        <div className="comment-item">
            <Link to={`/profile/${comment.user?._id}`} className="comment-avatar">
                {comment.user?.avatar_image ? (
                    <img
                        className="comment-avatar-img"
                        src={comment.user.avatar_image}
                        alt={comment.user.username}
                    />
                ) : (
                    <div className="comment-avatar">
                        {comment.user?.username?.charAt(0).toUpperCase()}
                    </div>
                )}
            </Link>

            <div className="comment-content">
                <div className="comment-header">
                    <Link to={`/profile/${comment.user?._id}`} className="comment-username">
                        @{comment.user?.username}
                    </Link>
                    <span className="comment-date">
                        {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                </div>

                {/* edit mode */}
                {isEditing ? (
                    <div className="comment-edit-wrap">
                        <textarea
                            className="comment-edit-input"
                            value={editBody}
                            onChange={(e) => setEditBody(e.target.value)}
                            rows={2}
                        />
                        <div className="comment-edit-btns">
                            <button className="comment-edit-save" onClick={handleEdit}>
                                <FaCheck size={12} /> Save
                            </button>
                            <button className="comment-edit-cancel" onClick={handleCancelEdit}>
                                <FaTimes size={12} /> Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <p className="comment-body">{comment.comment}</p>
                )}

                {/* owner actions */}
                {isOwner && !isEditing && (
                    <div className="comment-actions">
                        <button className="comment-edit-btn" onClick={() => setIsEditing(true)}>
                            <FaEdit size={12} /> Edit
                        </button>
                        <button className="comment-delete-btn" onClick={() => onDelete(comment._id)}>
                            <FaTrash size={12} /> Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CommentItem;