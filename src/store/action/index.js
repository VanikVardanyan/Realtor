/* eslint-disable import/prefer-default-export */
import { SAVE_NUMBER_ADDREQUEST, CLEAR_STATE, CHECK_AUTO, CLEAR_STATE_FAVORIT } from '../actionType';

export const saveAddRequestTel = (tel) => ({
  type: SAVE_NUMBER_ADDREQUEST,
  tel,
});

export const cleaerState = () => ({
  type: CLEAR_STATE,
})

export const cleaerStateFavorit = () => ({
  type: CLEAR_STATE_FAVORIT,
})

export const getCheckAuto = (check) => ({
  type: CHECK_AUTO,
  check,
})