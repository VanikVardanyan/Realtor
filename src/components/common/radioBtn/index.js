import React, { useEffect } from 'react';
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

const RadioBtn = ({ classname, title1, title2, value, onClick }) => {
  const [selectedValue, setSelectedValue] = React.useState(title1);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  useEffect(() => {
    if (!value) setSelectedValue(title1);
  }, [value]);

  return (
    <div className={classname || ''}>
      <div>
        <GreenRadio
          checked={selectedValue && selectedValue === title1}
          onChange={handleChange}
          value={title1}
          onClick = {onClick}
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
          value= {title2}
          onClick={onClick}
          name="radio-button-demo"
          inputProps={{ 'aria-label': 'm' }}
          id={title2}
        />
        <label htmlFor={title2}>{title2}</label>
      </div>
    </div>
  );
};

export default RadioBtn;
