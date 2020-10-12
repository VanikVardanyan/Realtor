import React, { useEffect, useState } from 'react';
import './style.scss';
import BlackListItems from './BlackListItems';
import request from '../../../constants/api';
import AgentBaseListHock from '../../../HOC/AgentBaseListHock';

const BlackList = () => {
  const [loading, setLoading] = useState(false);
  const [agentBase, setAgentBase] = useState([])

  useEffect(() => {
    request().get('/auth/admin/agent/block')
      .then((res) => {
        setAgentBase(res.data);
        setLoading(true);
      })
      .catch((err) => {
        setLoading(true);
        console.log('error', err);
      });
  }, []);
  const parseClientNumber = (num) => {
    const oneNum = num.slice(0, 3);
    const thoNum = num.slice(3, 6);
    const threeNum = num.slice(6, 8);
    const fourNum = num.slice(8, 10);
    const newNum = `+7(${oneNum}) ${thoNum}-${threeNum}-${fourNum}`;
    return newNum;
  };
  const handleDeletInList = (id) => {
    const newList = agentBase.filter((elem) => elem.id !== id)
    setAgentBase(newList)
  }
  return (
    <div className="blackList">
      <div className="blackList_title">Черный список</div>
      <div className="blackList_items_section">
        <div className="blackListCategory">
          <div className="blackListCategory_name">Имя</div>
          <div className="blackListCategory_mail">Почта</div>
          <div className="blackListCategory_tell">Телефон</div>
        </div>
        <ul className="blackList_items">
          {
            loading ? agentBase.length ? agentBase.map((elem) => <BlackListItems handleDeletInList={handleDeletInList} fio={elem.fio} email={elem.email} id={elem.id} phone={elem.phone === '0' ? 'не указан' : parseClientNumber(elem.phone)} />) : 'в черном списке некого нет' : '...loading'
         }
        </ul>
      </div>
    </div>
  );
};

export default AgentBaseListHock(BlackList);
