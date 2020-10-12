import React from 'react';
import closeX from '../../../../assect/image/closeX.png';

const ApartamentActionItems = ({ name, date, reason, handleDelete, id }) => {

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
  return (
    <div className="apartamentAction">
      <div className="apartamentAction_item">
        <div className="apartamentAction_title">Новое</div>
        <div className="apartamentAction_text">
          {name}
          {' '}
          {`закрыл запрос от ${toISODateArivalDate(date)}`}
          {' '}
          {`по причине ${reason}`}
        </div>
      </div>
      <div className="apartamentAction_close_icon">
        <button
          type="button"
          className="button_img_hover"
          onClick={()=> handleDelete(id)}
        >
          <img src={closeX} alt="closeX" />
        </button>
      </div>
    </div>
  );
};

export default ApartamentActionItems;
