import axiosInstance from "../../../utils/axiosInstance";

export const followUser = async (id) => {
    const response = await axiosInstance.post(`/api/follows/${id}`);
    return response.data;
};

export const unfollowUser = async (id) => {
    const response = await axiosInstance.delete(`/api/follows/${id}`);
    return response.data;
};

export const getFollowers = async (id) => {
    const response = await axiosInstance.get(`/api/follows/${id}/followers`);
    return response.data;
};

export const getFollowing = async (id) => {
    const response = await axiosInstance.get(`/api/follows/${id}/following`);
    return response.data;
};