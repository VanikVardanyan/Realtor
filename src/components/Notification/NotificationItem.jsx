import React from 'react';
import { useDispatch } from 'react-redux';
import closeX from '../../assect/image/closeX.png';
import { deleteNotification } from '../../store/thunkAction/deleteNotification';

const NotificationItem = ({
  name, type, date, id, onClick,
}) => {
  const dispatch = useDispatch();
  const toISODate = (milliseconds) => {
    const date = new Date(milliseconds);
    const y = date.getFullYear();
    let m = date.getMonth() + 1;
    let d = date.getDate();
    m = (m < 10) ? `0${m}` : m;
    d = (d < 10) ? `0${d}` : d;
    return [y, m, d].join('.');
  };

  const handleClick = () => {
    dispatch(deleteNotification(id));
  };

  return (
    <div className="notification">
      <div className="notification_item">
        <div className="notification_title">Новое</div>
        <div className="notification_text">
          {`Пользователь ${name} ${type === 2 ? `просмотрел вашу запись ${toISODate(date)}` : 'скрыл вашу запись'}`}
        </div>
      </div>
      <div className="notification_closeBTN">
        <button
          type="button"
          className="button_img_hover"
          onClick={handleClick}
        >
          <img src={closeX} alt="closeX" />
        </button>

      </div>
    </div>
  );
};
export default NotificationItem;
