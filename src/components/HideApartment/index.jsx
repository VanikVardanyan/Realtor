import React from 'react';
import './style.scss';
import RadioBtnThreeGroup from '../common/radioBtnThreeGroup';

const HideApartament = () => {
  return (
    <div className="hideAapartament">
      <div className="hideAapartament_item">
        <div className="hideAapartament_title">Почему вы хотите скрыть эту квартиру?</div>
        <div className="hideAapartament_checked">
          <RadioBtnThreeGroup title1="Не актуально" title2="Сдано" title3="Завершено" />
        </div>
        <div className="hideAapartament_coment">
          <textarea className="hideAapartament_textArea" />
        </div>
      </div>
      <div className="hideAapartament_Next_section">
        <button
          type="button"
          className="hideAapartament_Next_btn"
        >
          Далее
        </button>
      </div>
    </div>
  );
};

export default HideApartament;
