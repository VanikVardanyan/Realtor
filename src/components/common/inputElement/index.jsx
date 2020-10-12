import React, { useState, useEffect } from 'react';
import './style.scss';

const InputElement = ({
  className, value, typeInp = 'text', w = '170px', backText = '', onChange, dis = false, min ,max, err
}) => {
  const dateProps = {
    ...!!min && { min },
    ...!!max && { max },
  };

  return (
    <div
      className={className || ''}
    >
      <input
        type={typeInp}
        className="rootInputContainer_inp"
        style={{ width: w, border: !err ? '1px solid #6CC3C7' : '1px solid red' }}
        placeholder={backText}
        onChange= {onChange}
        value={value}
        disabled={dis}
        {...dateProps}
      />
    </div>
  );
};

export default InputElement;
