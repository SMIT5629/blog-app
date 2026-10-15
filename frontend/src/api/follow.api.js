import api from './client';

export const followApi = {
  followUser: async (userId) => {
    const response = await api.post(`/follows/${userId}`);
    return response.data;
  },

  unfollowUser: async (userId) => {
    const response = await api.delete(`/follows/${userId}`);
    return response.data;
  },

  getFollowers: async (userId) => {
    const response = await api.get(`/follows/${userId}/followers`);
    return response.data; // { followers: [...], followersCount }
  },

  getFollowing: async (userId) => {
    const response = await api.get(`/follows/${userId}/following`);
    return response.data; // { following: [...], followingCount }
  },
};
