import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import './style.scss';

import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { getFileredOfferData } from '../../../store/selector/getFileredOfferData';
import HeaderAddButtonHoc from '../../../HOC/HeaderAddButtonHoc';
import { getUserFioId } from '../../../store/selector/getUserFioId';
import RequestLoader from '../../loaderRequest/loaderRequest';
import PostItem from '../PostsItems';
import request from '../../../constants/api';
import DropDown from '../../common/dropdown';

const MyPosts = () => {
  const filterApartaments = useSelector(getFileredOfferData);
  const userFioId = useSelector(getUserFioId);
  const [data, setData] = useState([]);
  const [isLoadingCheck, setIsloadingCheck] = useState(false);
  const location = useLocation()
  const [sortCategory, setSortCategory] = useState('');

  useEffect(() => {
    request().post(`/query/list/self?page=${0}`)
      .then((res) => {
        setIsloadingCheck(true);
        setData(res.data);
      });
  }, [location]);

  let page = 1;

  const fetchMoreData = () => {
    request().post(`/query/list/self?page=${page}`)
      .then((res) => {
        if (res.status === 200) {
          setData(res.data);
          page += 1;
        }
      });
  };

  const handleChangeVal = (value) => {
    setSortCategory(value);
    if (value === 'Дата добавления (по умолчанию) ') {
    setIsloadingCheck(false);
      request().post(`/query/list/self?page=${0}`)
      .then((res) => {
        setData(res.data);
        setIsloadingCheck(true)
      })
      .catch(()=> setIsloadingCheck(true) )
      ;
    }
    if (value === 'Дата заселения не от срочных' ) {
    setIsloadingCheck(false);
      request().post(`/query/list/self?page=${0}&sortField=arrivalDate&sortDirection=ASC`)
      .then((res) => {
        setData(res.data);
        setIsloadingCheck(true)
      })
      .catch(()=> setIsloadingCheck(true) )
      ;
    } else if (value === 'Дата заселения от срочных') {
    setIsloadingCheck(false);
      request().post(`/query/list/self?page=${0}&sortField=arrivalDate&sortDirection=DESC`)
      .then((res) => {
        setData(res.data);
        setIsloadingCheck(true)
      })
      .catch(()=> setIsloadingCheck(true) )
      ;
    } else if (value === 'Цене от дорогих') {
    setIsloadingCheck(false);
    request().post(`/query/list/self?page=${0}&sortField=price.min&sortDirection=DESC`)
      .then((res) => {
        setData(res.data);
        setIsloadingCheck(true)
      })
      .catch(()=> setIsloadingCheck(true) )
      ;
    } else if (value === 'Цене от дешевых') {
    setIsloadingCheck(false);
    request().post(`/query/list/self?page=${0}&sortField=price.max&sortDirection=ASC`)
    .then((res) => {
      setData(res.data);
      setIsloadingCheck(true)
    })
     
      .catch(()=> setIsloadingCheck(true) )
      ;
    }
  };

  return (
    <>
      <div className="sortBy">
      <span>Сортировать по:</span>
      {' '}
      <DropDown
        className="sortBy_dropdown"
        category={[['Дата добавления (по умолчанию) '], ['Дата заселения от срочных'], ['Дата заселения не от срочных'], ['Цене от дорогих'], ['Цене от дешевых']]}
        onChange={(e) => handleChangeVal(e.target.value)}
        mainText = {sortCategory}
      />
    </div>
      <InfiniteScroll
        dataLength={filterApartaments.length}
        next={fetchMoreData}
        hasMore
      >
        <div
          className="requestLoaderSection"
          style={{ display: !isLoadingCheck ? 'block' : 'none' }}
        >
          {' '}
          <RequestLoader />
        </div>

        {
      isLoadingCheck && data.length ? data.map((elem) => (
        <PostItem
          key={nanoid()}
          phone={elem.client.phone}
          fio={userFioId.fio}
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
          style={{ display: isLoadingCheck ? 'block' : 'none' }}
        >
          по вашему запросу ничего не найдено
        </div>
    )
}
      </InfiniteScroll>

    </>
  );
};

export default HeaderAddButtonHoc(MyPosts);
