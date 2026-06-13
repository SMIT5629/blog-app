import { useComments } from "../hooks/useReactions.js";
import CommentForm from "./CommentForm.jsx";
import CommentItem from "./CommentItem.jsx";

const CommentSection = ({ postId }) => {
    const {
        comments,
        loading,
        error,
        submitting,
        handleAddComment,
        handleDeleteComment,
        handleEditComment,
    } = useComments(postId);

    return (
        <div className="comment-section">
            <h3 className="comment-section-title">
                Comments {comments.length > 0 && `(${comments.length})`}
            </h3>

            {/* add comment form */}
            <CommentForm onSubmit={handleAddComment} submitting={submitting} />

            <div className="comment-divider" />

            {/* comments list */}
            {loading ? (
                <p className="comment-loading">Loading comments...</p>
            ) : error ? (
                <p className="comment-error">{error}</p>
            ) : comments.length === 0 ? (
                <p className="comment-empty">No comments yet. Be the first!</p>
            ) : (
                <div className="comment-list">
                    {comments.map((comment) => (
                        <CommentItem
                            key={comment._id}
                            comment={comment}
                            onDelete={handleDeleteComment}
                            onEdit={handleEditComment}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CommentSection;