/* eslint-disable import/prefer-default-export */
import request from '../../constants/api';
import { FILTER_FOR_NUMMBER } from '../actionType';
import { isLoadingCheck } from './login';

export const filetrPostByNumber = (params) => ({
  type: FILTER_FOR_NUMMBER,
  params,
});

export const getPostsByNumber = (params) => (dispatch) => {
  dispatch(isLoadingCheck(true))
  request().post('/query/list?page=0&sortField=creationDate&sortDirection=DESC', { phoneNumber: params })
    .then((res) => {
      if (res.status === 200) {
        dispatch(filetrPostByNumber(res.data));
        dispatch(isLoadingCheck(false))

      }
      if (res.status === 204) {
        dispatch(filetrPostByNumber([]));
        dispatch(isLoadingCheck(false))

      }
    })
    .catch((err) => console.log('error', err));
};
