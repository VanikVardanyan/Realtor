import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';

import './style.scss';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    position: 'relative',
    borderRadius: '10px',
    fontSize: 18,
    padding: '10px 26px 10px 12px',
    fontFamily: 'Montserrat',
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
    border: '1px solid #6CC3C7',
    borderRadius: '10px',
    fontStyle: 'normal',
    fontWeight: '300',
    fontSize: '22px',
    lineHeight: '27px',
  },
}));
const DropDown = ({
  className, title, optMenu, w = '170px', category = ['test'], onChange, mainText, value ,
}) => {
  const classes = useStyles();
  const [age, setAge] = React.useState('');
  const handleChange = (e) => {
    setAge(e.target.value);
  };
  return (
    <div className={className || ''}>
      <span className="dopdown_title">{title}</span>
      <FormControl className={classes.margin} style={{ width: w }}>
        <NativeSelect
          id="demo-customized-select-native"
          value={value}
          onChange={onChange}
          input={<BootstrapInput />}
          style={{ width: w , height: '43px'}}
        >
          {
            category.map((elem, id) => <option value={elem} onChange={(e) => handleChange(e.target.value)} key={id}>{elem}</option>)
          }
        </NativeSelect>

      </FormControl>
    </div>
  );
};

export default DropDown;
