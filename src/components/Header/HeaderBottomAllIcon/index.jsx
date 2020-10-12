import React, { useEffect, useState } from 'react';
import './style.scss';

import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import bellIcon from '../../../assect/image/bell_icon.svg';
import personIcon from '../../../assect/image/person_icon.svg';
import starIcon from '../../../assect/image/star_icon.svg';
import MyPosts from '../../Posts/MyPosts';
import { getUserData } from '../../../store/selector/getUserData';
import { filterSortByDateAdded } from '../../../store/thunkAction/filterApartaments';
import { getFileredOfferData } from '../../../store/selector/getFileredOfferData';
import SortBy from './SortBy';
import SearchFilter from '../../searchFilter';

const HeaderBottomAllicon = () => {
  const [tog, setToggle] = useState(false);
  const userFio = useSelector(getUserData);
  const dispatch = useDispatch();
  const filterApartaments = useSelector(getFileredOfferData);
  const history = useHistory();
  useEffect(() => {
    const sortByDateAdded = {
      page: 0,
      sortfield: 'creationDate',
      sortDirection: 'DESC',
    };
    dispatch(filterSortByDateAdded(sortByDateAdded));
  }, []);
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
      <div className="container header">
        <div className="header__row">
          <div className="header__title__left">
            <div className="header__title__left-top">Единая База</div>
            <div className="header__title__left-bottom">Аренды Недвижимости</div>
          </div>
          <div className="header__title__right">
            <div className="header__title__right-content">
              <div>«Ассоль»</div>
              <div>{userFio.fio}</div>
            </div>
            <div className="header__title__right-link">
              <button type="button" onClick={handleOut} className="handleOutBtn">Выход</button>
            </div>
          </div>
        </div>
        <div className="header__row response_header_row_change">
          <div className="header__event__left-block">
            <button
              type="button"
              className="left-btn-blue"
            >
              Добавить агента
            </button>
            <button type="button" className="left-btn-trs">База агентов</button>
          </div>
          <div className="header__event__right-block_icons">
            <div className="header_icons_block">
              <div className="header__event__Iperson ">
                <button type="button" className="header_bellIcon_btn">
                  <img src={bellIcon} alt="person" className="hover_gold" />
                </button>
              </div>
              <div className="header__event__Iperson ">
                <button type="button" className="header_bellIcon_btn ">
                  <img src={personIcon} alt="person" className="hover_aqua" />
                </button>
              </div>
              <div className="header__event__Iperson">
                <button type="button" className="header_bellIcon_btn">
                  <img src={starIcon} alt="person" className="hover_black" />
                </button>
              </div>
            </div>
            <button
              type="button"
              className="headre_filter_btn"
              onClick={() => setToggle(!tog)}
            >
              Фильтр
            </button>
          </div>
        </div>
      </div>
      <div style={{ display: tog ? 'block' : 'none' }}>
        <SearchFilter />
      </div>
      <SortBy />

      {
        filterApartaments.map((elem) => (
          <MyPosts key={elem.id} fio={elem.client.fio} quantityPeople={elem.people} comment={elem.comment} quantityRoom={elem.flat.rooms} district={elem.district} />))
      }
    </>
  );
};

export default HeaderBottomAllicon;
