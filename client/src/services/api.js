import axios from 'axios';

const api = axios.create({
  // baseURL: 'https://agro-io.onrender.com/api',
   baseURL: 'https://agroioserver.vercel.app/api',
});

// Add a request interceptor to attach the token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
};

export const userAPI = {
  getUsers: () => api.get('/users'),
  updatePassword: (data) => api.post('/users/profile/password', data),
  deleteUser: (id) => api.delete(`/users/${id}`),
};

export const cropAPI = {
  getCrops: () => api.get('/crops'),
  addCrop: (cropData) => api.post('/crops', cropData),
  updateCrop: (id, cropData) => api.put(`/crops/${id}`, cropData),
  deleteCrop: (id) => api.delete(`/crops/${id}`),
};

export const fertilizerAPI = {
  getFertilizers: () => api.get('/fertilizers'),
  addFertilizer: (fertilizerData) => api.post('/fertilizers', fertilizerData),
  deleteFertilizer: (id) => api.delete(`/fertilizers/${id}`),
};

export const recommendationAPI = {
  predict: (data) => api.post('/recommendations/predict', data),
  getHistory: () => api.get('/recommendations/history'),
};

export const ruleAPI = {
  getRules: () => api.get('/rules'),
  addRule: (ruleData) => api.post('/rules', ruleData),
  deleteRule: (id) => api.delete(`/rules/${id}`),
};

export default api;
