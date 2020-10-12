import React, { useEffect, useState } from 'react';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getAllNotification } from '../../../store/thunkAction/getAllNotification';
import { getFullNotification } from '../../../store/selector/getFullNotification';
import NotificationRequestHOC from '../../../HOC/notificationRequestHOC';
import QueryActionItems from './QueryActionItems';
import { getStateLoading } from '../../../store/selector/getStateLoading';
import request from '../../../constants/api';
import RequestLoader from '../../loaderRequest/loaderRequest';

const QueryActions = () => {
  const [queryActionData, setQueryActionData] = useState([]);
  const dispatch = useDispatch();
  const fullNotification = useSelector(getFullNotification);
  const isLoading = useSelector(getStateLoading);
  useEffect(() => {
    dispatch(getAllNotification());
    setQueryActionData(fullNotification.length ? fullNotification.filter((elem) => elem.type === 3) : []);
  }, []);

  const handleDelete = (id) => {
    request().post(`notification/remove?id=${id}`)
      .then((response) => {
        if (response.status === 204) {
          setQueryActionData(queryActionData.filter((elem) => elem.id !== id));
        }
      });
  };
  return isLoading ? (
    <div style={{marginTop: '15px'}}>
      {' '}
      <RequestLoader />
      {' '}
    </div>
  )
    : (
      <>
        {
      queryActionData.length ? queryActionData.map((elem) => <QueryActionItems handleDelete={handleDelete} name={elem.data.agentFio} id={elem.id} key={elem.id} date={elem.date} reason={elem.data.reasonDesc} />) : (
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

export default NotificationRequestHOC(QueryActions);
