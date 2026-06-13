import axiosInstance from "../../../utils/axiosInstance";

// POST /api/reactions/:id — like a post
export const likePost = async (postId) => {
    const response = await axiosInstance.post(`/api/reactions/${postId}`);
    return response.data;
};

// DELETE /api/reactions/:id — unlike a post
export const unlikePost = async (postId) => {
    const response = await axiosInstance.delete(`/api/reactions/${postId}`);
    return response.data;
};

// GET /api/reactions/:id — get likes count
export const getLikes = async (postId) => {
    const response = await axiosInstance.get(`/api/reactions/${postId}`);
    return response.data;
};

// POST /api/reactions/:id/comment — add comment
export const addComment = async (postId, body) => {
    const response = await axiosInstance.post(`/api/reactions/${postId}/comment`, { comment: body });
    return response.data;
};

// GET /api/reactions/:id/comments — get all comments
export const getComments = async (postId) => {
    const response = await axiosInstance.get(`/api/reactions/${postId}/comments`);
    return response.data;
};

// DELETE /api/reactions/comment/:commentId — delete comment
export const deleteComment = async (commentId) => {
    const response = await axiosInstance.delete(`/api/reactions/comment/${commentId}`);
    return response.data;
};

// PUT /api/reactions/comment/:commentId — edit comment
export const editComment = async (commentId, body) => {
    const response = await axiosInstance.patch(`/api/reactions/comment/${commentId}`, { body });
    return response.data;
};