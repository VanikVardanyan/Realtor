/* eslint-disable import/prefer-default-export */

import request from '../../constants/api';
import { getAllNotification } from './getAllNotification';

export const deleteNotification = (id) => (dispatch) => {
  request().post(`/notification/remove?id=${id}`, )
    .then(() => dispatch(getAllNotification()))
    .catch((err) => console.log('error', err));
};

