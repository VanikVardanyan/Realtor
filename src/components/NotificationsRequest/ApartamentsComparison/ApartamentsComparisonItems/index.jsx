import React from 'react';
import closeX from '../../../../assect/image/closeX.png';

const ApartamentsComparisonItems = ({
  date, time, id, handleDelete,
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
  const dateStr = new Date(time);
  const humanreadableStr = `${dateStr.getHours()}:${dateStr.getMinutes()}`;

  return (
    <div>
      <div className="apartamentsComparison">
        <div className="apartamentsComparison_item">
          <div className="apartamentsComparison_title">Новое</div>
          <div className="apartamentsComparison_text">
            Найдено новое соответствие квартиры от
            {toISODateArivalDate(date)}
            {' '}
            в
            {' '}
            {humanreadableStr}
          </div>
        </div>
        <div className="apartamentsComparison_close_icon">
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

export default ApartamentsComparisonItems;
