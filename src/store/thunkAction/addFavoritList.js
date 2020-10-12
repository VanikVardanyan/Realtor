/* eslint-disable import/prefer-default-export */
import request from '../../constants/api';

export const addFavoritList = (id) => (dispatch) => {
  request().post(`/query/toFavorites?id=${id}`)
    .then((res) => res)
    .catch((err) => console.log('error', err));
};

