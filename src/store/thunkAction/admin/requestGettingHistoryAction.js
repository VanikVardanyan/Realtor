/* eslint-disable import/prefer-default-export */
import request from '../../../constants/api';

export const requestGettingHistoryAction = (id) => (dispatch) => {
  request().get(`/admin/agent/${id}`)
    .then((res) => console.log(res))
    .catch((err) => console.log('error', err));
};
