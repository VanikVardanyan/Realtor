/* eslint-disable import/prefer-default-export */
import request from '../../constants/api';
import { DELETE_APARTAMENT } from '../actionType';

export const getDeleteApartaments = (id) => ({
  type: DELETE_APARTAMENT,
  id,
});

export const postDelete = (id, param) => (dispatch) => {
  request().post(`/query/status?id=${id}&status=${param}`)
    .then(() => dispatch(getDeleteApartaments(id)))
    .catch((err) => alert('Нельзя перевести запрос в статус Не актуально'));
};
