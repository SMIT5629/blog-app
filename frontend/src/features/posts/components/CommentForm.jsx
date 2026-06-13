import { useState } from "react";
import { useAuthContext } from "../../auth/auth.context.jsx";

const CommentForm = ({ onSubmit, submitting }) => {
    const { user } = useAuthContext();
    const [body, setBody] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!body.trim()) return;
        await onSubmit(body);
        setBody(""); // clear after submit
    };

    if (!user) return (
        <p className="comment-login-msg">
            Sign in to leave a comment.
        </p>
    );

    return (
        <form className="comment-form" onSubmit={handleSubmit}>
            <textarea
                className="comment-form-input"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Write a comment..."
                rows={3}
                required
            />
            <button
                className="comment-form-btn"
                type="submit"
                disabled={submitting || !body.trim()}
            >
                {submitting ? "Posting..." : "Post comment"}
            </button>
        </form>
    );
};

export default CommentForm;