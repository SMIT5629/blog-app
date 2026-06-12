import { useState, useEffect } from "react";
import { getUserProfile, updateProfile } from "../services/profile.api";

const useProfile = (id) => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            try {
                const data = await getUserProfile(id);

                setProfile({
                    ...data.user,
                    posts: data.posts,            
                    postsCount: data.postsCount,
                });
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch profile");
            } finally {
                setLoading(false);
            }
        };
        if (id) fetch();
    }, [id]);

    return { profile, loading, error };
};

export const useUpdateProfile = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleUpdateProfile = async (formData) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const data = await updateProfile(formData);
            setSuccess(true);
            return data;
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    return { handleUpdateProfile, loading, error, success };
};

export default useProfile;