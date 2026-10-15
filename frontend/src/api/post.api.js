import api from './client';

export const postApi = {
  getAllPosts: async () => {
    const response = await api.get('/posts');
    return response.data; // { posts: [...] }
  },

  getPostById: async (id) => {
    const response = await api.get(`/posts/${id}`);
    return response.data; // { post: {...} }
  },

  createPost: async (formData) => {
    const response = await api.post('/posts/create-post', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data; // { message, post }
  },

  updatePost: async (id, formData) => {
    const response = await api.patch(`/posts/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data; // { message, post }
  },

  deletePost: async (id) => {
    const response = await api.delete(`/posts/${id}`);
    return response.data;
  },

  incrementViews: async (id) => {
    const response = await api.patch(`/posts/${id}/views`);
    return response.data; // { views }
  },
};
