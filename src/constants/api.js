import axios from 'axios';

export default (headers = {}) => {
  const token = localStorage.getItem('token') || '';
  return axios.create({
    baseURL: 'http://agentdubna.ru/api',
    headers: {
      Authorization: token,
      ...headers,
      
    },
  });
};
