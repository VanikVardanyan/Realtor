/* eslint-disable import/prefer-default-export */
import request from '../../../constants/api';
import { POST_HISTORY } from '../../actionType';

export const getHistoryForPost = (data) => ({
  type: POST_HISTORY,
  data,
});

export const getQueryHistory = (id) => (dispatch) => {
  console.log(id)
  request().get(`/admin/queryHistory?id=${id}`)
    .then((res) => {
      if (res.status === 204) {
        dispatch(getHistoryForPost([]));
      } if (res.status === 200) {
        dispatch(getHistoryForPost(res));
      }
    })
    .catch((err) => console.log('error', err));
};
