import { BASEAGENT, BASEAGENTBLACKLIST } from '../../actionType/AdminActionType';

export const getBasaAgentInThunkAction = (data) => ({
  type: BASEAGENT,
  data,
});


export const getBasaAgentBlackListInThunkAction = (data) => ({
  type: BASEAGENTBLACKLIST,
  data,
});
