import request from '../../constants/api';
import { CLIENT_NUMBER, PHONE_LOADING } from '../actionType';

export const getClientNumberData = (number) => ({
  type: CLIENT_NUMBER,
  number,
});

export const numberLoaderStart = (isloading) => ({
  type: PHONE_LOADING,
  isloading,
});

export const getClientNumber = (params) => (dispatch) => {
  return request().get(`/query/phone?id=${params}`)
    .then((res) => {
      setTimeout(() => {
        dispatch(getClientNumberData(res.data));
        dispatch(numberLoaderStart(true));
      }, 1000);
    })
    .catch((err) => console.log('error', err));
};
