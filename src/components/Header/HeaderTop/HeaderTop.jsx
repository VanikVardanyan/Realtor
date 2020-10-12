import React, { useEffect } from 'react';
import './style.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getUserFioId } from '../../../store/selector/getUserFioId';
import { getUserFio } from '../../../store/thunkAction/getUserFio';
// window.location.reload(true)
const HeaderTop = (props) => {
  const dispatch = useDispatch();
  const userFioId = useSelector(getUserFioId);
  const fioLocal = userFioId.fio;
  const history = useHistory();
  useEffect(() => {
    if (!userFioId.length) {
      dispatch(getUserFio());
    }
  }, []);
  const handleToHome = () => {
    history.push('/personalposts');
  };

  const handleOut = () => {
    const OutAction = new Promise((res) => {
      setTimeout(() => {
        localStorage.removeItem('token');
        res();
      }, 1000);
    });
    OutAction
      .then(() => history.push('/'));
  };
  return (
    <>
      <div className="header_top">
        <div className="header_top_left" onClick={handleToHome}>
          <div className="header_top_left_title_top">Единая База</div>
          <div className="header_top_left_title_bottom">Аренды Недвижимости</div>
        </div>
        <div className="header_top_right">
          <div className="header_top_right_box_left">
            <div className="header_top_right_box_left-name-family">
              {fioLocal}
            </div>
            <div className="header_top_right_box_left-name-family-patronymic" />
          </div>
          <div className="header_top_right_box_right">
            <div className="style__underline">
              {' '}
              <button type="button" onClick={handleOut} className="handleOutBtn">Выход</button>
              {' '}
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default HeaderTop;
