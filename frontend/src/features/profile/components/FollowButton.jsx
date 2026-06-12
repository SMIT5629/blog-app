import { useEffect } from "react";
import { useFollow } from "../hooks/useFollow";

const FollowButton = ({ userId, initialIsFollowing, initialCount }) => {
    const { isFollowing, setIsFollowing, setFollowerCount, handleFollow, handleUnfollow, loading } = useFollow(userId);

    useEffect(() => {
        setIsFollowing(initialIsFollowing || false);
        setFollowerCount(initialCount || 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialIsFollowing, initialCount]);

    return (
        <button
            className={isFollowing ? "btn-unfollow" : "btn-follow"}
            onClick={isFollowing ? handleUnfollow : handleFollow}
            disabled={loading}
        >
            {loading ? "..." : isFollowing ? "Unfollow" : "Follow"}
        </button>
    );
};

export default FollowButton;