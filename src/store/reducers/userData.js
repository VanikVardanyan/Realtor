import {
  DELETE_APARTAMENT, GET_USER, IS_LOADING, FILTERED_OFFER_DATA,
  LOG_PAS_ID, SEARCH_APARTAMENT_FILTER_ID, ACTIVE_FAVORIT, POST_NOTIFICATION,
  SAVE_NUMBER_ADDREQUEST, CLIENT_NUMBER, ERROR_MESSAGE_LOGIN, GET_ALL_NOTIFICATION,
  NOTIFICATION_HAVE, PHONE_LOADING, CLEAR_STATE, FILTER_SORT_PARAMS, FILTER_FOR_NUMMBER, CHECK_AUTO,
  FILTER_ON_REQUEST, PERSONAL_POSTS, POST_HISTORY, GET_USER_ROLE
} from '../actionType';

const initialState = {
  person: {
    fio: '',
    id: '',
    role: '',
  },
  userRole: '',
  checkAuto: false,
  logPas: {},
  isLoading: false,
  isLoadingPhone: false,
  signInLoading: false,
  filterApartaments: [],
  filterParams: {},
  clientNumber: '',
  searchApartamentsId: [],
  favId: [],
  postNotification: '',
  postHistory: [],
  addRequestTel: '',
  errorMesageLogin: '',
  allNotification: [],
  notificationHave: '',
  filterSortParams: {
    page: 0,
    sortField: 'creationDate',
    sortDirection: 'DESC',
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_ROLE : {
      return {...state,userRole: action.role }
    }
    case IS_LOADING: {
      return { ...state, isLoading: action.isLoading };
    }
    case GET_USER: {
      const user = {
        fio: action.person.fio,
        id: action.person.id,
        role: action.person.role,
      };
      if(action.status === 'ok') {
      }
      return { ...state, person: user, checkAuto: action.status };
    }
    case FILTERED_OFFER_DATA: {
      const newApartaments = action.fileredOfferData.map((elem) => ({
        ...elem,
        active: action.active || state.favId.includes(elem.id),
      }));
      return { ...state, filterApartaments: [...state.filterApartaments, ...newApartaments] };
    }
    case LOG_PAS_ID: {
      const logPas = {
        login: action.log,
        password: action.pas,
      };
      return { ...state, logPas };
    } case SEARCH_APARTAMENT_FILTER_ID: {
      return { ...state, searchApartamentsId: action.searchApartamentsId };
    } case ACTIVE_FAVORIT: {
      const favId = Object.values(action.id);
      const newApartaments = state.filterApartaments.map((elem) => ({
        ...elem,
        active: favId.includes(elem.id),
      }));
      return { ...state, filterApartaments: newApartaments, favId };
    } case DELETE_APARTAMENT: {
      return { ...state, filterApartaments: state.filterApartaments.filter((apart) => apart.id !== action.id) };
    } case POST_NOTIFICATION: {
      return { ...state, postNotification: action.notification || '' };
    } case SAVE_NUMBER_ADDREQUEST: {
      return { ...state, addRequestTel: action.tel };
    } case CLIENT_NUMBER: {
      return { ...state, clientNumber: action.number };
    } case ERROR_MESSAGE_LOGIN: {
      return { ...state, errorMesageLogin: action.message };
    } case GET_ALL_NOTIFICATION: {
      return { ...state, allNotification: action.allNotification };
    } case NOTIFICATION_HAVE: {
      return { ...state, notificationHave: action.notificationHave.data };
    } case PHONE_LOADING: {
      return { ...state, isLoadingPhone: action.isloading };
    } case CLEAR_STATE: {
      return {...state, filterApartaments: [], filterParams: {} };
    } case FILTER_SORT_PARAMS : {
      return {...state, filterSortParams: action.params}
    } case FILTER_FOR_NUMMBER : {
      return {...state, filterApartaments: action.params }
    } case CHECK_AUTO : {
      return {...state, checkAuto: action.check}
    } case FILTER_ON_REQUEST : {
      return {...state, filterApartaments: [...state.filterApartaments, ...action.data],filterParams: action.params}
    } case PERSONAL_POSTS : {
      const newApartaments = state.filterApartaments.filter((elem) => elem.client.fio === state.person.fio)
      return {...state, filterApartaments: newApartaments}
    } case POST_HISTORY : {
      return {...state, postHistory: action.data}
    }
    default: {
      return state;
    }
  }
};
