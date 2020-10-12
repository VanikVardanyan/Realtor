import React, { useEffect, useState } from 'react';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getAllNotification } from '../../../store/thunkAction/getAllNotification';
import { getFullNotification } from '../../../store/selector/getFullNotification';
import NotificationRequestHOC from '../../../HOC/notificationRequestHOC';
import { getStateLoading } from '../../../store/selector/getStateLoading';
import ApartamentsComparisonItems from './ApartamentsComparisonItems';
import request from '../../../constants/api';
import RequestLoader from '../../loaderRequest/loaderRequest';

const ApartamentsComparison = () => {
  const [queryActionData, setQueryActionData] = useState([]);
  const dispatch = useDispatch();
  const fullNotification = useSelector(getFullNotification);
  const isLoading = useSelector(getStateLoading);
  useEffect(() => {
    dispatch(getAllNotification());
    setQueryActionData(fullNotification.length ? fullNotification.filter((elem) => elem.type === 4 || 2) : []);
  }, []);
  const handleDelete = (id) => {
    request().post(`notification/remove?id=${id}`)
      .then((res) => {
        if (res.status === 204) {
          const newList = queryActionData.filter((elem) => elem.id !== id);
          setQueryActionData(newList || []);
        }
      });
  };
  return isLoading ? (
    <div style={{ marginTop: '15px' }}>
      {' '}
      <RequestLoader />
      {' '}
    </div>
  )
    : (
      <>
        {
    queryActionData.length ? queryActionData.map((elem) => <ApartamentsComparisonItems id={elem.id} key={elem.id} handleDelete={handleDelete} time={elem.data.time} date={elem.date} reason={elem.data.reasonDesc} />) : (
      <div
        className="notItemsNotification"
        style={{ display: !isLoading ? 'block' : 'none', marginTop: '15px' }}
      >
        по вашему запросу ничего не найдено
      </div>
    )
  }

      </>
    );
};

export default NotificationRequestHOC(ApartamentsComparison);
