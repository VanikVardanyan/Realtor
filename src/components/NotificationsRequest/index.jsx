import React from 'react';
import './style.scss';
import { useHistory, useLocation } from 'react-router-dom';
import AgenMainHeaderHOC from '../../HOC/mainAdmin';

const NotificationRequest = () => {
  const history = useHistory();
  const location = useLocation();
  const queryActions = () => {
    history.push('/apartamentAction');
  };

  const apartamentAction = () => {
    history.push('/queryActions');
  };

  const apartamentsComparison = () => {
    history.push('/apartamentsComparison');
  };

  return (
    <>
      <div className="notificationRequest">
        <div className="NotificationRequest_btn_section">
          <button
            type="button"
            className="queryActions_btn"
            onClick={apartamentAction}
            style={{ background: location.pathname === '/queryActions' ? '#E5E5E5' : 'white' }}
          >
            Действия по запросам
          </button>
          <button
            type="button"
            className="apartmentActions_btn"
            onClick={queryActions}
            style={{ background: location.pathname === '/apartamentAction' ? '#E5E5E5' : 'white' }}
          >
            Действия по квартирам
          </button>
          <button
            type="button"
            className="apartmentsComparison_btn"
            onClick={apartamentsComparison}
            style={{ background: location.pathname === '/apartamentsComparison' ? '#E5E5E5' : 'white' }}
          >
            Квартиры на сравнение
          </button>
        </div>
        <div className="activeSection" />
      </div>
    </>
  );
};

export default AgenMainHeaderHOC(NotificationRequest);
