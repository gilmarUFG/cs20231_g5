import axios from 'axios';

const api = axios.create({ baseURL: process.env.REACT_APP_PORT });

api.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile'))}`;
  }
  return req;
});

export const signIn = (formData) => api.post('/auth/login', formData);
export const signInadm = (formData) => api.post('/auth/admin/login', formData);
export const signUp = (formData) => api.post('/user/register', formData);

export const putUserById = async (formData) => {
  const putUserApi = axios.create({ baseURL: process.env.REACT_APP_PORT });
  
  const profile = JSON.parse(localStorage.getItem('profile'));
  const token = profile?.access_token;
  if (localStorage.getItem('profile')) {
    putUserApi.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
  
  const response = await putUserApi.put(`/user`, formData);
  return response.data;
};

export const getProdutos = () => api.get('/products');

export const getReviewsByProductId = async (productId) => {
  const response = await api.get(`/products/${productId}/reviews`);
  return response.data;
};

export const getProductByProductId = async (productId) => {
  const response = await api.get(`/products/${productId}`);
  return response.data;
};


export const doReview = async (formData) => {
  const cadProdApi = axios.create({ baseURL: process.env.REACT_APP_PORT });

  const profile = JSON.parse(localStorage.getItem('profile'));
  const token = profile?.access_token;
  
  if (token) {
    console.log("Token = " + token)
    cadProdApi.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
  
  try {
    const response = await cadProdApi.post('/reviews', formData);
    console.log(response);
    return response;
  } catch (error) {
    console.error('Error saving review:', error);
    throw error;
  }
};





export const cadProd = async (formData) => {
  const cadProdApi = axios.create({ baseURL: process.env.REACT_APP_PORT });
  
  const profile = JSON.parse(localStorage.getItem('profile'));
  const token = profile?.access_token;
  if (localStorage.getItem('profile')) {
    cadProdApi.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
  
  const response = await cadProdApi.post('/products', formData);
  return response.data;
};


export const putProductByProductId = async (productId, formData) => {
  const putProdApi = axios.create({ baseURL: process.env.REACT_APP_PORT });
  
  const profile = JSON.parse(localStorage.getItem('profile'));
  const token = profile?.access_token;
  if (localStorage.getItem('profile')) {
    putProdApi.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
  
  const response = await putProdApi.put(`/products/${productId}`, formData);
  return response.data;
};
