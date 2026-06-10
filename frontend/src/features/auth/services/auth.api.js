import axiosInstance from "../../../utils/axiosInstance";

export const signUp = async (name, username, email, password) => {
    const response = await axiosInstance.post("/api/auth/sign-up", { name, username, email, password });
    return response.data;
};

export const signIn = async (identifier, password) => {
    const response = await axiosInstance.post("/api/auth/sign-in", { identifier, password });
    return response.data;
};

export const signOut = async () => {
    const response = await axiosInstance.post("/api/auth/sign-out");
    return response.data;
};

export const getMe = async () => {
    const response = await axiosInstance.get("/api/auth/me");
    return response.data;
};