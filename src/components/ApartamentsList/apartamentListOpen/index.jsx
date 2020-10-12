import React,{useState} from 'react';
import './style.scss';
import { Link } from 'react-router-dom';
import { nanoid } from 'nanoid';
import pen from '../../../assect/image/penIcon.svg';

const ApartamentListOpen = ({
  name, phones, comment, documents,
}) => {
  const parseClientNumber = (num) => {
    const oneNum = num.slice(0, 3);
    const thoNum = num.slice(3, 6);
    const threeNum = num.slice(6, 8);
    const fourNum = num.slice(8, 10);
    const newNum = `+7(${oneNum}) ${thoNum}-${threeNum}-${fourNum}`;
    return newNum;
  };
  const [phoneVew, setPhoneVew] = useState(1)
  const [docVew, setDocVew] = useState(1)

  return (
    <div className="apartamentListOpen">
      <div className="apartamentListOpen_items_section">
        <div className="apartamentListOpen_item">
          <div className="apartamentListOpen_title">Имя</div>
          <div className="apartamentListOpen_ivestment">
            {name}
          </div>
        </div>
        <div className="apartamentListOpen_coment_section">
          <div className="apartamentListOpen_title">Коментарий</div>
          <textarea className="apartamentListOpenTop_textArea" value={comment} disabled />
        </div>
        <div className="apartamentListOpen_coment_section">
          <div className="apartamentListOpen_title">Причина отказа</div>
          <textarea className="apartamentListOpenBottom_textArea" disabled />
        </div>
      </div>
      <div className="apartamentListOpen_contacts">
        <div className="test">
          <div className="apartamentListOpen_contact_section_Btn">
            <div className="apartamentListOpen_title">Телефоны</div>
            {
              phones.length ? phones.slice(0,phoneVew).map((elem) => (
                <div key={nanoid()} className="apartamentListOpen_subTitle">{parseClientNumber(elem).length > 9 ? parseClientNumber(elem) : ''}</div>

              )) : 'номер не указан'
            }
            <button
              type="button"
              onClick={() => setPhoneVew((prevstate)=> prevstate+1)}
            >Еще телефоны</button>
          </div>
          <div className="apartamentListOpen_contact_section_Btn">
            <div className="apartamentListOpen_title">Телефоны</div>
            {
              documents.length ? documents.slice(0,docVew).map((elem) => (
                <Link
                  key={nanoid()}
                  className="apartamentListOpen_subTitle"
                  to={`http://agentdubna.ru/api/flat/document/${elem}`}
                  target="_blank"
                  download
                >
                  Download
                </Link>
              )) : (<div className="noDocumentText"> документов нет </div>)
            }

            <button
              type="button"
              onClick={()=>  setDocVew((prevstate)=> prevstate+1)}
            >Еще документы</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApartamentListOpen;
