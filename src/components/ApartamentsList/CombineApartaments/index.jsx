import React from 'react';
import './style.scss';
import ApartamentsList from '..';
import Union from '../../../assect/image/Union.png';

const CombineApartaments = () => {
  console.log('combine')
  return(
    <div className="combineApartaments">
      <div className="cobmibeApartamentsItem">
      <ApartamentsList />
      </div>
      <div className="combineApartamentsButton">
        <button
          type="button"
          className="combine_btn"
        >
          <img src={Union} alt="Union"/>
          Объединить
        </button>
        <button
          type="button"
          className="combine_other_btn"
        >
          <img src={Union} alt="Union"/>
          Другая
        </button>
      </div>

    </div>
  );
};

export default CombineApartaments;
