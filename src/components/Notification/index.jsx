import React, { useEffect } from 'react';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import HeaderAddButtonHoc from '../../HOC/HeaderAddButtonHoc';
import { getAllNotification } from '../../store/thunkAction/getAllNotification';
import { getFullNotification } from '../../store/selector/getFullNotification';
import NotificationItem from './NotificationItem';

const Notification = () => {
  const dispatch = useDispatch();
  const fullNotofaction = useSelector(getFullNotification);

  useEffect(() => {
    dispatch(getAllNotification());
  }, []);

  return (
    fullNotofaction ? fullNotofaction
      .map((elem) => (<NotificationItem name={elem.data.agentFio} type={elem.type} date={elem.date} id={elem.id} />))
      : <div className="notItemsNotification">по вашему запросу ничего не найдено</div>
  );
};

export default HeaderAddButtonHoc(Notification);
