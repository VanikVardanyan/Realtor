import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import '../MyPosts/style.scss';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { nanoid } from 'nanoid';
import { getFileredOfferData } from '../../../store/selector/getFileredOfferData';
import { filterSortByDateAdded, filterSortByDateAdded2 } from '../../../store/thunkAction/filterApartaments';
import SortBy from '../../Header/HeaderBottomAllIcon/SortBy';
import HeaderAddButtonHoc from '../../../HOC/HeaderAddButtonHoc';
import { getUserFio } from '../../../store/thunkAction/getUserFio';
import { getUserFioId } from '../../../store/selector/getUserFioId';
import RequestLoader from '../../loaderRequest/loaderRequest';
import { getStateLoading } from '../../../store/selector/getStateLoading';
import PostItem from '../PostsItems';
import { getFavoritListId } from '../../../store/thunkAction/getFavoritList';
import { getfilterSortParams } from '../../../store/selector/getfilterSortParams';
import { getFilterParams } from '../../../store/selector/getFilterSearchParams';
import { filterOnRequest2 } from '../../../store/thunkAction/filterOnRequest';
import { infoAboutNotification } from '../../../store/thunkAction/infoAboutNotification';

const PersonalPosts = (props) => {
  const filterApartaments = useSelector(getFileredOfferData);
  const userFioId = useSelector(getUserFioId);
  const isLoadingCheck = useSelector(getStateLoading);
  const filterSortParamsData = useSelector(getfilterSortParams);
  const filterParams = useSelector(getFilterParams);
  const dispatch = useDispatch();
  const [pageNum, setPageNum] = useState(1);
  useEffect(() => {
    const sortByDateAdded = {
      page: 0,
      sortField: filterSortParamsData.sortField,
      sortDirection: filterSortParamsData.sortDirection,
    };
    dispatch(filterSortByDateAdded(sortByDateAdded));
    dispatch(getFavoritListId());
    // if (!userFioId.length) {
    //   dispatch(getUserFio());
    // }
    dispatch(infoAboutNotification());
  }, []);
  

  useEffect(() => {
    setPageNum(1);
  }, [filterSortParamsData]);

  const fetchMoreData = () => {
    if (Object.keys(filterParams).length > 1 && filterParams) {
      const sortByDateAdded = {
        page: pageNum,
        sortfield: 'creationDate',
        sortDirection: 'DESC',
      };
      dispatch(filterOnRequest2(filterParams, sortByDateAdded));
      setPageNum(pageNum + 1);
    } else {
      const sortByDateAdded = {
        page: pageNum,
        sortField: filterSortParamsData.sortField,
        sortDirection: filterSortParamsData.sortDirection,
      };
      dispatch(filterSortByDateAdded2(sortByDateAdded));
      setPageNum(pageNum + 1);
    }
  };

  return (
    <>
      <SortBy />
      <InfiniteScroll
        dataLength={filterApartaments.length}
        next={fetchMoreData}
        hasMore
      >
        <div
          className="requestLoaderSection"
          style={{ display: isLoadingCheck ? 'block' : 'none' }}
        >
          {' '}
          <RequestLoader />
        </div>
        {

      !isLoadingCheck && filterApartaments.length ? filterApartaments
        .map((elem) => (
          <PostItem
            key={nanoid()}
            phone={elem.client.phone}
            fio={elem.client.fio}
            fioAuthor={elem.author.fio}
            min={elem.price.min}
            max={elem.price.max}
            childs={elem.flat.childs}
            district={elem.district}
            pets={elem.flat.pets}
            id={elem.id}
            creationDate={elem.creationDate}
            active={elem.active}
            rooms={elem.flat.rooms}
            citizenship={elem.citizenship}
            clientStatus={elem.client.clientStatus}
            arrivalDate={elem.arrivalDate}
            organization={elem.client.organization}
            people={elem.people}
            renovation={elem.flat.renovation}
            comment={elem.comment}
            isFavorite={elem.isFavorite}
          />
        )) : (
          <div
            className="notItemsNotification"
            style={{ display: !isLoadingCheck ? 'block' : 'none' }}
          >
            по вашему запросу ничего не найдено
          </div>
      )
}
      </InfiniteScroll>

    </>
  );
};

export default HeaderAddButtonHoc(PersonalPosts);
