import React, { useState } from 'react';
import './style.scss';

import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import bellIcon from '../../../assect/image/bell_icon.svg';
import bellIconActive from '../../../assect/image/hoverImage/notificationHover.svg';

import SortBy from '../HeaderBottomAllIcon/SortBy';
import ArchiveFilterAdmin from '../../archiveFilterAdmin';
import { cleaerState } from '../../../store/action';
import { getUserFioId } from '../../../store/selector/getUserFioId';
import haveNotification from '../../../assect/image/haveNotification.png';
import { getAllNotification } from '../../../store/thunkAction/getAllNotification';
import { getFullNotification } from '../../../store/selector/getFullNotification';

const HeaderBottom = (props, sortBulian) => {
  const [togSortBy, settogSortBy] = useState(true);
  const [filterTog, setFilterTog] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const userFioId = useSelector(getUserFioId);
  const fullNotification = useSelector(getFullNotification);
  const handleClicBaseList = () => {
    history.push('./agentBaseList');
    settogSortBy(false);
    dispatch(getAllNotification());
  };
  const handleClickToApartamentsPage = () => {
    history.push('/apartamentsList');
    dispatch(getAllNotification());
  };

  const handleClickToHome = () => {
    if (props.location.pathname !== '/adminpage') {
      dispatch(cleaerState());
      dispatch(getAllNotification());
      history.push('/adminpage');
    }
  };

  const handleClickToAddAgent = () => {
    history.push('/headertopaddagent');
    dispatch(getAllNotification());
  };

  const handleClickToNotification = () => {
    history.push('/queryActions');
    dispatch(getAllNotification());
  };

  const handleClickToFilter = () => {
    setFilterTog(!filterTog);
    dispatch(getAllNotification());
  };

  const fioLocal = userFioId.fio;
  
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
          <button
            className="header__title__left"
            onClick={handleClickToHome}
          >
            <div className="header__title__left-top">Единая База</div>
            <div className="header__title__left-bottom">Аренды Недвижимости</div>
          </button>
          <div className="admin_header__title__right">
            <div className="header__title__right-content_admin">
              {fioLocal}
            </div>
            <div className="header__title__right-link">
              <span className="header__title__right-link-cover">
                <button type="button" onClick={handleOut} className="handleOutBtn">Выход</button>
              </span>
            </div>
          </div>
        </div>
        <div className="header__row admin_row">
          <div className="admin_header__event__left-block">
            <button
              type="button"
              className="left-btn-blue response_sm"
              onClick={handleClickToAddAgent}
            >
              Добавить агента
            </button>
            <div className="baseListBtnGroup">
              <button
                type="button"
                className="left-btn-trs"
                onClick={handleClicBaseList}
              >
                База агентов
              </button>
              <button
                type="button"
                className="left-btn-trs_aprtament"
                onClick={handleClickToApartamentsPage}
              >
                База квартир
              </button>
            </div>
          </div>
          <div className="header__event__right-block_admin">
            <div className="header__event__Iperson">
              <button
                type="button"
                className={fullNotification.length ? 'header_bellIcon_btnActive' : 'header_bellIcon_btn responce_bell_icon_sm'}
                onClick={handleClickToNotification}
              >
                {
                  fullNotification.length ? <img src={haveNotification} alt="sss" /> : <img src={props.location.pathname === '/notificationRequest' ? bellIconActive : bellIcon} alt="person" className="hover_gold" />
                }
              </button>
            </div>
            <button
              type="button"
              className="filter_btn_blue_admin"
              onClick={handleClickToFilter}
            >
              Фильтр
            </button>
          </div>
        </div>
      </div>
      <div style={{ display: filterTog ? 'block' : 'none' }}>
        <ArchiveFilterAdmin />
      </div>
      <div style={{ display: props.location.pathname === '/adminpage' ? 'block' : 'none' }}>
        <SortBy />
      </div>
    </>

  );
};
export default HeaderBottom;
