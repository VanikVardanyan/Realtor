import React, { useEffect, useState } from 'react';
import './style.scss';

import { useDispatch, useSelector } from 'react-redux';
import NotificationRequestHOC from '../../../HOC/notificationRequestHOC';
import { getAllNotification } from '../../../store/thunkAction/getAllNotification';
import { getFullNotification } from '../../../store/selector/getFullNotification';
import { getStateLoading } from '../../../store/selector/getStateLoading';
import ApartamentActionItems from './ApartamentActionItems';
import request from '../../../constants/api';
import RequestLoader from '../../loaderRequest/loaderRequest';

const ApartamentAction = () => {
  const [queryActionData, setQueryActionData] = useState([]);
  const dispatch = useDispatch();
  const fullNotification = useSelector(getFullNotification);
  const isLoading = useSelector(getStateLoading);
  useEffect(() => {
    dispatch(getAllNotification());
    setQueryActionData(fullNotification.length ? fullNotification.filter((elem) => elem.type === 3) : []);
  }, []);

  const handleDelete = (id) => {
    request().get(`notification/remove?id=${id}`)
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
      queryActionData.length ? queryActionData.map((elem) => <ApartamentActionItems handleDelete={handleDelete} id={elem.id} name={elem.data.agentFio} key={elem.id} date={elem.date} reason={elem.data.reasonDesc} />) : (
        <div
          className="notItemsNotification"
          style={{ display: !isLoading ? 'block' : 'none', marginTop: '15px' }}
        >
          по вашему запросу ничего не найдено
        </div>
      )
    );
};

export default NotificationRequestHOC(ApartamentAction);
