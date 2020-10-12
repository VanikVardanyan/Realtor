import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import './style.scss';
import '../fontawesomicons';
import smallPeron from '../../assect/image/smallperson.png';
import arrowTop from '../../assect/image/arrow_top.png';
import arrowBottom from '../../assect/image/arrow_bottom.png';
import AdminNotificationViewed from '../agentCommon';
import AdminNotificationHistory from '../agentCommon/adminHistoryNotification';

const SortList = ({
  phone, fio, min, max, childs, district, pets, id, creationDate,
  active, rooms, citizenship, clientStatus, arrivalDate, organization,
  people, renovation, comment, fioAuthor,
}) => {
  const [toggle, setToggle] = useState(false);
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

  // const newNumberByPost = parseClientNumber(`${clientNumberByPost}`);
  return (
    <div className="sortList" key={id}>
      <div className="sortList_header">
        <div className="sortList_date">
          {toISODate(creationDate)}
        </div>
        <div className="sortList_header_iconName">
          {`Автор - ${fioAuthor}`}
          <img src={smallPeron} alt="person" className="sortList_header_icon" />
          <span />
        </div>
      </div>
      <div className="sortList_body">
        <div className="sortList_icons">
          <AdminNotificationViewed id={id} />
          <AdminNotificationHistory id={id} />
        </div>
        <div className="sortList_content">
          <div className="sortList_body_row sortListbottomRow">
            <div className="sortList_col">
              <div className="sortList_col_title">Район</div>
              <div className="sortList_col_item">
                <div>{districtParse.length ? districtParse : '-'}</div>
              </div>
            </div>
            <div className="sortList_col">
              <div className="sortList_col_title">Гражданство</div>
              <div className="sortList_col_item">
                <div>{citizenshipParse(citizenship)}</div>
              </div>
            </div>
            <div className="sortList_col children_response">
              <div className="sortList_col_title">Дети</div>
              <div className="sortList_col_item">
                <div>
                  {
              childs.length ? childs.length : '-'
              }
                </div>
              </div>
            </div>
            <div className="sortList_col sortList_end_col_top">
              <div className="sortList_col_title_end">
                <span>Расчет</span>
                <span>Наличные</span>
              </div>
              <div className="sortList_col_item">
                <div>
                  {min}
                  {' '}
                  -
                  {' '}
                  {max}
                </div>
              </div>
            </div>
          </div>
          <div className="sortList_body_row ">
            <div className="sortList_col">
              <div className="sortList_col_title">Кол-во комнат</div>
              <div className="sortList_col_item">
                <div>{rooms || 1}</div>
              </div>
            </div>
            <div className="sortList_col family_status_responce">
              <div className="sortList_col_title">Статус семьм</div>
              <div className="sortList_col_item">
                <div>{clientStatusParse(clientStatus)}</div>
              </div>
            </div>
            <div className="sortList_col">
              <div className="sortList_col_title">Животные</div>
              <div className="sortList_col_item">
                <div>{pets.length ? pets.length : 'нет'}</div>
              </div>
            </div>
            <div className="sortList_col sortList_end_col">
              <div className="sortList_col_title">
                Дата заселения
              </div>
              <div className="sortList_col_item">
                <div>{toISODateArivalDate(arrivalDate)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sortList_footer">
        <button
          type="button"
          className="sortList_arrowTop_btn"
          style={{ borderBottom: toggle ? 'block' : 'none' }}
          onClick={() => setToggle(!toggle)}
        >
          <img src={arrowTop} alt="arrowTop" />
        </button>
      </div>
      <div style={{ display: toggle ? 'block' : 'none' }}>
        <div className="sortListOpen">
          <div className="sortListOpen_section">
            <div className="sortListOpen_items">
              <div className="sortListOpen_row">
                <div className="sortListOpen_col">
                  <div className="sortListOPen_title">Имя</div>
                  <div className="sortListOpen_col_item">{fio}</div>
                </div>
                <div className="sortListOpen_col">
                  <div className="sortListOPen_title">Кол-во человек</div>
                  <div className="sortListOpen_col_item">{people}</div>
                </div>
                <div className="sortListOpen_col">
                  <div className="sortListOPen_title">Ремонт</div>
                  <div className="sortListOpen_col_item">{renovationParse(renovation)}</div>
                </div>
              </div>
              <div className="sortListOpen_row">
                <div className="sortListOpen_col">
                  <div className="sortListOPen_title">Телефон</div>
                  {phone ? parseClientNumber(phone) : ''}
                  {/* <div className="sortListOpen_col_item">{parseClientNumber(phone)}</div> */}
                </div>
                <div className="sortListOpen_col">
                  <div className="sortListOPen_title">Дети</div>
                  <ul>{chidsAgeParse.length ? chidsAgeParse.map((elem) => <li key={nanoid()}>{elem}</li>) : '-'}</ul>
                </div>
                <div className="sortListOpen_col">
                  <div className="sortListOPen_title">Животные</div>
                  <ul>
                    {petsParse.length ? petsParse.map((elem) => (
                      <li key={nanoid()}>{elem}</li>)) : '-'}
                  </ul>
                </div>
              </div>
              <div className="sortListOpen_row">
                <div className="sortListOpen_col">
                  <div className="sortListOPen_title">Организация</div>
                  <div className="sortListOpen_col_item">{organization || 'нет'}</div>
                </div>
              </div>
            </div>
            <div className="sortListOpen_coment">
              <div className="sortListOPen_title">Комментарий</div>
              <div className="sortListOpen_coment_block">
                {comment.length ? comment : 'нет комментариев.'}
              </div>
            </div>
          </div>
        </div>

      </div>
      <button
        onClick={() => setToggle(!toggle)}
        type="button"
        className="sortList_arrowTop_btn"
        style={{ borderTop: toggle ? 'block' : 'none' }}
      >
        <img src={arrowBottom} alt="arrowBottom" />
      </button>
    </div>
  );
};

export default SortList;
