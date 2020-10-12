import request from '../../constants/api';
import { GET_ALL_NOTIFICATION } from '../actionType';
import { isLoadingCheck } from './login';

export const getAllNotificationData = (allNotification) => ({
  type: GET_ALL_NOTIFICATION,
  allNotification,
});

export const getAllNotification = () => (dispatch) => {
  dispatch(isLoadingCheck(true));
  request().get('/notification')
    .then((res) => {
      if (res.status === 204) {
        dispatch(getAllNotificationData([]));
        dispatch(isLoadingCheck(false));
      }
      dispatch(getAllNotificationData(res.data));
      dispatch(isLoadingCheck(false));
    })
    .catch((err) => console.log('error', err));
};
