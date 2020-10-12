import request from '../../constants/api';
import { POST_NOTIFICATION } from '../actionType';

export const getPostNotification = (notification) => ({
  type: POST_NOTIFICATION,
  notification,
});

export const getListNotification = (id) => (dispatch) => {
  request().get(`/query/viewHist?id=${id}`)
    .then((res) => {
      if (res.status === 204) {
        dispatch(getPostNotification());
      } if (res.status === 200) {
        dispatch(getPostNotification(res));
      }
      console.log(res)
    })
    .catch((err) => console.log('error', err));
};
