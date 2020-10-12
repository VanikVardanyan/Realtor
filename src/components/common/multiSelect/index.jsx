import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import './style.scss';
import Chip from '@material-ui/core/Chip';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const cetizenship = [
  { title: '-', ind: null },
  { title: 'Александровка', ind: 0 },
  { title: 'БВ', ind: 1 },
  { title: 'ЧР', ind: 2 },
  { title: 'ИЧ', ind: 3 },
  { title: 'ЛБ', ind: 4 },
];

const MultiSelect = ({ onClick, value, setValue }) => {
  const valueId = value
    .map(({ ind }) => ind);

  const filtredOptions = cetizenship.filter(({ ind }) => !valueId.includes(ind));
  return (
    <Autocomplete
      multiple
      id="fixed-tags-demo"
      value={value}
      onChange={(event, newValue) => {
        setValue([
          ...newValue,
        ]);
      }}
      options={filtredOptions}
      getOptionLabel={(option) => option.title}
      renderTags={(tagValue, getTagProps) => tagValue.map((option, index) => (
        <Chip
          label={option.title}
          {...getTagProps({ index })}
        />
      ))}
      renderInput={(params) => (
        <TextField {...params} label="" variant="outlined" placeholder="-" />
      )}
    />
  );
};

export default MultiSelect;
