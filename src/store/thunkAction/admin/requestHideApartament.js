/* eslint-disable import/prefer-default-export */
import request from '../../../constants/api';

export const requestHideApartament = (id) => (dispatch) => {
  request().pots('/flat/hidden', { HiddenFlatDto: { flatid: id, reasonType: 0, reasonDesc: 'text' } })
    .then((res) => console.log(res))
    .catch((err) => console.log('error', err));
};
