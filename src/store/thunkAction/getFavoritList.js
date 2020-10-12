/* eslint-disable import/prefer-default-export */
import request from '../../constants/api';
import { ACTIVE_FAVORIT, FAVORITS, ACTIVE_FAVORIT_POST } from '../actionType';
import { isLoadingCheck, personFetchDataSuccess } from './login';
import { parseQuery } from '../../util';

export const getFavoritsRequest = (data) => ({
  type: FAVORITS,
  data,
});

export const getFavoritList = () => (dispatch) => {
  dispatch(isLoadingCheck(true));
  request().get('/auth')
    .then((res) => request().post('/query/list?page=0&sortField=creationDate&sortDirection=DESC',
      { id: res.data.favorites })
      .then((res) => {
        setTimeout(() => {
          dispatch(getFavoritsRequest(res.data || [], true));
          dispatch(isLoadingCheck(false));
        }, 1000);
      }))
    .catch(() => dispatch(getFavoritsRequest([])));
};

export const getFavoritList2 = (params) => (dispatch) => {
  request().get('/auth')
    .then((res) => request().post(`/query/list${parseQuery(params)}`,
      { id: res.data.favorites })
      .then((res) => {
        setTimeout(() => {
          dispatch(getFavoritsRequest(res.data || [], true));
        }, 1000);
      }))
    .catch(() => dispatch(getFavoritsRequest([])));
};

export const checkActiveFavorit = (id) => ({
  type: ACTIVE_FAVORIT,
  id,
});

export const checkActiveFavoritPage = (id) => ({
  type: ACTIVE_FAVORIT_POST,
  id,
});

export const getFavoritListId = () => (dispatch) => {
  request().get('./auth').then((res) => {
    dispatch(checkActiveFavorit(res.data.favorites || []));
    dispatch(personFetchDataSuccess(res.data));
    dispatch(checkActiveFavoritPage(res.data.favorites || []));
  });
};
