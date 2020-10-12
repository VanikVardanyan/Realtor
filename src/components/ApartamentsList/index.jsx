import React, { useState } from 'react';
import './style.scss';

import hideIcon from '../../assect/image/hideIcon.svg';
import avitoIcon from '../../assect/image/browser.svg';
import arrowTop from '../../assect/image/arrow_top.png';
import arrowBottom from '../../assect/image/arrow_bottom.png';
import ApartamentsCarousel from './apartamentCarousel';
import ApartamentListOpen from './apartamentListOpen';

const ApartamentsList = ({
  additional,
  children,
  comment,
  district,
  documents,
  flatNumber,
  foreigners,
  id,
  link,
  name,
  numberHouse,
  phones,
  pictures,
  price,
  rating,
  releaseDate,
  roomNumber,
  street,
}) => {
  const [toggle, setToggle] = useState(false);
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
  const handleClickTo = () => {
    if (!link.includes('http')) {
      const newLink = `http://${link}`;
      return window.open(`https://${newLink}`, '_blank');
    }
    window.open(`https://${link}`, '_blank');
  };
  return (
    <div className="apartamentsList">
      <div className="aprtamentsList_header">
        <div className="apartamentsList_header_date">
          {toISODateArivalDate(releaseDate)}
        </div>
        <div className="apartamentsList_header_release_date">
          <span className="aprtamentsList_header_rd_text">Освободится</span>
          <span>20.02.2020</span>
        </div>
      </div>
      <div className="aprtamentsList_body">
        <div className="apartaments_icons_section">
          <button type="button" className="button_img_hover">
            <img src={hideIcon} alt="hidenIcon" />
          </button>
          <button
            type="button"
            className="button_img_hover"
            onClick={handleClickTo}
          >

            <img src={avitoIcon} alt="avitoIcon" className="internetIcon" />
            {' '}
          </button>
        </div>
        <div className="apartaments_items_section">
          <div className="apartaments_items_row_firstLine">
            <div className="apartaments_items_col">
              <div className="apartaments_items_title">Район</div>
              <div className="apartaments_items_investment">
                <div>{district || 'не указана'}</div>
              </div>
            </div>
            <div className="apartaments_items_col_addres">
              <div className="apartaments_items_title">Адрес</div>
              <div className="apartaments_items_investment">{street || 'не указана'}</div>
            </div>
          </div>
          <div className="apartaments_items_row">
            <div className="apartaments_items_col">
              <div className="apartaments_items_title">Кол-во комнат</div>
              <div className="apartaments_items_investment">{roomNumber || 'не указана' }</div>
            </div>
            <div className="apartaments_items_col">
              <div className="apartaments_items_title">Инностранцы</div>
              <div className="apartaments_items_investment">
                {foreigners ? 'да' : 'нет'}
              </div>
            </div>
            <div className="apartaments_items_col">
              <div className="apartaments_items_title">Цена</div>
              <div className="apartaments_items_investment">
                {price}
                {' '}
                ₽
              </div>
            </div>
          </div>
          <div className="apartaments_items_row">
            <div className="apartaments_items_col">
              <div className="apartaments_items_title">Животные</div>
              <div className="apartaments_items_investment">Да</div>
            </div>
            <div className="apartaments_items_col">
              <div className="apartaments_items_title">Дети</div>
              <div className="apartaments_items_investment">{children ? 'да' : 'нет'}</div>
            </div>
            <div className="apartaments_items_col">
              <div className="apartaments_items_title">Оценка</div>
              <div className="apartaments_items_investment">
                <button type="button" className="apartaments_items_investment_btn">{rating || 1}</button>
              </div>
            </div>
          </div>
        </div>
        <div className="apartaments_image">
          <ApartamentsCarousel pictures={pictures.length ? pictures : []} id={id} />
        </div>
      </div>
      <button
        type="button"
        className="apartamentsList_arrowBtn"
        onClick={() => setToggle(!toggle)}
      >
        <img src={arrowTop} alt="arrowTop" />
      </button>
      <div style={{ display: toggle ? 'block' : 'none' }}>
        <ApartamentListOpen name={name || 'не указано'} phones={phones} comment={comment} documents={documents} />
      </div>
      <button
        type="button"
        className="apartamentsList_arrowBtn"
        onClick={() => setToggle(!toggle)}
      >
        <img src={arrowBottom} alt="arrowBottom" />
      </button>
    </div>
  );
};

export default ApartamentsList;
