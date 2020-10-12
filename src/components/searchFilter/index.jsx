import React, { useState, useCallback } from 'react';
import './style.scss';
import { useDispatch } from 'react-redux';
import CheckboxElement from '../common/checkbox/checkboxElement';
import DropDown from '../common/dropdown';
import InputElement from '../common/inputElement';
import { filterOnRequest } from '../../store/thunkAction/filterOnRequest';
import { addRequest } from '../../store/thunkAction/addRequest';
import MultiSelect from '../common/multiSelect';
import { cleaerState } from '../../store/action';

const SearchFilter = () => {
  const [saleFrom, setSaleFrom] = useState('');
  const [saleBefor, setSaleBefor] = useState('');
  const [term, setTerm] = useState();
  const [disctict, setDistrict] = useState();
  const [citizen, setCitizen] = useState();
  const [roomQuantity, setRoomQuantity] = useState();
  const [renovat, setRenovation] = useState();
  const [CheckPets, setCheckPets] = useState(false);
  const [childs, setChilds] = useState(false);
  const [value, setValue] = React.useState([]);
  const [errMessage, setArrMesage] = useState(false);

  const dispatch = useDispatch();

  const Createrm = {
    длительный: 0,
    короткий: 1,
    undefined: '',
  };

  const DistrictQuarter = {
    Александровка: 0,
    БВ: 1,
    ЧР: 2,
    ИЧ: 3,
    ЛБ: 4,
    undefined: '',
  };

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

  const handleClickSearch = (e) => {
    e.preventDefault();
    const param = {
      minPrice: saleFrom,
      maxPrice: saleBefor,
      rentTime: Createrm[term] ? [Createrm[term]] : [],
      citizenship: CitizenCheck[citizen] ? [CitizenCheck[citizen]] : [],
      childs,
      pets: CheckPets,
      district: value.map((elem) => elem.ind) ? value.map((elem) => elem.ind) : [],
      renovation: RenovationCheck[renovat] ? [RenovationCheck[renovat]] : [],
      rooms: QuantityRoom[roomQuantity] ? [`${QuantityRoom[roomQuantity]} `] : [],
    };

    if (+saleFrom < +saleBefor || !saleBefor || !saleBefor) {
      dispatch(filterOnRequest(param));
      setArrMesage(false);
    } else {
      setArrMesage(true);
    }
    // dispatch(cleaerState())
  };

  const handleClickClear = () => {
    setTerm('-');
    setSaleFrom('');
    setSaleBefor('');
    setCitizen('-');
    setRoomQuantity('-');
    setRenovation('-');
    setValue([]);
    setCheckPets(false);
    setChilds(false);
  };

  const handlechangeSaleFrom = (value) => {
    if (!isNaN(+value)) setSaleFrom(value);
  };

  const handlechangeSaleBefor = (value) => {
    if (!isNaN(+value)) setSaleBefor(value);
  };

  const handleCheckPets = (checked) => {
    setCheckPets(checked);
  };

  const handleCheckChild = (checked) => {
    setChilds(checked);
  };

  const handleClickDistrict = (val) => {
    setDistrict(val);
  };

  return (
    <div className="searchFilter">
      <div className="searchFilter_title">Фильтр по запросам</div>
      <div className="searchFilter_row">
        <div className="searchFilter_col">
          <div className="searchFilter_col_title">Срок</div>
          <DropDown
            w="200px"
            className="full_screen_searchFilter_dropDown"
            category={[['-'], ['длительный'], ['короткий']]}
            onChange={(e) => setTerm(e.target.value)}
            value={term}
          />
        </div>
        <div className="searchFilter_col">
          <div className="searchFilter_sale_inpSection">
            <div className="subInputFrom_relativ">
              <div className="searchFilter_col_title">Цена</div>
              <InputElement
                w="170px"
                className="full_screen_searchFilter_inp"
                onChange={(e) => handlechangeSaleFrom(e.target.value)}
                value={saleFrom}
              />
              <div className="subInputFrom">от</div>
            </div>
            <div className="searchFilter_sale_inpSection_border" />
            <div className="subInputBefore_relativ">
              <InputElement
                w="170px"
                className="full_screen_searchFilter_inp bottom_inp_sm"
                onChange={(e) => { handlechangeSaleBefor(e.target.value); }}
                value={saleBefor}
              />
              <div className="subInputBefore">до</div>
            </div>
          </div>
        </div>
        <div className="searchFilter_col">
          <div className="searchFilter_col_title sm_response_citizenship">Район</div>
          <MultiSelect
            className="full_screen_searchFilter_dropDown"
            onClick={(e) => handleClickDistrict(e.target.value)}
            value={value}
            setValue={setValue}
          />
        </div>
      </div>
      <div className="searchFilter_row">
        <div className="searchFilter_col">
          <div className="searchFilter_col_title">Гражданство</div>
          <DropDown
            w="229px"
            className="full_screen_searchFilter_dropDown"
            category={[['-'], ['РФ'], ['Другое']]}
            onChange={(e) => setCitizen(e.target.value)}
            value={citizen}
          />
        </div>
        <div className="searchFilter_col">
          <div className="searchFilter_col_title">Кол-во комнат</div>
          <DropDown
            w="229px"
            className="full_screen_searchFilter_dropDown"
            category={[['-'], [1], [2], [3], [4], [5], ['Другое']]}
            onChange={(e) => setRoomQuantity(e.target.value)}
            value={roomQuantity}
          />
        </div>
        <div className="searchFilter_col">
          <div className="searchFilter_col_title">Ремонт</div>
          <DropDown
            w="230px"
            className="full_screen_searchFilter_dropDown"
            category={[['-'], ['не важно'], ['косметический'], ['евро']]}
            onChange={(e) => setRenovation(e.target.value)}
            value={renovat}
          />
        </div>
        <div className="searchFilter_checked_section">
          <div>
            <CheckboxElement
              label="Без животных"
              onChange={handleCheckPets}
              checked={CheckPets}
            />
          </div>
          <div>
            <CheckboxElement
              onChange={handleCheckChild}
              label="Без детей"
              checked={childs}
            />
          </div>
        </div>
      </div>
      <div className="searchFilter_footer">
        <button
          type="button"
          className="searchFilter_footer_cancelBtn"
          onClick={handleClickClear}
        >
          Сброс
        </button>
        <div className="errMesageSale">
          {errMessage ? 'значения От не должно быть больше значения До' : ''}
        </div>
        <button
          type="button"
          className="searchFilter_footer_searchBtn"
          onClick={handleClickSearch}
        >
          Найти
        </button>
      </div>
    </div>

  );
};

export default SearchFilter;
