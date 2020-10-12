/* eslint-disable import/prefer-default-export */
import request from '../../constants/api';

export const addNewAgent = (params) => () => {
  request().post('admin/newUser', params)
    .then((res) => {
      if(res.status === 400) {
        alert('этот пользователь уже существует')
      }
    })
    .catch((err) => console.log('error', err));
};
