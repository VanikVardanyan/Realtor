import React from 'react';
import './style.scss';
import HistoryModal from '../../modalFromHistory';
import request from '../../../../constants/api';

const AgentDatabaseItems = ({
  email, phone, fio, id, addBlackList
}) => {
  const handleBlockAgent = () => {
    request().post('/auth/admin/agent/block', { userId: id })
      .then((res) => {
        if(res.status === 200) {
          addBlackList(id)
        }
      })
      .catch((err) => console.log(err));
  };
  return (

    <li className="AgentDatabaseItems">
      <div className="AgentDatabaseItems_name">{fio}</div>
      <div className="AgentDatabaseItems_mail">{email}</div>
      <div className="AgentDatabaseItems_number">
        {phone === 0 ? 'не указано' : phone }
      </div>
      <div className="AgentDatabaseItems_btnGroup">
        <HistoryModal
          className="AgentDatabaseItems_aboutBtn"
          id={id}
          name={fio}
          email={email}
          phone={phone}
        />

        <button
          type="button"
          className="AgentDatabaseItems_deletBtn"
          onClick={handleBlockAgent}
        >
          Убрать
        </button>
      </div>
    </li>
  );
};
export default AgentDatabaseItems;
