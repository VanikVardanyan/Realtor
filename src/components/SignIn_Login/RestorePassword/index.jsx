import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './style.scss';
import axios from 'axios';

const RestorePassword = (props) => {
  const [email, setEmail] = useState('');
  const history = useHistory();

  const request = () => axios.create({
    baseURL: 'http://agentdubna.ru/api',
    headers: { 'Content-Type': 'text/plain' },
  });

  const handleNextPass = () => {
    request().post('/auth/recover', { email });
  };
  // history.push('/passwordRequest')
  return (
    <div className="restore_password_section">
      <div className="restore_password">
        <div className="restore_password_title">Восстановление пароля</div>
        <div className="restore_password_inp_block">
          <input
            type="mail"
            placeholder="Логин"
            className="restore_password_inp"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="help_message">
            *Введите почту для восстановления пароля
            учетной записи
          </div>
        </div>
        <div className="restore_password_btn_block">
          <button
            type="button"
            className="btn_go_back"
            onClick={() => props.history.push('/')}
          >
            Назад
          </button>
          <button
            type="button"
            className="btn_next"
            onClick={handleNextPass}
          >
            Далее
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestorePassword;
