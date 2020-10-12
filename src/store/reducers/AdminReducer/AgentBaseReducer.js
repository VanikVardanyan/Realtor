import { BASEAGENT, BASEAGENTBLACKLIST } from '../../actionType/AdminActionType';

const initialStae = {
  agentBase: [],
  blackList: [],
};

export default (state = initialStae, action) => {
  switch (action.type) {
    case BASEAGENT: {
      return { ...state, agentBase: action.data };
    } case BASEAGENTBLACKLIST: {
      return { ...state, blackList: action.data };
    }
    default: return state;
  }
};
