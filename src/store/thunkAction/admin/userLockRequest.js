/* eslint-disable import/prefer-default-export */
import request from '../../../constants/api';

export const userLockRequest = (id) => (dispatch) => {
  request().post('/auth/admin/agent/block', { userId: id })
    .then((res) => console.log(res))
    .catch((err) => console.log('error', err));
};
