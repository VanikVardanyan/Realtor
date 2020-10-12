import React from 'react';
import './style.scss';

const PhoneLoader = () => {
  console.log('sss');
  return (
    <div>
      <div className="spinner">
        <div className="bounce1" />
        <div className="bounce2" />
        <div className="bounce3" />
      </div>
    </div>
  );
};

export default PhoneLoader;
