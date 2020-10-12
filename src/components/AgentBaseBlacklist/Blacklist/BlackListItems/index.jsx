import React from 'react';
import './style.scss';
import request from '../../../../constants/api';

const BlackListItems = ({
  fio, email, phone, id, handleDeletInList
}) => {
  const unBlockAgent = () => {
    request().post('/auth/admin/agent/unblock', { userId: id })
      .then((res) => {
        if(res.status === 200) {
          handleDeletInList(id)
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="BlackListItems">
      <div className="BlackListItems_name">{fio}</div>
      <div className="BlackListItems_mail">{email}</div>
      <div className="BlackListItems_number">{phone}</div>
      <div className="BlackListItems_btnGroup">
        <button
          type="button"
          className="BlackListItems_deletBtn"
          onClick={unBlockAgent}
        >
          Вернуть
        </button>
      </div>
    </div>
  );
};

export default BlackListItems;
