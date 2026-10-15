import api from './client';

export const userApi = {
  getUserProfile: async (id) => {
    const url = id ? `/users/${id}` : '/users/me';
    const response = await api.get(url);
    return response.data; // { user, followersCount, followingCount, posts, postsCount }
  },

  updateProfile: async (formData) => {
    const response = await api.patch('/users/me', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data; // { message, user }
  },

  getAllUsers: async () => {
    const response = await api.get('/users');
    return response.data; // { users: [...] }
  },
};
