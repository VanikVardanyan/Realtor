import React, { useState } from 'react';

import './style.scss';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addNewAgent } from '../../store/thunkAction/addNewAgent';

const AddAgent = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [nameErr, setNameErr] = useState(false);
  const [globalErr, setGlobalErr] = useState(false);
  const history = useHistory();
  const handleChangeName = (value) => {
    if (value.length && !/[а-я]/i.test(value)) {
      setNameErr(true);
      setName(value);
    } else {
      setNameErr(false);
      setName(value);
    }
  };

  const handleChangeMail = (value) => {
    setMail(value);
  };

  const handleSaveUser = (e) => {
    e.preventDefault();
    const params = {
      login: mail,
      fio: name,
    };
    if (name.length && mail.length && /[а-я]/i.test(name)) {
      dispatch(addNewAgent(params));
      history.push('/adminpage');
    } else {
      setGlobalErr(true);
    }
  };

  const handleClear = () => {
    setName('')
    setMail('')
  }

  return (
    <div className="addAgent_section">
      <form className="addAgent" onSubmit={handleSaveUser}>
        <div className="addAgent_title">Добавить агента</div>
        <div className="addAgent_category_title">Имя</div>
        <input
          type="text"
          className="addAgent_inp"
          onChange={(e) => handleChangeName(e.target.value)}
          value={name}
        />
        <div className="addAgentErrMessageName" style={{ display: nameErr ? 'block' : 'none' }}>
          "Имя" должно содержать только буквы кириллицы
        </div>
        <div className="addAgent_category_title">Почта</div>
        <input
          type="email"
          className="addAgent_inp"
          onChange={(e) => handleChangeMail(e.target.value)}
          value={mail}
        />
        <div className="addAgent_category_title">Телефон</div>
        <input type="text" className="addAgent_inp" />
        <div className="addAgentErrMessageName" style={{ display: globalErr ? 'block' : 'none' }}>все поля обязательны*</div>
        <div className="addAgent_btn_section">
          <input
            type="submit"
            className="addAgent_loginAgent_btn"
            value="Зарегестрировать"
          />
          <button
            type="button"
            className="addAgent_cancel_btn"
            onClick = {handleClear}
          >
            Сброс
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAgent;
