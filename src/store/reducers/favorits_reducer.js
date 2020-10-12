import {
  FAVORITS,
  ACTIVE_FAVORIT_POST,
  DELETE_APARTAMENT,
  CLEAR_STATE_FAVORIT,

} from '../actionType';

const initialState = {
  favorit: [],
  favId: [],

};

export default (state = initialState, action) => {
  switch (action.type) {
    case FAVORITS: {
      const newApartaments = action.data.map((elem) => ({
        ...elem,
        active: action.active || state.favId.includes(elem.id),
      }));
      return { ...state, favorit: [...state.favorit, ...newApartaments] };
    }
    case ACTIVE_FAVORIT_POST: {
      const favId = Object.values(action.id);
      const newApartaments = state.favorit.map((elem) => ({
        ...elem,
        active: favId.includes(elem.id),
      }));
      return { ...state, favorit: newApartaments, favId };
    } case DELETE_APARTAMENT: {
      return { ...state, favorit: state.favorit.filter((apart) => apart.id !== action.id) };
    } case CLEAR_STATE_FAVORIT: {
      return { ...state, favorit: [] };
    }
    default: {
      return state;
    }
  }
};
