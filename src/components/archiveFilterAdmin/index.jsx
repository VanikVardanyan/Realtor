import React, { useState } from 'react';
import './style.scss';
import DropDown from '../common/dropdown';
import InputElement from '../common/inputElement';
import MultiSelect from '../common/multiSelect';
import CheckboxElement from '../common/checkbox/checkboxElement';
import { useDispatch } from 'react-redux';
import { filterOnRequest } from '../../store/thunkAction/filterOnRequest';
import { cleaerState } from '../../store/action';

const ArchiveFilterAdmin = () => {
  const [value, setValue] = React.useState([]);
  const [saleFrom, setSaleFrom] = useState('');
  const [saleBefor, setSaleBefor] = useState('');
  const [term, setTerm] = useState();
  const [disctict, setDistrict] = useState();
  const [citizen, setCitizen] = useState();
  const [roomQuantity, setRoomQuantity] = useState();
  const [renovat, setRenovation] = useState();
  const [CheckPets, setCheckPets] = useState(false);
  const [childs, setChilds] = useState(false);
  const [dateTo, setDateTo] = useState();
  const [dateFrom, setDateFrom] = useState();
  const [errMessage, setArrMesage] = useState(false);

  const dispatch = useDispatch()

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
    const dateParse = Date.parse(dateTo);
    const dateParseFrom = Date.parse(dateFrom);
    const param = {
      archiveTimeFrom: dateParse,
      archiveTimeTo: dateParseFrom,
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
      setArrMesage(false);
      dispatch(filterOnRequest(param));
      dispatch(cleaerState())
    } else {
      setArrMesage(true);
    }
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
    <div className="archiveFilterAdmin">
      <div className="archiveFilterAdmin_title">Фильтр по архиву </div>
      <div className="archiveFilterAdmin_row_top">
        <div className="archiveFilterAdmin_row_item">
          <div className="archiveFilterAdmin_col_title">Срок</div>
          <DropDown
            w="200px"
            category={[['-'], ['длительный'], ['короткий']]}
            className="full_screen_archiveFilterAdmin_dropDown"
            onChange={(e) => setTerm(e.target.value)}
            value={term}
          />
        </div>
        <div className="archiveFilterAdmin_sale_inpSection">
          <div className="subInputFrom_relativ">
            <div className="archiveFilterAdmin_col_title">Цена</div>
            <InputElement
              w="170px"
              className="full_screen_archiveFilterAdmin_inp"
              onChange={(e) => handlechangeSaleFrom(e.target.value)}
              value={saleFrom}
            />
            <div className="subInputFrom_archive">от</div>
          </div>
          <div className="archiveFilterAdmin_sale_inpSection_border" />
          <div className="searchFilter_sale_inpSection_border_archive" />
          <div className="subInputBefore_relativ">
            <InputElement
              w="170px"
              className="full_screen_archiveFilterAdmin_inp"
              onChange={(e) => { handlechangeSaleBefor(e.target.value); }}
              value={saleBefor}
            />
            <div className="subInputBefore">до</div>
          </div>
        </div>
        <div className="archiveFilterAdmin_col multiselect_section">
          <div className="archiveFilterAdmin_col_title">Район</div>
          <MultiSelect
            className="full_screen_archiveFilterAdmin_dropDown"
            value={value}
            setValue={setValue}
            onClick={(e) => handleClickDistrict(e.target.value)}
          />
        </div>
        <div className="archiveFilterAdmin_checked_section">
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
      <div className="archiveFilterAdmin_row_bottom">
        <div className="archiveFilterAdmin_row_item">
          <div className="archiveFilterAdmin_col_title">Гражданство</div>
          <DropDown
            w="200px"
            category={[['-'], ['РФ'], ['Другое']]}
            onChange={(e) => setCitizen(e.target.value)}
            value={citizen}
            className="full_screen_archiveFilterAdmin_dropDown"
          />
        </div>
        <div className="archiveFilterAdmin_sale_inpSection archive_section">
          <div className="subInputFrom_relativ">
            <div className="archiveFilterAdmin_col_title">Дата архивации</div>
            <InputElement
              w="170px"
              className="full_screen_archiveFilterAdmin_inp"
              typeInp="date"
              onChange={(e) => setDateTo(e.target.value)}
              value={dateTo}
            />
            <div className="subInputFrom_archive">от</div>
          </div>
          <div className="archiveFilterAdmin_sale_inpSection_border" />
          <div className="searchFilter_sale_inpSection_border_archive" />
          <div className="subInputBefore_relativ">
            <InputElement
              w="170px"
              className="full_screen_archiveFilterAdmin_inp"
              typeInp="date"
              onChange={(e) => setDateFrom(e.target.value)}
              value={dateFrom}
            />               
            <div className="subInputBefore">до</div>
          </div>
        </div>
        <div className="archiveFilterAdmin_row_item response_sm_admin_row_items">
          <div className="archiveFilterAdmin_col_title">
            Ремонт
          </div>
          <DropDown
            w="253px"
            category={[['-'], ['не важно'], ['косметический'], ['евро']]}
            className="full_screen_archiveFilterAdmin_dropDown"
            onChange={(e) => setRenovation(e.target.value)}
            value={renovat}
          />
        </div>
        <div className="archiveFilterAdmin_row_item">
          <div className="archiveFilterAdmin_col_title">Кол-во комнат</div>
          <DropDown
            w="200px"
            category={[['-'], [1], [2], [3], [4], [5], ['Другое']]}
            className="full_screen_archiveFilterAdmin_dropDown"
            onChange={(e) => setRoomQuantity(e.target.value)}
            value={roomQuantity}
          />
        </div>
      </div>
      <div className="archiveFilter_footer">
        <button
          type="button"
          className="archiveFilter_footer_btn_clear"
          onClick={handleClickClear}
        >
          Сброс
        </button>

        <div className="errMesageSaleAdmin">
          {errMessage ? 'значения От не должно быть больше значения До' : ''}
        </div>

        <button
          type="button"
          className="archiveFilter_footer_btn_search"
          onClick={handleClickSearch}
        >
          Найти
        </button>
      </div>
    </div>
  );
};

export default ArchiveFilterAdmin;
