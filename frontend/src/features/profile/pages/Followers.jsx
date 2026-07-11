import { useParams, Link } from "react-router-dom";
import { useGetFollowers } from "../hooks/useFollow";

const Followers = () => {
    const { id } = useParams();
    const { followers, loading, error } = useGetFollowers(id);

    if (loading) return <p className="profile-loading">Loading...</p>;
    if (error) return <p className="profile-error">{error}</p>;

    return (
        <div className="follow-list-page">
            <div className="follow-list-header">
                <Link to={`/profile/${id}`} className="follow-list-back">← Back</Link>
                <h2 className="follow-list-title">Followers</h2>
            </div>
            {followers.length === 0 ? (
                <p className="follow-list-empty">No followers yet.</p>
            ) : (
                <div className="follow-list">
                    {followers.map((f) => (
                        <Link to={`/profile/${f.follower._id}`} key={f._id} className="follow-list-item">
                            <div className="follow-avatar">
                                {f.follower.avatar_image ? (
                                    <img src={f.follower.avatar_image} alt={f.follower.username} className="follow-avatar-img" />
                                ) : (
                                    <span>{f.follower.username?.charAt(0).toUpperCase()}</span>
                                )}
                            </div>
                            <p className="follow-username">@{f.follower.username}</p>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Followers;