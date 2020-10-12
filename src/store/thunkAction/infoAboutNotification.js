/* eslint-disable import/prefer-default-export */
import request from '../../constants/api';
import { NOTIFICATION_HAVE } from '../actionType';

export const infoAboutNotificationData = (notificationHave) => ({
  type: NOTIFICATION_HAVE,
  notificationHave
})

export const infoAboutNotification = () => (dispatch) => {
  request().get('/notification/hasNew')
    .then((res) => dispatch(infoAboutNotificationData(res)))
    .catch((err) => console.log('error', err));
};
