import React from 'react';
import './style.scss';

const AboutAgent = () => {
  console.log('about agent');

  return (
    <div className="aboutAgent">
      <div className="aboutAgent_main_title">Информация об  агенте </div>
      <div className="aboutAgent_categoryName">
        <div className="aboutAgent_col">
          <div className="aboutAgent_title">Имя</div>
          <div className="aboutAgent_aboutAgent">Алексей</div>
        </div>
        <div className="aboutAgent_col">
          <div className="aboutAgent_title">Почта</div>
          <div className="aboutAgent_aboutAgent">arokinfa.lsjsa@yandex.ru</div>
        </div>
        <div className="aboutAgent_col">
          <div className="aboutAgent_title">Телефон</div>
          <div className="aboutAgent_aboutAgent">8-800-555-35-35</div>
        </div>
      </div>
      <div className="aboutAgent_action_agent">
        <div className="aboutAgent_title">Действия</div>
        <div className="agent_actions_items" />
      </div>
    </div>
  );
};

export default AboutAgent;
