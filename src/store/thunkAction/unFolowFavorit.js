/* eslint-disable import/prefer-default-export */
import request from '../../constants/api';


export const unFolowFavorit = (id) => (dispatch) => {
  request().post(`/query/fromFavorites?id=${id}`)
  .then((res)=> res )
  .catch((err) => console.log('error', err));
};
 