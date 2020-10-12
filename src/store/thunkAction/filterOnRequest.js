import request from '../../constants/api';
import { FILTERED_OFFER_DATA, SEARCH_APARTAMENT_FILTER_ID, FILTER_ON_REQUEST, PERSONAL_POSTS } from '../actionType';
import { isLoadingCheck } from './login';
import { parseQuery } from '../../util';

export const fileredOfferDataFetch = (fileredOfferData) => ({
  type: FILTERED_OFFER_DATA,
  fileredOfferData,
});

export const getSearchApartamentsId = (searchApartamentsId) => ({
  type: SEARCH_APARTAMENT_FILTER_ID,
  searchApartamentsId,
})

export const getFilterSortBy = (data, params) => ({
  type: FILTER_ON_REQUEST,
  data,
  params
})

export const getPersonalPost = (data) => ({
  type: PERSONAL_POSTS,
  data,
})


export const filterOnRequest = (params) => (dispatch) => {
  dispatch(isLoadingCheck(true))
  request().post('/query/list?page=0&sortField=creationDate&sortDirection=ASC',
    params)
    .then((res) => {
      if(res.status === 200) {
        dispatch(getFilterSortBy(res.data, params));
        dispatch(isLoadingCheck(false))

      } else {
        dispatch(getFilterSortBy([]));
        dispatch(isLoadingCheck(false))
      }
      const dataId = res.data.map((elem) => elem.id);
      dispatch(getSearchApartamentsId(dataId))
    }).catch(() => {
      dispatch(isLoadingCheck(false))
    })

    .catch((err) => console.log('error', err));
};

export const filterOnRequest2 = (filterParams,sortByDateAdded) => (dispatch) => {
  request().post(`/query/list${parseQuery(sortByDateAdded)}`,
    filterParams)
    .then((res) => {
      if(res.status === 200) {
        dispatch(getFilterSortBy(res.data, filterParams));

      } else {
        dispatch(getFilterSortBy([]));
      }
      const dataId = res.data.map((elem) => elem.id);
      dispatch(getSearchApartamentsId(dataId))
    }).catch(() => {
    })

    .catch((err) => console.log('error', err));
};




