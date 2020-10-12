/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect } from 'react';
import './style.scss';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import bellIcon from '../../../assect/image/bell_icon.svg';
import personIcon from '../../../assect/image/person_icon.svg';
import ellipseNotification from '../../../assect/image/ellipse_notification.svg';

import notificationHover from '../../../assect/image/hoverImage/notificationHover.svg';
import SearchFilter from '../../searchFilter';
import { getFavoritList } from '../../../store/thunkAction/getFavoritList';
import { saveAddRequestTel, cleaerState, cleaerStateFavorit } from '../../../store/action';
import { getPostsByNumber } from '../../../store/thunkAction/getPostsByNumber';
import { getUserFioId } from '../../../store/selector/getUserFioId';
import { infoAboutNotification } from '../../../store/thunkAction/infoAboutNotification';
import { getInfoAboutNotification } from '../../../store/selector/getInfoAboutNotification';

const HeaderAddButton = (props) => {
  const [tog, setToggle] = useState(false);
  const [numberTel, setNumber] = useState('');
  const [numberAddApartaments, setNumberAddApartaments] = useState('');
  const [addRequestDis, setAddRequestDis] = useState(true);
  const [addRequestDisAddApartaments, setAddRequestDisAddApartaments] = useState(true);
  const dispatch = useDispatch();
  const userFioId = useSelector(getUserFioId);
  const infoNotification = useSelector(getInfoAboutNotification);

  const fioLocal = userFioId.fio;

  const handleSetNumberValue = (val, force) => {
    let value = val;
    const regExp = /^[+][7][\s][(]{0,1}[0-9]{0,3}[)]{0,1}[\s]{0,1}[0-9]{0,3}[-]{0,1}[0-9]{0,2}[-]{0,1}[0-9]{0,2}$/g;

    const test = regExp.test(value);

    if (val.length > numberTel.length) {
      if (value.length === 4) value = `${value.slice(0, value.length - 1)}(${value[value.length - 1]}`;
      if (value.length === 7) value += ') ';
      if (value.length === 12 || value.length === 15) value += '-';
    } else {
      if (value.length === 8) value = value.slice(0, -2);
      if (value.length === 12 || value.length === 15) value = value.slice(0, -1);
    }

    if (test && value.length > 3 || force) setNumber(value);

    let numEl = '';
    for (const index in value) {
      if (parseInt(value[index])) {
        numEl += value[index];
      }
    }

    const newNumber = numEl.slice(1);
    if (newNumber.length === 10) {
      dispatch(getPostsByNumber(newNumber));
    }
  };

  const handleSetNumberValueAddAppartaments = (val, force) => {
    let value = val;
    const regExp = /^[+][7][\s][(]{0,1}[0-9]{0,3}[)]{0,1}[\s]{0,1}[0-9]{0,3}[-]{0,1}[0-9]{0,2}[-]{0,1}[0-9]{0,2}$/g;

    const test = regExp.test(value);

    if (val.length > numberAddApartaments.length) {
      if (value.length === 4) value = `${value.slice(0, value.length - 1)}(${value[value.length - 1]}`;
      if (value.length === 7) value += ') ';
      if (value.length === 12 || value.length === 15) value += '-';
    } else {
      if (value.length === 8) value = value.slice(0, -2);
      if (value.length === 12 || value.length === 15) value = value.slice(0, -1);
    }

    if (test && value.length > 3 || force) setNumberAddApartaments(value);

    let numEl = '';
    for (const index in value) {
      if (parseInt(value[index])) {
        numEl += value[index];
      }
    }

    const newNumber = numEl.slice(1);
    if (newNumber.length === 10) {
      dispatch(getPostsByNumber(newNumber));
    }
  };

  // addApartaments

  const handleChangeNumberAddApartaments = ({ target: { value } }) => {
    if (value.length === 14 && numberAddApartaments.length === 4) {
      handleSetNumberValueAddAppartaments(`+7 (${value.slice(4, 7)}) ${value.slice(7, 10)}-${value.slice(10, 12)}-${value.slice(12, 14)}`, true);
      return;
    }
    handleSetNumberValueAddAppartaments(value);
    if (value.length === 18) {
      setAddRequestDisAddApartaments(false);
    } else { setAddRequestDisAddApartaments(true); }
  };

  // addApartaments

  const handleChangeNumber = ({ target: { value } }) => {
    if (value.length === 14 && numberTel.length === 4) {
      handleSetNumberValue(`+7 (${value.slice(4, 7)}) ${value.slice(7, 10)}-${value.slice(10, 12)}-${value.slice(12, 14)}`, true);
      return;
    }
    handleSetNumberValue(value);
    if (value.length === 18) {
      setAddRequestDis(false);
    } else { setAddRequestDis(true); }
  };

  useEffect(() => {
    if (props.location.pathname === '/favorites') {
      dispatch(getFavoritList());
      dispatch(infoAboutNotification());
    }
  }, [props.location.pathname]);

  const handleClickGetFavorits = (e) => {
    dispatch(cleaerState());
    // e.preventDefault();
    props.history.push({ pathname: '/favorites' });
  };

  const HandlePersonPage = () => {
    dispatch(cleaerStateFavorit());
    dispatch(cleaerState());
    props.history.push('/MyPosts');
    dispatch(infoAboutNotification());
  };

  const handleFocus = () => {
    if (!numberTel) handleSetNumberValue('+7 ', true);
  };

  const handleBlur = () => {
    if (numberTel.length === 3 || numberTel.length === 4) handleSetNumberValue('', true);
  };

  const handleFocusAddApartaments = () => {
    if (!numberAddApartaments) handleSetNumberValueAddAppartaments('+7 ', true);
  };

  const handleBlurAddApartaments = () => {
    if (numberAddApartaments.length === 3 || numberAddApartaments.length === 4) handleSetNumberValueAddAppartaments('', true);
  };

  const handleclickToHome = () => {
    // window.location.reload();
    if (props.location.pathname !== '/personalposts') {
      props.history.push('/personalposts');
      dispatch(cleaerState());
    }
  };

  const handleOut = () => {
    const OutAction = new Promise((res) => {
      setTimeout(() => {
        localStorage.removeItem('token');
        res();
      }, 1000);
    });
    OutAction
      .then(() => props.history.push('/'));
  };

  return (
    <>
      <div className="container header">
        <div className="header__row">
          <div
            className="header__title__left"
            onClick={handleclickToHome}
          >
            <div className="header__title__left-top">Единая База</div>
            <div className="header__title__left-bottom">Аренды Недвижимости</div>
          </div>
          <div className="header__title__right">
            <div className="header__title__right-content">
              <div>«Ассоль»</div>
              <div>{fioLocal}</div>
            </div>
            <div className="header__title__right-link">
              <span className="header__title__right-link-cover">
                <button type="button" onClick={handleOut} className="handleOutBtn">Выход</button>
              </span>
            </div>
          </div>
        </div>
        <div className="header__row response_header_row_change all_button_header_responce">
          <div className="header__event__left-block">
            <button
              type="button"
              className="left-btn-blue"
              disabled={addRequestDis}
              style={{ opacity: addRequestDis ? '0.6' : '1' }}
              onClick={(e) => {
                props.history.push('/heraderTopRequest');
                dispatch(saveAddRequestTel(numberTel));
              }}
            >
              Добавить запрос
            </button>
            <input
              type="text"
              placeholder="Введите телефон"
              maxLength="18"
              className="addNumberPerson_id"
              onChange={handleChangeNumber}
              value={numberTel}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
          <div className="header__event__right-block_icons_full">
            <div className="header__event__right-block_icons_left">
              <button
                type="button"
                className="header__event__right-block_icons_left_add_room"
                disabled={addRequestDisAddApartaments}
                style={{ opacity: addRequestDisAddApartaments ? '0.6' : '1' }}
                onClick={(e) => {
                  props.history.push('/addFloatForm');
                  dispatch(saveAddRequestTel(numberAddApartaments));
                }}
              >
                Добавить квартиру
              </button>
              <input
                type="text"
                placeholder="Введите телефон"
                maxLength="18"
                className="addNumberPerson_id"
                onChange={handleChangeNumberAddApartaments}
                value={numberAddApartaments}
                onFocus={handleFocusAddApartaments}
                onBlur={handleBlurAddApartaments}
              />
            </div>
            <div className="header__event__right-block_icons_right">
              <div className="header_icons_block">
                <div className="header__event__Iperson notificationAlipseRelative">
                  <button
                    type="button"
                    className={infoNotification ? 'haveNotification' : 'activeNotification'}
                    style={{ backgroundImage: props.location.pathname === '/notification' ? `url(${notificationHover})` : `url(${bellIcon})` }}
                    onClick={() => {
                      props.history.push('/notification');
                      dispatch(cleaerState());
                    }}
                    disabled={props.location.pathname === '/notification'}
                  />
                  {infoNotification ? (
                    <div className="notificationAllips">
                      {' '}
                      <img src={ellipseNotification} alt="ellipse" />
                      {' '}
                    </div>
                  ) : ''}
                </div>
                <div className="header__event__Iperson ">
                  <button
                    type="button"
                    className={props.location.pathname.toLowerCase() === '/myposts' ? 'activeHeaderPerson' : 'header_person_btn'}
                    onClick={HandlePersonPage}
                    disabled={props.location.pathname.toLowerCase() === '/myposts'}

                  >
                    <img src={personIcon} alt="person" className="hover_aqua" />
                  </button>
                </div>
                <div className="header__event__Iperson ">
                  <button
                    type="button"
                    className={props.location.pathname.toLowerCase() === '/favorites' ? 'activeHeader_favorit_btn' : 'header_favorit_btn'}
                    onClick={handleClickGetFavorits}
                    disabled={props.location.pathname.toLowerCase() === '/favorites'}
                  />
                </div>
              </div>
              <button
                type="button"
                className="header__event__right-block_icons_full_filt_btn"
                onClick={() => setToggle(!tog)}
              >
                Фильтр
              </button>
            </div>
          </div>
        </div>
      </div>

      {
        tog
          ? (
            <div>
              <SearchFilter clearProp={handleclickToHome} />
            </div>
          ) : null
      }
    </>
  );
};

export default HeaderAddButton;
