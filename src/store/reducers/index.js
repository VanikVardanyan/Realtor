import { combineReducers } from 'redux';
import userData from './userData.js';
import favorit_Reducer from './favorits_reducer';
import admin_base_reducer from './AdminReducer/AgentBaseReducer';

const rootReducer = combineReducers({
  user: userData,
  favorit: favorit_Reducer,
  adminBase: admin_base_reducer,
});

export default rootReducer;
