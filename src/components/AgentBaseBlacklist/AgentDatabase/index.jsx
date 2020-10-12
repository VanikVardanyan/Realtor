/* eslint-disable import/no-cycle */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import './style.scss';
import request from '../../../constants/api';
import AgentDatabaseItems from './AgentDatabaseItems';
import HeaderAddButtonHoc from '../../../HOC/AgentBaseListHock';
import AgentBaseListHock from '../../../HOC/AgentBaseListHock';

const AgentDatabase = () => {
  const [agentBase, setAgentBase] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    request().get('/auth/admin/agent/list')
      .then((res) => {
        setAgentBase(res.data);
        setLoading(true);
      })
      .catch((err) => {
        setLoading(true);
        console.log('error', err);
      });
  }, []);

  const addBlackList = (id) => {
    const newList = agentBase.filter((elem) => elem.id !== id);
    setAgentBase(newList);
  };

  const parseClientNumber = (num) => {
    const oneNum = num.slice(0, 3);
    const thoNum = num.slice(3, 6);
    const threeNum = num.slice(6, 8);
    const fourNum = num.slice(8, 10);
    const newNum = `+7(${oneNum}) ${thoNum}-${threeNum}-${fourNum}`;
    return newNum;
  };
  return (
    <div className="agentDatabase">
      <div className="agentDatabase_title">База агентов</div>
      <div className="agentDatabase_items_section">
        <div className="agentDatabaseCategory">
          <div className="agentDatabaseCategory_name">Имя</div>
          <div className="agentDatabaseCategory_mail">Почта</div>
          <div className="agentDatabaseCategory_tell">Телефон</div>
        </div>
        <ul className="agentDatabase_items">
          {loading ? agentBase.length ? agentBase.map((elem) => (
            <AgentDatabaseItems
              key={elem.id}
              addBlackList={addBlackList}
              email={elem.email}
              phone={elem.phone === '0' ? 'не указан' : parseClientNumber(elem.phone)}
              fio={elem.fio}
              id={elem.id}
            />
          )) : 'база пуста' : '...loading'}

        </ul>
      </div>
    </div>
  );
};

export default AgentBaseListHock(AgentDatabase);
