/* eslint-disable import/prefer-default-export */
import request from '../../../constants/api';

export const addApartaments = (params) => () => {
  const headers = {
    'Content-type': 'multipart/form-data',
  };
  request(headers).post('/flat', params)
    .then((res) => console.log(res))
    .catch((err) => console.log('error', err));
};
