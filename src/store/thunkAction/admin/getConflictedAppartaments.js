/* eslint-disable import/prefer-default-export */
import request from '../../../constants/api';

export const addFavoritList = () => (dispatch) => {
  request().get('/conflicted')
    .then((res) => console.log(res))
    .catch((err) => console.log('error', err));
};
