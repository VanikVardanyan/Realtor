import request from '../../constants/api';
import { parseQuery } from '../../util';
import { FILTERED_OFFER_DATA, FILTER_SORT_PARAMS } from '../actionType';
import { isLoadingCheck } from './login';

export const fileredOfferDataFetch = (fileredOfferData) => ({
  type: FILTERED_OFFER_DATA,
  fileredOfferData,
});

export const fliterSortByParametres = (params) => ({
  type: FILTER_SORT_PARAMS,
  params,
})

export const filterSortByDateAdded = (params, selectorId) => (dispatch) => {
  dispatch(isLoadingCheck(true));
  request().post(`/query/list${parseQuery(params)}`, { id: selectorId })
    .then((res) => {
      setTimeout(() => {
        dispatch(fileredOfferDataFetch(res.data || []));
        dispatch(fliterSortByParametres(params))
        dispatch(isLoadingCheck(false));
      }, [1000]);
    })
    .catch((err) => console.log('error', err));
};

export const filterSortByDateAdded2 = (params, selectorId,) => (dispatch) => {
  request().post(`/query/list${parseQuery(params)}`, { id: selectorId })
    .then((res) => {
      if (res.status === 200) {
        dispatch(fileredOfferDataFetch(res.data || []));
      }
    })
    .catch((err) => console.log('error', err));
};


