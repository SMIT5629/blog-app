import api from './client';

export const reactionApi = {
  likePost: async (postId) => {
    const response = await api.post(`/reactions/${postId}`);
    return response.data;
  },

  unlikePost: async (postId) => {
    const response = await api.delete(`/reactions/${postId}`);
    return response.data;
  },

  getLikes: async (postId) => {
    const response = await api.get(`/reactions/${postId}`);
    return response.data; // { likesCount, likes: [...] }
  },

  getComments: async (postId) => {
    const response = await api.get(`/reactions/${postId}/comments`);
    return response.data; // { comments: [...] }
  },

  makeComment: async (postId, comment) => {
    const response = await api.post(`/reactions/${postId}/comment`, { comment });
    return response.data; // { message, comment }
  },

  editComment: async (commentId, comment) => {
    const response = await api.patch(`/reactions/comment/${commentId}`, { comment });
    return response.data;
  },

  deleteComment: async (commentId) => {
    const response = await api.delete(`/reactions/comment/${commentId}`);
    return response.data;
  },
};
