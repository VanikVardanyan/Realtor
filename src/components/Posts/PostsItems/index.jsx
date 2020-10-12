import React, { useState, useCallback, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import smallPersonIcon from '../../../assect/image/smallperson.png';
import starYUellowIcon from '../../../assect/image/star_icon.svg';
import starYUellowIconHover from '../../../assect/image/hoverImage/favoritHover.svg';
import eyesIcons from '../../../assect/image/eyesIcons.svg';
import hideIcon from '../../../assect/image/hideIcon.svg';
import arrow_bottom from '../../../assect/image/arrow_bottom.png';
import arrow_top from '../../../assect/image/arrow_top.png';
import { getClientNumber } from '../../../store/thunkAction/getClientNumber';
import { addFavoritList } from '../../../store/thunkAction/addFavoritList';
import { getFavoritListId } from '../../../store/thunkAction/getFavoritList';
import { unFolowFavorit } from '../../../store/thunkAction/unFolowFavorit';
import SimpleModal from '../../common/modal';
import NotificationModal from '../../common/notificationModal/notificationModal';
import { getClientNumberAuthor } from '../../../store/selector/getIdClientNumber';
import { getUserFioId } from '../../../store/selector/getUserFioId';
import { getPhoneLoadnigCheck } from '../../../store/selector/getPhoneLoadnigCheck';
import PhoneLoader from '../../common/phoneLoader';
import { getUserFio } from '../../../store/thunkAction/getUserFio';

const PostItem = (
  {
    phone, fio, min, max, childs, district, pets, id, creationDate,
    active, rooms, citizenship, clientStatus, arrivalDate, organization,
    people, renovation, comment, fioAuthor, isFavorite,
  },
) => {
  const [tog, setTog] = useState(false);
  const [numTog, setNumTog] = useState(false);
  const [loadNum, setLoadNum] = useState(false);
  const [isFavoritCheck, setFavoritCheck] = useState(isFavorite)
  const dispatch = useDispatch();
  const clientNumberByPost = useSelector(getClientNumberAuthor);
  const userFioId = useSelector(getUserFioId);
  const history = useHistory();
  const handleClickFromCreatRequest = () => {
    history.push({
      pathname: '/heraderTopRequest',
      state: {
        detail: parseClientNumber(phone), clientPhone: phone, name: fio, saleBefor: max,
      },
    });
  };

  useEffect(() => {
    if (!userFioId.fio) {
      dispatch(getUserFio())
    }
  }, []);
  const fioGlobal = userFioId.fio;
  
  const handleClickSaveFavoritId = () => {
    if (!isFavoritCheck) {
      dispatch(addFavoritList(id));
      setFavoritCheck(true)
    } else {
      dispatch(unFolowFavorit(id));
      setFavoritCheck(false)

    }
  };

  const handleTog = useCallback((id) => {
    setTog(!tog);
    dispatch(getClientNumber(id));
  }, [tog]);

  const handleClickNumber = (id) => {
    setTimeout(() => {
      setNumTog(true);
    }, 1000);
    setLoadNum(true);
  };

  const chidsAgeParse = childs.map((val) => {
    if (val.age === 0) {
      return ` 0 - 3 (${val.count})`;
    } if (val.age === 1) {
      return ` 4 - 5 (${val.count}) `;
    } if (val.age === 2) {
      return `  6 - 9 (${val.count})`;
    } if (val.age === 3) {
      return ` 10+ (${val.count})`;
    }
  });

  const districtParse = district.map((val) => {
    if (val === 0) {
      return 'Ал-ка ';
    } if (val === 1) {
      return 'БВ ';
    } if (val === 2) {
      return 'ЧР ';
    } if (val === 3) {
      return 'ИЧ ';
    } if (val === 4) {
      return 'ЛБ ';
    }
  }, '');

  const renovationParse = (param) => {
    if (param === 0) {
      return 'Не важно';
    } if (param === 1) {
      return 'Косметический';
    } if (param === 2) {
      return 'Евро';
    }
  };

  const citizenshipParse = (param) => {
    if (param === 0) {
      return 'РФ';
    } if (param === 1) {
      return 'Другое';
    }
  };

  const clientStatusParse = (param) => {
    if (param === 0) {
      return 'Одиночка';
    } if (param === 1) {
      return 'Семья';
    } if (param === 2) {
      return 'Рабочий';
    } if (param === 3) {
      return 'ИТР';
    }
  };

  const petsParse = pets.map((param) => {
    if (param.type === 0) {
      return ` Другое (${param.count})`;
    } if (param.type === 1) {
      return ` Кошка (${param.count})`;
    } if (param.type === 2) {
      return ` Собака (${param.count})`;
    }
  }, '');

  const toISODate = (milliseconds) => {
    const date = new Date(milliseconds);
    const y = date.getFullYear();
    let m = date.getMonth() + 1;
    let d = date.getDate();
    m = (m < 10) ? `0${m}` : m;
    d = (d < 10) ? `0${d}` : d;
    return [y, m, d].join('.');
  };

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

  const parseClientNumber = (num) => {
    const oneNum = num.slice(0, 3);
    const thoNum = num.slice(3, 6);
    const threeNum = num.slice(6, 8);
    const fourNum = num.slice(8, 10);
    const newNum = `+7(${oneNum}) ${thoNum}-${threeNum}-${fourNum}`;
    return newNum;
  };
  
  const newNumberByPost = parseClientNumber(`${clientNumberByPost}`);
  return (
    <div
      className="myPosts"
      key={id}
      style={{
        border: fioAuthor === fioGlobal ? '2px solid #BCDB9A' : '2px solid #6CC3C7',
        maxWidth: '1250px',
      }}
    >
      <div
        className="myPosts_header"
        style={{
          backgroundColor: fioAuthor === fioGlobal ? '#BCDB9A' : '#6CC3C7',
        }}
      >
        <div>
          {' '}
          {toISODate(creationDate)}
          {' '}
        </div>
        <div className="myPosts_header_right">
          {fioAuthor === fioGlobal ? '' : 'Автор-'}

          {fioAuthor === fioGlobal ? 'Мои объявления' : fioAuthor}
          <img src={smallPersonIcon} alt="person" className="myPosts_header_icons" />
        </div>
      </div>
      <div
        className="myPosts_body"
        style={{
          borderBottom: fioAuthor === fioGlobal ? '2px solid #BCDB9A' : '2px solid #6CC3C7',
        }}
      >
        <div
          className="myPosts_body_icons"
          style={{ justifyContent: fioAuthor === fioGlobal ? 'space-between' : 'space-evenly' }}
        >

          <button
            type="button"
            className="button_img_hover_favorit"
            onClick={() => handleClickSaveFavoritId(active)}
            style={{ backgroundImage: isFavoritCheck ? `url(${starYUellowIconHover})` : `url(${starYUellowIcon})` }}
          />

          <div
            style={{ display: fioAuthor === fioGlobal ? 'block' : 'none' }}
          >
            <NotificationModal
              icon={eyesIcons}
              id={id}
            />
          </div>
          <SimpleModal
            icon={hideIcon}
            id={id}
          />
        </div>
        <div className="myPosts_body_col">
          <div>
            <div className="myPosts_body_col_title">Район</div>
            <div>
              {' '}
              <div>{districtParse.length ? districtParse : '-'}</div>
            </div>
          </div>
          <div className="myPosts_body_col_bottom">
            <div className="myPosts_body_col_title">Кол-во комнат</div>
            <div>{rooms || 1}</div>
          </div>
        </div>
        <div className="myPosts_body_col">
          <div>
            <div className="myPosts_body_col_title">Гражданство</div>
            <div>{citizenshipParse(citizenship)}</div>
          </div>
          <div className="myPosts_body_col_bottom">
            <div className="myPosts_body_col_title">Статус семьм</div>
            <div>{clientStatusParse(clientStatus)}</div>
          </div>
        </div>
        <div className="myPosts_body_col">
          <div>
            <div className="myPosts_body_col_title">Дети</div>
            <div>
              {
              childs.length ? childs.length : '-'
              }
            </div>
          </div>
          <div className="myPosts_body_col_bottom">
            <div className="myPosts_body_col_title">Животные</div>
            <div>{pets.length ? pets.length : 'нет'}</div>
          </div>
        </div>
        <div className="myPosts_body_col">
          <div>
            <div className="myPosts_body_col_title">
              <span>Расчет</span>
              {' '}
              <span className="text_color">Наличные</span>
            </div>
            <div className="text_center">
              {min}
              {' '}
              -
              {' '}
              {max}
            </div>
          </div>
          <div className="myPosts_body_col_bottom">
            <div className="myPosts_body_col_title">Дата заселения</div>
            <div className="text_center">{toISODateArivalDate(arrivalDate)}</div>
          </div>
        </div>
      </div>
      <div className="myPosts_footer" style={{ borderBottom: tog ? fioAuthor === fioGlobal ? '2px solid #BCDB9A' : 'black' : 'none' }}>
        <button
          type="button"
          className="myPosts_footer_toggle_up"
          onClick={() => handleTog(id)}
          style={{
            backgroundColor: fioAuthor === fioGlobal ? '' : '#b9e4e6',
          }}
        >
          {' '}
          <img src={arrow_top} alt="arrow_top" />
          {' '}
        </button>
        <div />
      </div>
      <div className="myPosts_data" style={{ display: tog ? 'flex' : 'none' }}>
        <div className="myPosts_body_icons">
          <button
            type="button"
            className="button_img_hover_pen"
            style={{ display: fioAuthor === fioGlobal ? 'block' : 'none' }}
            onClick={handleClickFromCreatRequest}
          />
        </div>
        <div className="myPosts_body_col">
          <div>
            <div className="myPosts_body_col_title">Имя</div>
            <div>{fio}</div>
          </div>
          <div className="myPosts_body_col_bottom">
            <div className="myPosts_body_col_title">Телефон</div>
            <div />
            {fioAuthor === fioGlobal ? parseClientNumber(phone)
              : (
                <div className="number_btn_section">
                  <button
                    className="clientsForNumber_btn"
                    type="button"
                    onClick={
                          () => { handleClickNumber(id); }
                        }
                    style={{ display: numTog ? 'none' : 'block' }}
                  >
                    {loadNum ? <PhoneLoader /> : 'Показать'}
                  </button>
                  <div style={{ display: !numTog ? 'none' : 'block' }}>
                    { newNumberByPost}
                  </div>
                </div>
              )}

          </div>
          <div className="myPosts_body_col_bottom">
            <div className="myPosts_body_col_title">Организация</div>
            <div>{organization || 'нет'}</div>
          </div>
        </div>
        <div className="myPosts_body_col">
          <div>
            <div className="myPosts_body_col_title">Кол-во человек</div>
            <div>{people}</div>
          </div>
          <div className="myPosts_body_col_bottom">
            <div className="myPosts_body_col_title">Дети</div>
            <ul>{chidsAgeParse.length ? chidsAgeParse.map((elem) => <li key={nanoid()}>{elem}</li>) : '-'}</ul>
          </div>
        </div>
        <div className="myPosts_body_col">
          <div>
            <div className="myPosts_body_col_title">Ремонт</div>
            <div>
              {renovationParse(renovation)}
            </div>
          </div>
          <div className="myPosts_body_col_bottom">
            <div className="myPosts_body_col_title">Животные</div>
            <ul>
              {petsParse.length ? petsParse.map((elem) => (
                <li key={nanoid()}>{elem}</li>)) : '-'}
            </ul>
          </div>
        </div>
        <div className="myPosts_body_col my_posts_body_coment">

          <div className="myPosts_body_col_title">Комментарий</div>
          <div
            className="myPosts_body_coment_container"
            style={{ overflowY: comment.length ? 'scroll' : 'none', textAlign: comment.length ? 'left' : 'center' }}
          >
            {comment.length ? comment : 'нет комментариев.'}
          </div>
        </div>
      </div>
      <div
        className="myPosts_footer"
        style={{ borderTop: tog ? fioAuthor === fioGlobal ? '2px solid #BCDB9A' : 'black' : 'none' }}
      >
        <button
          type="button"
          className="myPosts_footer_toggle_down"
          style={{
            backgroundColor: fioAuthor === fioGlobal ? '' : '#b9e4e6',
          }}
          onClick={() => handleTog(id)}
        >
          <img src={arrow_bottom} alt="arrow_bottom" />
        </button>
      </div>
    </div>

  );
};

export default PostItem;
