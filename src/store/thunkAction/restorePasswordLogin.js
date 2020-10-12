/* eslint-disable import/prefer-default-export */
import request from '../../constants/api';

export const restorePasswordLogin = (login) => () => {
  request().post('/recover')
    .then((res) => console.log(res))
    .catch((err) => console.log('error', err));
};
