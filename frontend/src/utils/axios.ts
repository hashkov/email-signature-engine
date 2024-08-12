import axios from 'axios';
import { useLoader } from '@/composables/useLoader';
import { API_BASE_URL } from '@/config/api';

const { showLoader, hideLoader } = useLoader();

const instance = axios.create({
  baseURL: API_BASE_URL,
});

instance.interceptors.request.use(
  (config) => {
    showLoader();
    return config;
  },
  (error) => {
    hideLoader();
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    hideLoader();
    return response;
  },
  (error) => {
    hideLoader();
    return Promise.reject(error);
  }
);

export default instance;
