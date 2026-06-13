import { useAuthContext } from "../../auth/auth.context.jsx";
import { useLike } from "../hooks/useReactions.js";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const LikeButton = ({ postId }) => {
    const { user } = useAuthContext();
    const { liked, likesCount, handleLike, handleUnlike, loading } = useLike(postId);

    const handleClick = (e) => {
        e.preventDefault();
        if (!user) return;  // not logged in — do nothing
        if (liked) {
            handleUnlike();
        } else {
            handleLike();
        }
    };

    return (
        <button
            className={`like-btn ${liked ? "like-btn-active" : ""}`}
            onClick={handleClick}
            disabled={loading || !user}
            title={!user ? "Sign in to like" : ""}
        >
            {liked ? <FaHeart /> : <FaRegHeart />}
            <span>{likesCount}</span>
        </button>
    );
};

export default LikeButton;