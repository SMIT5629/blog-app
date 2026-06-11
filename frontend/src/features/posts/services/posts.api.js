import axiosInstance from "../../../utils/axiosInstance";

// GET /api/posts
export const getAllPosts = async () => {
    const response = await axiosInstance.get("/api/posts");
    return response.data;
};

// GET /api/posts/:id
export const getPostById = async (id) => {
    const response = await axiosInstance.get(`/api/posts/${id}`);
    return response.data;
};

// POST /api/posts/create-post (with image)
export const createPost = async (formData) => {
    const response = await axiosInstance.post("/api/posts/create-post", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

// PUT /api/posts/:id (with image)
export const updatePost = async (id, formData) => {
    const response = await axiosInstance.put(`/api/posts/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

// DELETE /api/posts/:id
export const deletePost = async (id) => {
    const response = await axiosInstance.delete(`/api/posts/${id}`);
    return response.data;
};