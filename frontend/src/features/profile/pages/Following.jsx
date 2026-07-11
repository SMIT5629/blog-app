import { useParams, Link } from "react-router-dom";
import { useGetFollowing } from "../hooks/useFollow";

const Following = () => {
    const { id } = useParams();
    const { following, loading, error } = useGetFollowing(id);

    if (loading) return <p className="profile-loading">Loading...</p>;
    if (error) return <p className="profile-error">{error}</p>;

    return (
        <div className="follow-list-page">
            <div className="follow-list-header">
                <Link to={`/profile/${id}`} className="follow-list-back">← Back</Link>
                <h2 className="follow-list-title">Following</h2>
            </div>
            {following.length === 0 ? (
                <p className="follow-list-empty">Not following anyone yet.</p>
            ) : (
                <div className="follow-list">
                    {following.map((f) => (
                        <Link to={`/profile/${f.followee._id}`} key={f._id} className="follow-list-item">
                            <div className="follow-avatar">
                                {f.followee.avatar_url ? (
                                    <img src={f.followee.avatar_url} alt={f.followee.username} className="follow-avatar-img" />
                                ) : (
                                    <span>{f.followee.username?.charAt(0).toUpperCase()}</span>
                                )}
                            </div>
                            <p className="follow-username">@{f.followee.username}</p>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Following;