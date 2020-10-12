import React from 'react';
import closeX from '../../../../assect/image/closeX.png';

const QueryActionItems = ({
  name, date, reason, handleDelete, id
}) => {
  const toISODateArivalDate = (milliseconds) => {
    if (milliseconds) {
      const date = new Date(milliseconds);
      const y = date.getFullYear();
      let m = date.getMonth() + 1;
      let d = date.getDate();
      m = (m < 10) ? `0${m}` : m;
      d = (d < 10) ? `0${d}` : d;
      return [y, m, d].join('.');
    }
    return 'Отсуствует';
  };

  //   const parseStatus = {
  //     0: 'Актуально',
  //     1: 'Не актуально',
  //     2: 'Сдано',
  //     3: 'Завершено',

  //   };

  return (
    <div>
      <div className="queryActions">
        <div className="queryActions_item">
          <div className="queryActions_title">Новое</div>
          <div className="queryActions_text">
            {name}
            {' '}
            закрыл запрос от
            {' '}
            {toISODateArivalDate(date)}
            {' '}
            по причине
            {' '}
            {reason}
          </div>
        </div>
        <div className="queryActions_close_icon">
          <button
            type="button"
            className="button_img_hover"
            onClick={() => handleDelete(id)}
          >
            <img src={closeX} alt="closeX" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QueryActionItems;
