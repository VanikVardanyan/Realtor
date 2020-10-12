import React, { useState, useCallback } from 'react';
import './style.scss';
import { useDispatch } from 'react-redux';
import RadioBtnThreeGroup from '../common/radioBtnThreeGroup';
import { postDelete } from '../../store/thunkAction/postDelete';

const HideAnnouncements = ({ close, id }) => {
  const [param, setParam] = useState('');
  const [btnDis, setBtnDis] = useState(true);
  const dispatch = useDispatch();

  const parseStatus = {
    'Не актуально': 1,
    Сдано: 2,
    Завершено: 3,
  };

  const handleClick = (value) => {
    if (param) {
      dispatch(postDelete(id, parseStatus[param]));
      close();
    }
  };

  const handleChange = (value) => {
    setParam(value);
    setBtnDis(false);
  };

  return (
    <div className="hideAnnoucements">
      <div className="hideAnnoucements_question_section">
        <div className="hiddeAnnoucements_title">Почему вы хотите скрыть этот запрос?</div>
        <div>
          <RadioBtnThreeGroup
            title1="Не актуально"
            title2="Сдано"
            title3="Завершено"
            onClick={handleChange}
          />
        </div>
        <div />
        <div />
      </div>
      <div className="hienAnnoucements_footer">
        <button
          type="button"
          className="hienAnnoucements_footer_btn"
          onClick={handleClick}
          disabled={btnDis}
        >
          Далее
        </button>
      </div>
    </div>
  );
};

export default HideAnnouncements;
