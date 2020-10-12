import React from 'react';
import './style.scss';
import pen from '../../../../assect/image/penIcon.svg';

const ApartamentListOpen = () => {
  console.log('ssss');
  return (
    <div className="apartamentListOpen">
      <div className="apartamentListOpen_icon_section">
        <button type="button" className="button_img_hover">
          <img src={pen} alt="pen" />
        </button>
      </div>
      <div className="apartamentListOpen_items_section">
        <div className="apartamentListOpen_item">
          <div className="apartamentListOpen_title">Имя</div>
          <div className="apartamentListOpen_ivestment">
            Крупеницкая Ольга Владимировна
          </div>
        </div>
        <div className="apartamentListOpen_coment_section">
          <div className="apartamentListOpen_title">Коментарий</div>
          <textarea className="apartamentListOpenTop_textArea" />
        </div>
        <div className="apartamentListOpen_coment_section">
          <div className="apartamentListOpen_title">Причина отказа</div>
          <textarea className="apartamentListOpenBottom_textArea" />
        </div>
      </div>
      <div className="apartamentListOpen_contacts">
        <div className="test">
          <div className="apartamentListOpen_contact_section_Btn">
            <div className="apartamentListOpen_title">Телефоны</div>
            <div className="apartamentListOpen_subTitle">+7 (800) 999-99-99</div>
            <button type="button">Еще телефоны</button>
          </div>
          <div className="apartamentListOpen_contact_section_Btn">
            <div className="apartamentListOpen_title">Телефоны</div>
            <div className="apartamentListOpen_subTitle">Договор на соб...doc,s</div>
            <button type="button">Еще документы</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApartamentListOpen;
