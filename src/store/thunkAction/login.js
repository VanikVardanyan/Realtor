import { Base64 } from 'js-base64';

import { GET_USER, IS_LOADING, ERROR_MESSAGE_LOGIN, GET_USER_ROLE } from '../actionType';
import request from '../../constants/api';

export const personFetchDataSuccess = (person, status) => ({
  type: GET_USER,
  person,
  status,
}); 

export const isLoadingCheck = (isLoading) => ({
  type: IS_LOADING,
  isLoading,
});

export const errorMesageLogin = (message) => ({
  type: ERROR_MESSAGE_LOGIN,
  message,
});

export const personFetchData = (login, password) => (dispatch) => {
  const authData = Base64.encode(`${login}:${password}`);
  const Authorization = `Basic ${authData}`;
  request().get('/auth/dauth', {
    headers: { Authorization },
  })
    .then((res) => {
      if(res.status === 200) {
        dispatch(personFetchDataSuccess(res.data));
        localStorage.setItem('token', Authorization);
        dispatch(isLoadingCheck(true))
      }
    })
    .catch(() => dispatch(errorMesageLogin('не правильный логин или пароль*')));
};


// login

export const personFetchDataSuccess2 = (role) => ({
  type: GET_USER_ROLE,
  role,
}); 


export const personFetchData2 = (login, password) => (dispatch) => {
  const authData = Base64.encode(`${login}:${password}`);
  const Authorization = `Basic ${authData}`;
  request().get('/auth', {
    headers: { Authorization },
  })
    .then((res) => {
      if(res.status === 200) {
        dispatch(personFetchDataSuccess2(res.data.role));
        localStorage.setItem('token', Authorization);
        dispatch(isLoadingCheck(true))
      }
    })
    .catch(() => dispatch(errorMesageLogin('не правильный логин или пароль*')));
};
