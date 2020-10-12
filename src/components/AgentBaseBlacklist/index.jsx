import React, { useState } from 'react';
import './style.scss';
import { useHistory } from 'react-router-dom';
import AgenMainHeaderHOC from '../../HOC/mainAdmin';

const AgentBaseBlacklist = () => {
  const history = useHistory();
  const handleClickAgentDataBase = () => {
    history.push('/agentBaseList');
  };
  const handleClickBlackList = () => {
    history.push('/agentBaseBlackList');
  };

  return (
    <div className="agentBaseBlacklist">
      <div className="agentBaseBlacklist_btnGroup">
        <button
          type="button"
          className="agentBaseBlacklist_agentBtn"
          onClick={handleClickAgentDataBase}
        >
          База агентов
        </button>
        <button
          type="button"
          className="agentBaseBlacklist_blackListBtn"
          onClick={handleClickBlackList}
        >
          Черный список
        </button>
      </div>
    </div>
  );
};

export default AgenMainHeaderHOC(AgentBaseBlacklist);
