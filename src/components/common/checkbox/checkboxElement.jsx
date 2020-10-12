import React, { useState } from 'react';

import { ReactComponent as CheckedImg } from '../../../assect/image/check.svg';
import { ReactComponent as CheckedContainerImg } from '../../../assect/image/checkContainer.svg';

import './style.scss';

const CheckboxElement = ({ label = 'Deti', defaultChecked = false, onChange , valueCheck, checked }) => {
  const handleChange = ({ target: { checked: newChecked } }) => {
    onChange(newChecked)
  };

  return (
    <div className="checkBoxCover">
      <label htmlFor={label}>
        <div className="checkBoxCoverCheckbox">
          <CheckedContainerImg className="checkBoxCoverCheckbox_container" />
          <CheckedImg
            className="checkBoxCoverCheckbox_check"
            style={{ display: checked ? 'block' : 'none' }}
          />
        </div>
        <input
          id={label}
          name = {valueCheck}
          type="checkbox"
          onChange={handleChange}
          checked={checked}
          value = {label}
        />
        {label}
      </label>
    </div>
  );
};
export default CheckboxElement;
