import { useParams, Link, Navigate } from "react-router-dom";
import { useAuthContext } from "../../auth/auth.context.jsx";
import useProfile from "../hooks/useProfile.js";
import { useGetFollowers, useGetFollowing } from "../hooks/useFollow.js";
import FollowButton from "../components/FollowButton.jsx";
import PostCard from "../../posts/components/PostCard.jsx";
import "../styles/profile.css";

const Profile = () => {

    const { id } = useParams();
    const { user: loggedInUser, loading: authLoading } = useAuthContext();
    const loggedInUserId = loggedInUser?._id || loggedInUser?.id;
    const profileId = id === "me" ? loggedInUserId : id;
    const { profile, loading, error } = useProfile(profileId);
    const { followers, followersCount } = useGetFollowers(profileId);
    const { followingCount } = useGetFollowing(profileId);

    const isOwnProfile = loggedInUser && (id === "me" || loggedInUserId === profileId);
    const avatarLetter = profile?.username?.charAt(0).toUpperCase();

    if (id === "me" && authLoading) return <p className="profile-loading">Loading...</p>;
    if (id === "me" && !loggedInUser) return <Navigate to="/login" />;
    if (loading) return <p className="profile-loading">Loading...</p>;
    if (error) return <p className="profile-error">{error}</p>;
    if (!profile) return null;

    return (
        <div className="profile-page">
            <div className="profile-header">
                <div className="profile-top">
                    <div className="profile-left">
                        {profile.avatar_image ? (
                            <img src={profile.avatar_image} className="profile-avatar-img" alt={profile.username} />
                        ) : (
                            <div className="profile-avatar">{avatarLetter}</div>
                        )}
                        <div>
                            <h1 className="profile-name">{profile.name}</h1>
                            <p className="profile-username">@{profile.username}</p>
                            {profile.bio && <p className="profile-bio">{profile.bio}</p>}
                        </div>
                    </div>

                    <div className="profile-actions">
                        {isOwnProfile ? (
                            <Link to="/profile/me/edit" className="btn-edit-profile">Edit profile</Link>
                        ) : (
                            loggedInUser && (
                                <FollowButton
                                    userId={profileId}
                                    initialIsFollowing={followers.some(f => f.follower._id === loggedInUserId)}
                                    initialCount={followersCount}
                                />
                            )
                        )}
                    </div>
                </div>

                <div className="profile-stats">
                    <div className="profile-stat">
                        <span className="profile-stat-num">{profile.postsCount}</span>
                        <span className="profile-stat-label">Posts</span>
                    </div>
                    <Link to={`/profile/${profileId}/followers`} className="profile-stat">
                        <span className="profile-stat-num">{followersCount}</span>
                        <span className="profile-stat-label">Followers</span>
                    </Link>
                    <Link to={`/profile/${profileId}/following`} className="profile-stat">
                        <span className="profile-stat-num">{followingCount}</span>
                        <span className="profile-stat-label">Following</span>
                    </Link>
                </div>
            </div>

            <p className="profile-posts-label">Posts by @{profile.username}</p>
            {profile.posts?.length ? (
                <div className="profile-posts-grid">
                    {profile.posts.map((post) => (
                        <PostCard key={post._id} post={post} />
                    ))}
                </div>
            ) : (
                <p className="profile-no-posts">No posts yet.</p>
            )}
        </div>
    );
};

export default Profile;
