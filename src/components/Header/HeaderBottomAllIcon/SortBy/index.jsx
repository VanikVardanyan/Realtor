import React, { useState, useEffect } from 'react';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import DropDown from '../../../common/dropdown';
import { filterSortByDateAdded } from '../../../../store/thunkAction/filterApartaments';
import { getSearchApartamentsIdData } from '../../../../store/selector/getSearchApartamentsIdData';
import { cleaerState } from '../../../../store/action';

const SortBy = () => {
  const [sortCategory, setSortCategory] = useState('');
  const dispatch = useDispatch();
  const selectorId = useSelector(getSearchApartamentsIdData);
  useEffect(() => {
    
    if (sortCategory === 'Дата добавления (по умолчанию) ') {
      const sortDefault = {
        page: 0,
        sortField: 'creationDate',
        sortDirection: 'DESC', 
      };
      dispatch(cleaerState())
      dispatch(filterSortByDateAdded(sortDefault, selectorId));
    }
    if (sortCategory === 'Дата заселения не от срочных' ) {
      const DateSetTlementUrgent = {
        page: 0,
        sortField: 'arrivalDate',
        sortDirection: 'ASC',
      };
      dispatch(cleaerState())
      dispatch(filterSortByDateAdded(DateSetTlementUrgent,selectorId));
    } else if (sortCategory === 'Дата заселения от срочных') {
      const DateSetTlementNotUrgent = {
        page: 0,
        sortField: 'arrivalDate',
        sortDirection: 'DESC',
      };
      dispatch(cleaerState())
      dispatch(filterSortByDateAdded(DateSetTlementNotUrgent, selectorId));
    } else if (sortCategory === 'Цене от дорогих') {
      const PricefromExpensive = {
        page: 0,
        sortField: 'price.min',
        sortDirection: 'DESC',
      };
      dispatch(cleaerState())
      dispatch(filterSortByDateAdded(PricefromExpensive, selectorId));
    } else if (sortCategory === 'Цене от дешевых') {
      const PriceFromCheap = {
        page: 0,
        sortField: 'price.max',
        sortDirection: 'ASC',
      };
      dispatch(cleaerState())
      dispatch(filterSortByDateAdded(PriceFromCheap, selectorId));
    }
  }, [sortCategory]);
  
  const handleChangeVal = (value) => {
    setSortCategory(value);
  };
  return (
    <div className="sortBy">
      <span>Сортировать по:</span>
      {' '}
      <DropDown
        className="sortBy_dropdown"
        category={['Дата добавления (по умолчанию) ', ['Дата заселения от срочных'], ['Дата заселения не от срочных'], ['Цене от дорогих'], ['Цене от дешевых']]}
        onChange={(e) => handleChangeVal(e.target.value)}
        mainText = {sortCategory}
      />
    </div>
  );
}; 

export default SortBy;
