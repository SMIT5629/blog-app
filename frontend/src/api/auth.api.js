import api from './client';

export const authApi = {
  signIn: async (identifier, password) => {
    const response = await api.post('/auth/sign-in', { identifier, password });
    return response.data;
  },

  signUp: async (name, username, email, password) => {
    const response = await api.post('/auth/sign-up', { name, username, email, password });
    return response.data;
  },

  signOut: async () => {
    const response = await api.post('/auth/sign-out');
    return response.data;
  },

  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data; // { user }
  },
};
