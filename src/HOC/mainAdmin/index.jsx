import React from 'react';
import HeaderBottom from '../../components/Header/HeaderBottom/HeaderBottom';

const AgenMainHeaderHOC = (Comp) => {
  const hoc = (props) => (
    <>
      <HeaderBottom {...props}/>
      <Comp />
    </>
  );
  return hoc;
};

export default AgenMainHeaderHOC;
