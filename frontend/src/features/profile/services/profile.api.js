import axiosInstance from "../../../utils/axiosInstance";

export const getUserProfile = async (id) => {
    const response = await axiosInstance.get(`/api/users/${id}`);
    return response.data;
};

export const updateProfile = async (formData) => {
    const response = await axiosInstance.patch("/api/users/me", formData);
    return response.data;
};