import React from 'react';
import HeaderAddButton from '../../components/Header/HeaderAddButton';

const HeaderAddButtonHoc = (Comp) => {
  const hoc = (props) => (
    <>
      <HeaderAddButton {...props} />
      <Comp />
    </>
  );
  return hoc;
};

export default HeaderAddButtonHoc;
