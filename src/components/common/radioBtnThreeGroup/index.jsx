import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';

const GreenRadio = withStyles({
  root: {
    color: '#6CC3C7;',
    width: '20px',
    height: '20px',
    '&$checked': {
      color: '#6CC3C7',
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const RadioBtnThreeGroup = ({
  classname, title1, title2, title3, onClick,
}) => {
  const [selectedValue, setSelectedValue] = useState();

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    onClick(event.target.value);
  };
  return (
    <div className={classname || ''}>
      <div>
        <GreenRadio
          checked={selectedValue === title1}
          onChange={handleChange}
          value="Не актуально"
          color="default"
          name="radio-button-demo"
          inputProps={{ 'aria-label': 'D' }}
          id={title1}
        />
        <label htmlFor={title1}>{title1}</label>
      </div>
      <div>
        <GreenRadio
          checked={selectedValue === title2}
          onChange={handleChange}
          value="Сдано"
          name="radio-button-demo"
          inputProps={{ 'aria-label': 'm' }}
          id={title2}
        />
        <label htmlFor={title2}>{title2}</label>
      </div>
      <div>
        <GreenRadio
          checked={selectedValue === title3}
          onChange={handleChange}
          value="Завершено"
          name="radio-button-demo"
          inputProps={{ 'aria-label': 'q' }}
          id={title3}
        />
        <label htmlFor={title3}>{title3}</label>
      </div>
    </div>
  );
};

export default RadioBtnThreeGroup;
