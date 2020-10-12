/* eslint-disable import/prefer-default-export */
import request from '../../../constants/api';
import { getBasaAgentInThunkAction } from '../../action/AdminAction';


export const getBaseAgentBlackList = () => (dispatch) => {
  request().get('/auth/admin/agent/block')
    .then((res) => {
      dispatch(getBasaAgentInThunkAction(res.data))})
    .catch((err) => console.log('error', err));
};
