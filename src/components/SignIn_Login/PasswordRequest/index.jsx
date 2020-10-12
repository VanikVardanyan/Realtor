import React from 'react';
import { useHistory } from 'react-router-dom';
import './style.scss';

const PasswordRequest = () => {
  const history = useHistory();
  const handleToMain = () => {
    history.push('/');
  };
  return (
    <div className="password_request_wrapper">
      <div className="password_request">
        <div className="password_request_text">
          Заявка на восстановление пароля
          отправлена.
          Ответ будет выслан на вашу электронную почту.
        </div>
        <button onClick={handleToMain} type="button" className="password_request_btn">Назад</button>
      </div>
    </div>
  );
};

export default PasswordRequest;
