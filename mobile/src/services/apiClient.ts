import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://192.168.88.17:3000',
});
