import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import InfiniteScroll from 'react-infinite-scroll-component';
// eslint-disable-next-line no-unused-vars
import RequestLoader from '../../loaderRequest/loaderRequest';
import PostItem from '../PostsItems';
import HeaderAddButtonHoc from '../../../HOC/HeaderAddButtonHoc';
import request from '../../../constants/api';

const Favorit = () => {
  const [myFavorit, setMyFavorit] = useState([]);
  const [isLoadingCheck, setIsloadingCheck] = useState(false);
  const [pageNum, setPageNum] = useState(0);
  useEffect(() => {
    request().post(`/favorites?page=${pageNum}`)
      .then((res) => {
        setIsloadingCheck(true);
        setMyFavorit(res.data);
      });
  }, []);

  const fetchMoreData = () => {
    // dispatch(getFavoritList2(sortByDateAdded));
    request().post(`/favorites?page=${pageNum + 1}`);
  };

  return (
    <>
      <InfiniteScroll
        dataLength={myFavorit.length}
        next={fetchMoreData}
        hasMore
        // loader={<h4>Loading...</h4>}
      >
        <div
          className="requestLoaderSection"
          style={{ display: !isLoadingCheck ? 'block' : 'none' }}
        >
          {' '}
          <RequestLoader />
        </div>

        {

      isLoadingCheck && myFavorit.length ? myFavorit
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

export default HeaderAddButtonHoc(Favorit);
