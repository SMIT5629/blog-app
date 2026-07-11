import { Link } from "react-router-dom";
import { useAuthContext } from "../../auth/auth.context.jsx";
import { useUsers } from "../hooks/useProfile.js";

const FollowFeed = () => {
    const { user: loggedInUser } = useAuthContext();
    const { users, loading, error } = useUsers(); // ✅ users not following

    if (loading) return <p className="feed-loading">Loading...</p>;
    if (error) return <p className="feed-error">{error}</p>;
    if (!users.length) return <p className="feed-empty">No users found.</p>;

    return (
        <div className="follow-feed">
            {users
                // exclude logged in user from list
                .filter((u) => u._id !== loggedInUser?._id && u._id !== loggedInUser?.id)
                .map((u) => (
                    <Link
                        to={`/profile/${u._id}`}
                        key={u._id}
                        className="follow-feed-item"
                    >
                        {u.avatar_image ? (
                            <img
                                src={u.avatar_image}
                                alt={u.username}
                                className="follow-feed-avatar-img"
                            />
                        ) : (
                            <div className="follow-feed-avatar">
                                {u.username?.charAt(0).toUpperCase()}
                            </div>
                        )}
                        <div className="follow-feed-info">
                            <span className="follow-feed-name">{u.name}</span>
                            <span className="follow-feed-username">@{u.username}</span>
                            <span className="follow-feed-stats">
                                {u.followersCount} followers · {u.postsCount} posts
                            </span>
                        </div>
                    </Link>
                ))}
        </div>
    );
};

export default FollowFeed;