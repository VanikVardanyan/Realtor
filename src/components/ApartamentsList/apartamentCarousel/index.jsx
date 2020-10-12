import React, { useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import imageitems from '../../../assect/image/imageItems.svg';
import './style.scss';
import {nanoid} from 'nanoid'

const ApartamentsCarousel = ({ pictures, id }) => {
  return (
    <div style={{ width: '257px', height: '246px' }}>
      <Carousel>
        {
            pictures.length ? pictures.map((elem) => (
              <div key={nanoid()}>
                <img src={`http://agentdubna.ru/api/flat/img/${elem}`} alt="item" />
              </div>
            )) : (
              <div>
                <img src={imageitems} alt="item" />
              </div>
            )
          }

      </Carousel>
    </div>
  );
};

export default ApartamentsCarousel;
