import React from 'react';
import './style.scss';

const CommitAction = () => {
  console.log('action');

  return (
    <div className="commitAction">
      <div className="commitAction_item">
        <div className="commitAction_title">Вы уверены что хотите совершить это действие?</div>
        <div className="commitAction_choice_section">
          <button
            type="button"
            className="commitAction_noBtn"
          >
            Нет
          </button>
          <button
            type="button"
            className="commitAction_yesBtn"
          >
            Да
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommitAction;
