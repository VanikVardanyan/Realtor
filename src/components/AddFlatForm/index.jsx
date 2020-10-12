/* eslint-disable no-shadow */
/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import './style.scss';
import { Link, useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import closeX from '../../assect/image/closeX.png';
import InputElement from '../common/inputElement';
import DropDown from '../common/dropdown';
import CalendarForm from '../Calendar';
import HeaderTop from '../Header/HeaderTop/HeaderTop';
import { getUserFioId } from '../../store/selector/getUserFioId';
import { addApartaments } from '../../store/thunkAction/addApartaments/addApartaments';

const AddFloatForm = () => {
  const [nameVal, setName] = useState('');
  const [priceSale, setPriceSale] = useState('');
  const [quantityRoom, setQuantityRom] = useState();
  const [ratingRoom, setRatingRoom] = useState(1);
  const [street, setStreet] = useState('');
  const [numberHome, setNumberHome] = useState('');
  const [numberRoom, setNumberRoom] = useState('');
  const [childrens, setChildrensa] = useState('Да');
  const [foreignersState, setforeignersState] = useState('Да');
  const [commentStatet, setCommentState] = useState('');
  const [roomDate, setRoomDate] = useState(Date.parse(new Date()));
  const [phone, setPhone] = useState([]);
  const [link, setLink] = useState('');
  const [districtVal, setDistrictVal] = useState('Александровка');
  // pic//document
  const [imgSendBack, setImgSendBack] = useState([]);
  const [docSendBack, setdocSendBack] = useState([]);
  // error state
  const [errPrice, setErrPrice] = useState(false);
  const [errDistrict, setErrDistrict] = useState(false);
  const [] = useState(false);
  const [] = useState(false);
  const [nameErr, setNameErr] = useState(false);
  const [allErr, setAllErr] = useState(false);
  // phone error
  // error state
  const dispatch = useDispatch();
  const history = useHistory();
  const handleChangeName = (value) => {
    if (value.length && /[а-я]/i.test(value)) {
      setNameErr(false);
      setName(value);
    } else {
      setNameErr(true);
      setName(value);
    }
  };

  const handleClick = () => {
    if (!phone.length || phone[phone.length - 1].length === 10) {
      setPhone([...phone, '']);
    }
  };

  const handleChangePhone = (e, index) => {
    if (!isNaN(+e.target.value)) {
      phone[index] = e.target.value;
      setPhone([...phone]);
    }
  };

  const handleChangeDocText = (e) => {
    if (docSendBack.length < 3) {
      const { files } = e.target;
      if (files.length) {
        const test = files[0];
        setdocSendBack((prevState) => [...prevState, test]);
      }
    }
  };

  const handleChangePicText = (e) => {
    if (imgSendBack.length < 3) {
      const { files } = e.target;
      const validName = files[0].name.slice(-3);
      // eslint-disable-next-line no-constant-condition
      if (validName === 'jpg' || validName === 'png' || validName === 'gif' || validName === 'bmp') {
        const test = files[0];
        setImgSendBack((prevState) => [...prevState, test]);
      }
    }
  };

  const handleDeletNumber = (index) => {
    const newPic = phone.filter((elem, indexis) => indexis !== index);
    setPhone(newPic);
  };
  const handleBlur = () => {
    const newPic = phone.filter((elem) => elem.length === 10);
    setPhone(newPic);
  };

  const handleDeletPic = (index) => {
    const newPic = imgSendBack.filter((elem, indexis) => indexis !== index);
    setImgSendBack(newPic);
  };

  const handleDeletDoc = (index) => {
    const newDoc = docSendBack.filter((elem, indexis) => indexis !== index);
    setdocSendBack(newDoc);
  };

  const handleChangeRoom = (value) => {
    if (!isNaN(+value)) setNumberRoom(value);
  };

  const handleChangeHome = (value) => {
    if (!isNaN(+value)) setNumberHome(value);
  };

  const handleChangePrice = (value) => {
    if (!isNaN(+value)) {
      setPriceSale(value);
    }
    if (value.length) {
      setErrPrice(true);
    } else {
      setErrPrice(false);
    }
  };

  const handleStreet = (value) => {
    setStreet(value);
    if (value.length) {
      setErrDistrict(true);
    } else {
      setErrDistrict(false);
    }
  };

  const handleAddApartaments = () => {
    setAllErr(true);
    const QuantityRoom = {
      Другое: 0,
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      undefined: '',
    };

    const params = {
      name: nameVal,
      price: priceSale,
      roomNumber: `${QuantityRoom[quantityRoom]}` || '1',
      rating: `${QuantityRoom[ratingRoom]}` || '0',
      street: street || '',
      numberHouse: numberHome || '',
      flatNumber: numberRoom || '',
      district: districtVal,
      phones: phone || [''],
      children: childrens === 'Да',
      additional: 'dddd',
      foreigners: foreignersState === 'Да',
      link,
      comment: commentStatet,
      releaseDate: roomDate,
    };
    const userFormData = new FormData();
    userFormData.append('dto', new Blob([JSON.stringify(params)], { type: 'application/json' }));

    imgSendBack.forEach((elem) => (
      userFormData.append('pictures', elem)
    ));

    docSendBack.forEach((elem) => (
      userFormData.append('documents', elem)
    ));
    if (priceSale.length && street.length && numberHome && street && link.length && nameVal.length && districtVal.length) {
      console.log(priceSale.length, street.length, numberHome, street, link.length, name.length, districtVal.length);
      dispatch(addApartaments(userFormData));
      history.push('/personalposts');
    }
  };

  const handleChangeLink = (value) => {
    setLink(value);
  };
  return (
    <>
      <HeaderTop />
      <div className="addFloatForm">
        <div className="addFloatForm_header">
          <div>Добавление квартиры</div>
          <div>
            <button
              type="button"
            >
              <Link to="/myPosts">
                <img src={closeX} alt="close" />
              </Link>
            </button>
          </div>
        </div>
        <div className="addFloatForm_body">
          <div className="addFloatForm_body-row">
            <div className="addFloatForm_body-col">
              <div className="addFloatForm_body-col-title">Имя*</div>
              <InputElement
                w="465px"
                backText="Константин Константинович Константинопольский"
                className="response_full_screen"
                backText="ИФО"
                value={nameVal}
                onChange={(e) => { handleChangeName(e.target.value); }}
                err={allErr && !nameVal || nameErr}
              />
            </div>

            <div className="addFloatForm_body-col">
              <div className="addFloatForm_body-col-title">Цена*</div>
              <InputElement
                typeInp="number"
                w="100px"
                backText="1000"
                className="responce_inp_sm"
                value={priceSale}
                onChange={(e) => { handleChangePrice(e.target.value); }}
                err={allErr && !errPrice}
              />
            </div>
            <div className="addFloatForm_body-col">
              <div className="addFloatForm_body-col-title">Кол-во комнат*</div>
              <DropDown
                w="206px"
                optMenu="1"
                category={[[1], [2], [3], [4], [5], ['Другое']]}
                className="addingApartaments_dropdown_respove_sm"
                onChange={(e) => setQuantityRom(e.target.value)}
                value={quantityRoom}
              />
            </div>
            <div className="addFloatForm_body-col">
              <div className="addFloatForm_body-col-title">Оценка квартиры</div>
              <DropDown
                w="103px"
                optMenu="5"
                category={[[1], [2], [3], [4], [5]]}
                className="addingApartaments_dropdown_respove_sm"
                onChange={(e) => setRatingRoom(e.target.value)}
                value={ratingRoom}
              />
            </div>
          </div>
          <div className="addFloatForm_body-row">
            <div className="addFloatForm_body-col">
              <div className="addFloatForm_body-col-title">Адрес*</div>
              <InputElement
                w="465px"
                backText="Улица"
                className="response_full_screen"
                onChange={(e) => handleStreet(e.target.value)}
                value={street}
                err={allErr && !errDistrict}
              />
            </div>
            <div className="addFloatForm_body-col">
              <div className="addFloatForm_body-col-title" />
              <InputElement
                typeInp="number"
                w="80px"
                backText="Дом"
                className="responce_inp_sm"
                // value={numberHome}
                // onChange={(e) => handleChangeHome(e.target.value)}
                err={allErr && !numberHome.length}
              />
            </div>
            <div className="addFloatForm_body-col">
              <div className="addFloatForm_body-col-title" />
              <InputElement
                typeInp="number"
                w="80px"
                backText="Корп."
                className="responce_inp_sm"
                value={numberHome}
                onChange={(e) => handleChangeHome(e.target.value)}
                err={allErr && !numberHome.length}
              />
            </div>
            <div className="addFloatForm_body-col">
              <div className="addFloatForm_body-col-title" />
              <InputElement
                typeInp="number"
                w="138px"
                backText="Квартира"
                className="responce_inp_sm"
                value={numberRoom}
                onChange={(e) => handleChangeRoom(e.target.value)}
                err={allErr && !numberRoom.length}
              />
            </div>
            <div className="addFloatForm_body-col">
              <div className="addFloatForm_body-col-title">Район</div>
              <DropDown
                w="278px"
                optMenu="Все включено"
                category={['Александровка', 'БВ', 'ЧР', 'ИЧ', 'ЛБ']}
                className="addingApartaments_dropdown_respove_sm"
                onChange={(e) => setDistrictVal(e.target.value)}
                value={districtVal}
              />
            </div>
          </div>
          <div className="addFloatForm_body-row">
            <div className="addFloatForm_body-col addFloatForm_data-col">
              <div className="addFloatForm_body-col-title">Телефон*</div>
              <div className="addFloatForm_body-col addFloatForm_data-col">
                <div className="sectionPhoneNumberAdd">
                  {
                    phone.map((phone, index) => (
                      <div className="phoneSectonAdd">

                        {' '}
                        <div className="addNumberDocMainNumber">
                          <span style={{ display: phone.length ? 'block' : 'none' }}>
                            {phone.length < 4 ? `(${phone})` : `(${phone.slice(0, 3)}) ${phone.slice(3, 6)} - ${phone.slice(6, 8)} - ${phone.slice(8, 10)}`}
                          </span>
                        </div>
                        {' '}
                        <input
                          onChange={(e) => handleChangePhone(e, index)}
                          type="text"
                          className="addNumberDoc"
                          maxLength="10"
                          placeholder=" 954 XXXXXXX"
                          onBlur={handleBlur}
                        />
                        <div className="startnumber__phone__add">+7</div>
                        <button
                          className="startnumber__phone__button"
                          onClick={() => handleDeletNumber(index)}
                        >
                          X
                        </button>
                      </div>
                    ))
                  }
                </div>
                <div className="addFloatForm_AddData-container_number">
                  <button type="button" style={{ border: allErr && !phone.length ? '1px solid red' : 'none' }} className="addFloatForm_data-container_btn-add" onClick={(e) => handleClick(e)}>
                    Добавить
                  </button>
                </div>
              </div>
            </div>
            <div className="addFloatForm_body-col addFloatForm_data-col">
              <div className="addFloatForm_body-col-title">Документы</div>
              {docSendBack.map((elem, index) => (
                <div key={nanoid()} className="documentItems">
                  {' '}
                  <div className="documentItems__content">
                    { elem.name }
                  </div>
                  <button
                    className="imageDelBtn"
                    onClick={() => handleDeletDoc(index)}
                  >
                    X
                  </button>
                </div>
              ))}
              <div className="addFloatForm_AddData-container">
                <input
                  type="file"
                  id="addDoc"
                  onChange={(e) => handleChangeDocText(e)}
                />
                <label
                  htmlFor="addDoc"
                  className="addFloatForm_data-container_btn-add"
                >
                  Добавить
                </label>
              </div>
            </div>
            <div className="addFloatForm_body-col addFloatForm_data-col">
              <div className="addFloatForm_body-col-title">Фотографии</div>
              {imgSendBack.map((elem, index) => (
                <div key={nanoid()} className="documentItems">
                  {' '}
                  <div className="documentItems__content">
                    { elem.name }
                  </div>
                  {' '}
                  <button
                    className="imageDelBtn"
                    onClick={() => handleDeletPic(index)}
                  >
                    X
                  </button>
                </div>
              ))}
              <div className="addFloatForm_AddData-container">
                <input
                  type="file"
                  id="addPic"
                  nmae="inpFile"
                  onChange={(e) => handleChangePicText(e)}

                />
                <label htmlFor="addPic" className="addFloatForm_data-container_btn-add">Добавить </label>
              </div>
            </div>
            <div className="addFloatForm_AddData-container_form">
              <div className="addFloatForm_AddData_form_lft_inp">
                <div className="addFloatForm_body-col">
                  <div className="addFloatForm_body-col-title">Дети</div>
                  <DropDown
                    w="170px"
                    optMenu="Нет"
                    category={[['Да'], ['Нет']]}
                    className="addingApartaments_dropdown_respove_sm"
                    onChange={(e) => setChildrensa(e.target.value)}
                    value={childrens}
                  />
                </div>
                <div className="addFloatForm_body-col">
                  <div className="addFloatForm_body-col-title">Доп.услуги</div>
                  <DropDown
                    w="170px"
                    optMenu="Все включено"
                    category={[['Все включено'], ['Нет']]}
                    className="addingApartaments_dropdown_respove_sm"
                  />
                </div>
              </div>
              <div className="addFloatForm_AddData_form_rgt_inp">
                <div className="addFloatForm_body-col">
                  <div className="addFloatForm_body-col-title">Животные</div>
                  <DropDown
                    w="170px"
                    optMenu="Нет"
                    category={[['Да'], ['Нет']]}
                    className="addingApartaments_dropdown_respove_sm"
                  />
                </div>
                <div className="addFloatForm_body-col">
                  <div className="addFloatForm_body-col-title">Инностранцы</div>
                  <DropDown
                    w="170px"
                    optMenu="Нет"
                    category={[['Да'], ['Нет']]}
                    className="addingApartaments_dropdown_respove_sm"
                    value={foreignersState}
                    onChange={(e) => setforeignersState(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="addFloatForm_footer">
          <div className="addFloatForm_footer_addres_coment">
            <div className="addFloatForm_footer_addres">
              <div className="addFloatForm_footer_addres_title">Ссылка*</div>
              <InputElement
                className="addFloatForm_footer_addres_inp"
                onChange={(e) => handleChangeLink(e.target.value)}
                value={link}
                err={allErr && !link.length}
              />
            </div>
            <div className="addFloatForm_footer_coments">
              <div className="addFloatForm_footer_coments_title">Комментарий</div>
              <textarea
                className="addFloatForm_footer_coments_inp"
                onChange={(e) => setCommentState(e.target.value)}
                value={commentStatet}
              />
            </div>
          </div>
          <div className="addFloatForm_footer_calendar">
            <div className="addFloatForm_footer_calendar_title">Дата освобождения</div>
            <div className="addFloatForm_footer_calendar_cover">
              <CalendarForm setRoomDate={setRoomDate} />
            </div>
            <div
              className="errorSectionAddFlat"
              style={{ display: allErr ? 'block' : 'none' }}
            >
              <div
                className="errorSectionAddFlat_title"
              >
                Обязятельно для ввода
              </div>
              <div style={{ display: priceSale.length ? 'none' : 'block' }}>- Цена*</div>
              <div style={{ display: nameVal.length ? 'none' : 'block' }}> -"Имя </div>
              <div style={{ display: !nameErr ? 'none' : 'block' }}>
               <div>-"Имя должно содержать</div>
               <div>только буквы кириллицы"</div>
                </div>
              <div
                style={
                  { display: street.length && numberHome.length && numberRoom.length ? 'none' : 'block' }
                  }
              >
                -Дом/улица/квартира*
              </div>
              <div style={{ display: phone.length ? 'none' : 'block' }}>-Телефон(должен содержать 10цифр)*</div>
              <div style={{ display: link.length ? 'none' : 'block' }}>-ссылка*</div>
            </div>
            <div className="addFloatForm_calendar_btn">
              <button
                type="button"
                onClick={handleAddApartaments}
              >
                Добавить
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddFloatForm;
