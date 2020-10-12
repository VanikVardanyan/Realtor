/* eslint-disable import/prefer-default-export */
import request from '../../../constants/api';

export const getRequestAgentList = () => (dispatch) => {
  request().get('/auth/admin/agent/list')
    .then((res) => console.log(res))
    .catch((err) => console.log('error', err));
};
