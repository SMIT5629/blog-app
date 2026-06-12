import { useState, useEffect } from "react";
import { followUser, unfollowUser, getFollowers, getFollowing } from "../services/follows.api";

export const useFollow = (userId) => {
    const [loading, setLoading] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const [followerCount, setFollowerCount] = useState(0);

    const handleFollow = async () => {
        setLoading(true);
        try {
            await followUser(userId);
            setIsFollowing(true);
            setFollowerCount((prev) => prev + 1);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleUnfollow = async () => {
        setLoading(true);
        try {
            await unfollowUser(userId);
            setIsFollowing(false);
            setFollowerCount((prev) => prev - 1);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return { isFollowing, setIsFollowing, followerCount, setFollowerCount, handleFollow, handleUnfollow, loading };
};

export const useGetFollowers = (userId) => {
    const [followers, setFollowers] = useState([]);
    const [followersCount, setFollowersCount] = useState(0); // ✅ added
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            try {
                const data = await getFollowers(userId);
                setFollowers(data.followers);
                setFollowersCount(data.followersCount); // ✅ added
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch followers");
            } finally {
                setLoading(false);
            }
        };
        if (userId) fetch();
    }, [userId]);

    return { followers, followersCount, loading, error }; // ✅ added
};

export const useGetFollowing = (userId) => {
    const [following, setFollowing] = useState([]);
    const [followingCount, setFollowingCount] = useState(0); // ✅ added
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            try {
                const data = await getFollowing(userId);
                setFollowing(data.following);
                setFollowingCount(data.followingCount); // ✅ added
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch following");
            } finally {
                setLoading(false);
            }
        };
        if (userId) fetch();
    }, [userId]);

    return { following, followingCount, loading, error }; // ✅ added
};