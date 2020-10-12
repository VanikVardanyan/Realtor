import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import './style.scss';

import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import closeX from '../../assect/image/closeX.png';
import InputElement from '../common/inputElement';
import RadioBtn from '../common/radioBtn';
import DropDown from '../common/dropdown';
import CheckboxElement from '../common/checkbox/checkboxElement';
import { addRequest } from '../../store/thunkAction/addRequest';
import { getAddRequestPersonNumber } from '../../store/selector/getAddRequestPersonNumber';

const AddingRequest = (props) => {
  const location = useLocation();
  const [name, setName] = useState(location.state ? location.state.name : '');
  const [date, setDate] = useState();
  const [organization, setOrganization] = useState();
  const [numberP, setNum] = useState();
  const [districtR, setDistrictR] = useState([]);
  const [saleFrom, setSaleFrom] = useState();
  const [saleBefor, setSaleBefor] = useState(location.state ? location.state.saleBefor : '');
  const [quantityPerson, setQuantityPerson] = useState();
  const [clientStatus, setClientStatus] = useState();
  const [quantityRoom, setQuantityRom] = useState();
  const [repairs, setRepairs] = useState();
  const [citizenship, setCitizenship] = useState();
  const [term, setTerm] = useState();
  const [payment, setPayment] = useState();
  const [comment, setComment] = useState();
  const [dataPets, setdataPets] = useState({});
  const [dataChilds, setDataChilds] = useState({});
  const [errMessage, setErrmesage] = useState(false);
  const [errMessageSale, setErrMessageSale] = useState(false);
  const [errMessageFio, setErrMessageFio] = useState(false);
  const [togCheck, setTogCheck] = useState(false);
  const [togCheck1, setTogCheck1] = useState(false);
  const [togCheck2, setTogCheck2] = useState(false);
  const [togCheck3, setTogCheck3] = useState(false);
  const [togCheck4, setTogCheck4] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
  const personTelNumber = useSelector(getAddRequestPersonNumber);

  useEffect(() => {
    let numEl = '';
    for (const index in personTelNumber) {
      if (parseInt(personTelNumber[index])) {
        numEl += personTelNumber[index];
      }
    }
    parseInt(numEl);
    setNum(numEl.slice(1));
  }, []);

  const CitizenCheck = {
    РФ: 0,
    Другое: 1,
    undefined: '',
  };

  const QuantityRoom = {
    Другое: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    undefined: '',
  };

  const RenovationCheck = {
    'не важно': 0,
    косметический: 1,
    евро: 2,
    undefined: '',
  };
  const Createrm = {
    Длительный: 0,
    Короткий: 1,
    undefined: '',
  };

  const clientStatusParse = {
    Одинокий: 0,
    Семья: 1,
    Рабочий: 2,
    ИТР: 3,
  };

  const paymentParse = {
    Наличный: 0,
    Безналичный: 1,
  };

  const handleCreateRequest = () => {
    const dateParse = Date.parse(date);
    const params = {
      arrivalDate: dateParse,
      comment: comment || '',
      people: `${quantityPerson || 1}`,
      price: { min: saleFrom || '1', max: saleBefor },
      client: {
        fio: name, phone: `${location.state ? location.state.clientPhone : numberP}`, organization: organization || '', clientStatus: clientStatusParse[clientStatus] || 0,
      },
      flat: {
        rooms: `${QuantityRoom[quantityRoom]}` || '0', renovation: `${RenovationCheck[repairs]}` || '0', pets: parsePostDataPets(petsAddParse) || [], childs: parsePostDataChilds(childsAddParse) || [],
      },
      district: districtR || [],
      citizenship: `${CitizenCheck[citizenship]}` || '0',
      paymentMethod: `${paymentParse[payment] || '0'}`,
      rentTime: `${Createrm[term]}` || '0',
    };

    if (!name || !saleBefor) {
      setErrmesage(true);
    } else if (saleFrom > saleBefor) {
      setErrMessageSale(true);
    } else if (!/[а-я]/i.test(name)) {
      setErrMessageFio(true);
    } else {
      dispatch(addRequest(params));
      history.push({pathname: '/personalposts', state: true});
      window.location.reload(true)
    }
  };

  const handleThrowOff = () => {
    setSaleFrom('');
    setSaleBefor('');
    setName('');
    setOrganization('');
    setQuantityPerson('');
    setClientStatus('одинокий');
    setQuantityRom('Другое');
    setRepairs('не важно');
    setTogCheck(false);
    setTogCheck1(false);
    setTogCheck2(false);
    setTogCheck3(false);
    setTogCheck4(false);
    setdataPets({});
    setDataChilds({});
    setCitizenship('');
    setTerm('');
    setPayment('');
    setComment('');
  };

  const petsAddParse = Object.values(dataPets);

  const parsePostDataPets = (c) => {
    let nice = [];
    const one = c.filter((val, ind) => val === 'Другое');
    if (one.length > 0) {
      nice = [{ type: '0', count: one.length }];
    }
    const tho = c.filter((val, ind) => val === 'Кошка');
    if (tho.length > 0) {
      nice = [...nice, { type: '1', count: tho.length }];
    }
    const three = c.filter((val, ind) => val === 'Собака');
    if (three.length > 0) {
      nice = [...nice, { type: '2', count: three.length }];
    }

    return nice;
  };

  parsePostDataPets(petsAddParse);

  const handleAnimalQuantity = () => {
    setdataPets({ ...dataPets, [Object.values(dataPets).length]: 'Другое' });
  };

  const handleChangeAnimal = (value, id) => {
    setdataPets((dataPets) => ({ ...dataPets, [id]: value }));
  };

  const childsAddParse = Object.values(dataChilds);

  const parsePostDataChilds = (c) => {
    let nice = [];
    const one = c.filter((val, ind) => val === '0 - 3');
    if (one.length > 0) {
      nice = [{ age: '0', count: one.length }];
    }
    const tho = c.filter((val, ind) => val === '4 - 5');
    if (tho.length > 0) {
      nice = [...nice, { age: '1', count: tho.length }];
    }
    const three = c.filter((val, ind) => val === '6 - 9');
    if (three.length > 0) {
      nice = [...nice, { age: '2', count: three.length }];
    }
    const four = c.filter((val, ind) => val === '10+');
    if (four.length > 0) {
      nice = [...nice, { age: '3', count: four.length }];
    }
    return nice;
  };

  parsePostDataChilds(childsAddParse);

  const handleAddAgeChild = () => {
    setDataChilds({ ...dataChilds, [Object.values(dataChilds).length]: '0 - 3' });
  };

  const handleChangeChilds = (value, id) => {
    setDataChilds((dataChilds) => ({ ...dataChilds, [id]: value }));
  };

  const handleDeletChildCategory = (id) => {
    const tresh = { ...dataChilds };
    delete tresh[id];
    setDataChilds({ ...Object.values(tresh) });
  };

  const handleDeletAnimalCategory = (id) => {
    const tresh = { ...dataPets };
    delete tresh[id];
    setdataPets(({ ...Object.values(tresh) }));
  };

  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  const yyyy = today.getFullYear();
  if (dd < 10) {
    dd = `0${dd}`;
  }
  if (mm < 10) {
    mm = `0${mm}`;
  }

  const handlechangeSaleFrom = (value) => {
    if (!isNaN(+value)) setSaleFrom(value);
  };

  const handlechangeSaleBefor = (value) => {
    if (!isNaN(+value)) setSaleBefor(value);
  };

  const handleChancheQuantityRoom = (value) => {
    if (!isNaN(+value)) setQuantityPerson(value);
  };

  const handlechangeName = (value) => {
    if (!/[а-я]/i.test(value) && value.length > 0) {
      setErrMessageFio(true);
    } else {
      setErrMessageFio(false);
    }
    setName(value);
  };

  today = `${yyyy}-${mm}-${dd}`;

  return (
    <div className="addingRequest">
      <div className="addingRequest_header">
        <div>Добавление запроса</div>
        <div>
          <button type="button" className="addingRequest_header_btn">
            <Link to="/myPosts">
              <img src={closeX} alt="close" />
            </Link>
          </button>
        </div>
      </div>
      <div className="addingRequest_body">
        <div className="addingRequest_row">
          <div className="addingRequest_col_top_left">
            <div className="addingRequest_col_section">

              <div className="addingRequest_col_title">Имя*</div>
              <InputElement
                w="478px"
                className={`addinRequest_inp_name ${location.state ? 'tellDisable' : ''} `}
                onChange={(e) => { handlechangeName(e.target.value); }}
                value={location.state ? location.state.name : name}
                dis={!!location.state}
                backText="ФИО"
              />
            </div>
            <div
              className="errorMessageAddRequestForNameSection"
              style={{ display: errMessageFio ? 'block' : 'none' }}
            >
              Поле "Имя" должно содержать только буквы кириллицы
            </div>
            <div className="addingRequest_tell_date">
              <div>
                <div className="addingRequest_col_title">Телефон*</div>
                <InputElement
                  w="218px"
                  className="addinRequest_inp_full_screen tellDisable"
                  value={location.state ? location.state.detail : personTelNumber}
                  dis
                />
              </div>
              <div className="addingRequest_col_section">
                <div className="addingRequest_col_title">Дата заселения</div>
                <InputElement
                  typeInp="date"
                  w="176px"
                  className="addinRequest_inp_full_screen date_term"
                  onChange={(e) => setDate(e.target.value)}
                  value={date}
                  min={today}
                  max="2025-01-01"
                />
              </div>
            </div>
            <div className="addingRequest_col_section">
              <div>
                <div className="addingRequest_col_title">Организация</div>
                <InputElement
                  w="478px"
                  className="addinRequest_inp_name"
                  onChange={(e) => setOrganization(e.target.value)}
                  value={organization}
                  backText={' "ООО" рога и копыта'}
                />
              </div>
            </div>
          </div>
          <div className="addingRequest_coll_top_center">
            <div className="addingRequest_coll_top_center_section row_revets revers_style_sale_from">
              <div>
                <div className="addingRequest_col_title ">Цена от*</div>
                <InputElement
                  w="100px"
                  className="adding_inp_full_screen"
                  onChange={(e) => handlechangeSaleFrom(e.target.value)}
                  value={saleFrom}
                  backText="0"
                />
              </div>
              <div>
                <div className="addingRequest_col_title">Статус клиента</div>
                <DropDown
                  w="206px"
                  className="addingRequest_dpobdown_select"
                  category={[['Одинокий'], ['Семья'], ['Рабочий'], ['ИТР']]}
                  onChange={(e) => setClientStatus(e.target.value)}
                  value={clientStatus}
                />
              </div>
            </div>
            <div className="addingRequest_coll_top_center_section">
              <div>
                <div className="addingRequest_col_title">Цена до*</div>
                <InputElement
                  w="100px"
                  className="adding_inp_full_screen"
                  onChange={(e) => handlechangeSaleBefor(e.target.value)}
                  value={saleBefor}
                  backText="1"
                />

              </div>
              {' '}
              <div>
                <div className="addingRequest_col_title">Кол-во комнат</div>
                <DropDown
                  w="206px"
                  className="addingRequest_dpobdown_select"
                  category={[[1], [2], [3], [4], [5], ['Другое']]}
                  onChange={(e) => setQuantityRom(e.target.value)}
                  value={quantityRoom}
                />
              </div>
            </div>
            <div className="addingRequest_coll_top_center_section">
              <div>
                <div className="addingRequest_col_title">Кол-во чел</div>
                <InputElement
                  w="100px"
                  className="adding_inp_full_screen"
                  onChange={(e) => handleChancheQuantityRoom(e.target.value)}
                  value={quantityPerson}
                  backText="1"
                />
              </div>
              {' '}
              <div>
                <div className="addingRequest_col_title">Ремонт</div>
                <DropDown
                  w="206px"
                  className="addingRequest_dpobdown_select"
                  category={[['не важно'], ['косметический'], ['евро']]}
                  onChange={(e) => setRepairs(e.target.value)}
                  value={repairs}
                />
              </div>
            </div>
          </div>
          <div className="addingRequest_coll_top_right">
            <div className="addingRequest_radio_section">
              <div className="addingRequest_col_title">Гражданство*</div>
              <div>
                <RadioBtn
                  title1="РФ"
                  title2="Другое"
                  value={citizenship}
                  onClick={(e) => setCitizenship(e.target.value)}
                />
              </div>
            </div>
            <div className="addingRequest_radio_section">
              <div className="addingRequest_col_title">Срок</div>
              <div>
                <RadioBtn
                  title1="Длительный"
                  title2="Короткий"
                  value={term}
                  onClick={(e) => setTerm(e.target.value)}
                />
              </div>
            </div>
            <div>
              <div className="addingRequest_col_title">Расчет</div>
              <div>
                <RadioBtn
                  title1="Наличный"
                  title2="Безналичный"
                  value={payment}
                  onClick={(e) => setPayment(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="addingRequestCheckt_selection">
          <div>
            Район
          </div>
          <div>
            <CheckboxElement
              onChange={(checked) => {
                if (checked) setDistrictR([...districtR, '0']);
                if (!checked) {
                  const newList = districtR.filter((elem) => elem !== '0'); setDistrictR(newList);
                }
                setTogCheck(checked);
              }}
              label="БВ"
              checked={togCheck}
            />
          </div>
          <div>
            <CheckboxElement
              onChange={(checked) => {
                if (checked) setDistrictR([...districtR, '1']);
                if (!checked) {
                  const newList = districtR.filter((elem) => elem !== '1'); setDistrictR(newList);
                }
                setTogCheck1(checked);
              }}
              label="ЧР"
              checked={togCheck1}
            />
          </div>
          <div>
            <CheckboxElement
              onChange={(checked) => {
                if (checked) setDistrictR([...districtR, '2']);
                if (!checked) { const newList = districtR.filter((elem) => elem !== 2); setDistrictR(newList); }
                setTogCheck2(checked);
              }}
              label="ИЧ"
              checked={togCheck2}
            />
          </div>
          <div>
            <CheckboxElement
              onChange={(checked) => {
                if (checked) setDistrictR([...districtR, '3']);
                if (!checked) { const newList = districtR.filter((elem) => elem !== '3'); setDistrictR(newList); }
                setTogCheck3(checked);
              }}
              label="ЛБ"
              checked={togCheck3}
            />
          </div>
          <div>
            <CheckboxElement
              onChange={(checked) => {
                if (checked) setDistrictR([...districtR, '4']);
                if (!checked) { const newList = districtR.filter((elem) => elem !== '4'); setDistrictR(newList); }
                setTogCheck4(checked);
              }}
              label="Александровка"
              checked={togCheck4}
            />
          </div>
        </div>
      </div>
      <div className="addingRequest_footer">
        <div className="AddingRequest_foooter_button_section">
          <div>
            <div className="addingRequest_col_title">Животные</div>
            {
              Object.values(dataPets).map((animal, index) => (
                <div style={{ marginBottom: '11px' }} key={nanoid()} className="subCategoryChild">
                  {' '}
                  <DropDown
                    w="176px"
                    category={[['Другое'], ['Кошка'], ['Собака']]}
                    id={index}
                    value={dataPets[index]}
                    onChange={(e) => handleChangeAnimal(e.target.value, index)}
                  />
                  {' '}
                  <button
                    type="button"
                    className="deletChildCategory"
                    onClick={() => handleDeletAnimalCategory(index)}
                  />
                </div>
              ))
              }
            <button
              type="button"
              className="addingRequest_footer_animal_btn"
              onClick={handleAnimalQuantity}
              style={{ display: Object.values(dataPets).length !== 4 ? 'block' : 'none' }}
            >
              Добавить
            </button>
          </div>
          <div>
            <div className="addingRequest_col_title">Дети</div>
            {
              Object.values(dataChilds).map((child, index) => (
                <div style={{ marginBottom: '11px' }} key={nanoid()} className="subCategoryChild">
                  {' '}
                  <DropDown
                    w="187px"
                    category={[['0 - 3'], ['4 - 5'], ['6 - 9'], ['10+']]}
                    id={index}
                    value={dataChilds[index]}
                    onChange={(e) => handleChangeChilds(e.target.value, index)}
                  />
                  {' '}
                  <button
                    type="button"
                    className="deletChildCategory"
                    onClick={() => handleDeletChildCategory(index)}
                  />
                </div>
              ))
            }
            <button
              type="button"
              className="addingRequest_footer_child_btn"
              onClick={handleAddAgeChild}
              style={{ display: Object.values(dataChilds).length !== 4 ? 'block' : 'none' }}
            >
              Добавить
            </button>
          </div>
        </div>
        <div className="addingRequest_footer_comment_section">
          <div className="addingRequest_col_title">Комментарий</div>
          <textarea
            className="addingRequest_footer_textArea"
            placeholder="Напишите здесь что-нибудь..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            maxLength="740"
          />
        </div>
      </div>
      <div
        className="errorMessageAddRequest"
        style={{ display: errMessage ? 'block' : 'none' }}
      >
        поле Имя и Цена до обязательны*
      </div>

      <div
        className="errorMessageAddRequest"
        style={{ display: errMessageSale ? 'block' : 'none' }}
      >
        цена От должна быть меньше цены До*
      </div>
      <div
        className="errorMessageAddRequest"
        style={{ display: errMessageFio ? 'block' : 'none' }}
      >
        Поле "Имя" должно содержать только буквы кириллицы
      </div>
      <div className="addingRequest_footer_end">
        <button
          type="button"
          className="addingRequest_footer_cancelBtn"
          onClick={handleThrowOff}
        >
          Сброс
        </button>
        <button
          type="button"
          className="addingRequest_footer_addBtn"
          onClick={handleCreateRequest}
        >
          {location.state ? 'изменить' : 'Создать'}
        </button>
      </div>
    </div>
  );
};
export default AddingRequest;
