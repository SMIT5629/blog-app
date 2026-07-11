import { Link } from "react-router-dom";
import { useUsers } from "../hooks/useProfile.js";
import { useAuthContext } from "../../auth/auth.context.jsx";
import { useGetFollowing } from "../hooks/useFollow.js";
import FollowButton from "./FollowButton.jsx";

const WhoToFollow = () => {
    const { users, loading, error } = useUsers();
    const { user: loggedInUser } = useAuthContext();
    const { following } = useGetFollowing(loggedInUser?._id || loggedInUser?.id);

    const followingIds = following.map((f) => f.followee?._id);

    const topUsers = users
        .filter((u) => u._id !== loggedInUser?._id && u._id !== loggedInUser?.id)
        .sort((a, b) => (b.followersCount + b.postsCount) - (a.followersCount + a.postsCount))
        .slice(0, 3);

    if (loading) return null;
    if (error) return null;
    if (!topUsers.length) return null;

    return (
        <div className="who-to-follow">
            <div className="who-to-follow-list">
                {topUsers.map((u) => (
                    <div key={u._id} className="who-to-follow-item">

                        <Link to={`/profile/${u._id}`} className="who-to-follow-profile">
                            {u.avatar_image ? (
                                <img
                                    src={u.avatar_image}
                                    alt={u.username}
                                    className="who-to-follow-avatar-img"
                                />
                            ) : (
                                <div className="who-to-follow-avatar">
                                    {u.username?.charAt(0).toUpperCase()}
                                </div>
                            )}
                            <div className="who-to-follow-info">
                                <span className="who-to-follow-name">{u.name}</span>
                                <span className="who-to-follow-username">@{u.username}</span>
                                <span className="who-to-follow-stats">
                                    {u.followersCount} followers · {u.postsCount} posts
                                </span>
                            </div>
                        </Link>

                        {loggedInUser && (
                            <FollowButton
                                userId={u._id}
                                initialIsFollowing={followingIds.includes(u._id)} // ✅ check properly
                                initialCount={u.followersCount}
                            />
                        )}
                    </div>
                ))}
            </div>
            <Link to="/follow-feed" className="who-to-follow-see-all">
                See all
            </Link>
        </div>
    );
};

export default WhoToFollow;