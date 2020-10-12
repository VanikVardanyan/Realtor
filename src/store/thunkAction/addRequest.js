/* eslint-disable import/prefer-default-export */
import request from '../../constants/api';

export const addRequest = (params) => (dispatch) => {
    
  request().post('/query/save', params)
    .then((res) => console.log(res) )
    .catch((err) => console.log('error', err));
};
