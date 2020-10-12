/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import AgenMainHeaderHOC from '../../../HOC/mainAdmin';
import ApartamentsList from '..';
import request from '../../../constants/api';
import RequestLoader from '../../loaderRequest/loaderRequest';

const ApartamentListWrapper = () => {
  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    request().get('/flat')
      .then((res) => {
        setdata(res.data);
        setLoading(true);
      })
      .catch((err) => {
        setLoading(true);
        console.log('error', err);
      });
  }, []);
  return (
    <div>

      {
          loading ? data.length ? data.map((elem) => (
            <ApartamentsList
              key={nanoid()}
              additional={elem.additional}
              children={elem.children}
              comment={elem.comment}
              district={elem.district}
              documents={elem.documents}
              flatNumber={elem.flatNumber}
              foreigners={elem.foreigners}
              id={elem.id}
              link={elem.link}
              name={elem.name}
              numberHouse={elem.numberHouse}
              phones={elem.phones}
              pictures={elem.pictures}
              price={elem.price}
              rating={elem.rating}
              releaseDate={elem.releaseDate}
              roomNumber={elem.roomNumber}
              street={elem.street}

            />
          )) : 'нет квартир' : (<RequestLoader />)
      }
    </div>
  );
};

export default AgenMainHeaderHOC(ApartamentListWrapper);
