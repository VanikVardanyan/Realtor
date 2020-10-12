/* eslint-disable import/prefer-default-export */
import request from '../../constants/api';
import { personFetchDataSuccess } from './login';


export const getUserFio = () => (dispatch) => {
  request().get('/auth').then((res) => {
    if (res.status === 200) {
      dispatch(personFetchDataSuccess(res.data,true));
    } else {
      dispatch(personFetchDataSuccess(res.data,false));
    }
  });
  
};
