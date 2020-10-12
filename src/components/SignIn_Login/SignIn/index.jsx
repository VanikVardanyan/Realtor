import React, { useState, useEffect } from 'react';
import './style.scss';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import passWoch from '../../../assect/image/passWoch.png';
import passNone from '../../../assect/image/passNone.png';
import { personFetchData2 } from '../../../store/thunkAction';
import { getStateLoading } from '../../../store/selector/getStateLoading';
import { getErrorMessageLogin } from '../../../store/selector/geterrorMesageLogin';

const SignIn = (props) => {
  const [passClocse, setPassClose] = useState(false);
  const [log, setLog] = useState('');
  const [pass, setPass] = useState('');
  const loadingState = useSelector(getStateLoading);
  const dispatch = useDispatch();
  const errorMessage = useSelector(getErrorMessageLogin);

  // useEffect(() => {
  //   if (loadingState) props.history.push('/personalposts');
  // }, [loadingState]);

  const handleChangePas = (val) => {
    setPass(val);
  };

  const handleChangeLog = (val) => {
    setLog(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(personFetchData2(log, pass));
  };

  return (
    <div className="signin_section">
      <div className="signin">
        <div className="signin_title">Вход в систему</div>
        <form
          className="signin_form"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            className="signin_email"
            value={log}
            placeholder="логин"
            onChange={(e) => handleChangeLog(e.target.value)}
          />
          <div className="password_inp">
            <input
              type={passClocse ? 'text' : 'password'}
              className="signin_password"
              value={pass}
              placeholder="пароль"
              onChange={(e) => handleChangePas(e.target.value)}
            />
            <button
              type="button"
              className="password_visibl_icon"
              onClick={() => setPassClose(!passClocse)}
            >
              {' '}
              <img src={passClocse ? passWoch : passNone} alt="woch" className="showPassword_img" />
              {' '}
            </button>
          </div>
          <div className="errorDontRightLogin">{errorMessage}</div>
          <div className="signin_footer">
            <div className="signin_link">
              <Link to="/restorePassword">
                Забыли пароль?
              </Link>
            </div>
            <input
              className="signin_submit"
              type="submit"
              value="Войти"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
