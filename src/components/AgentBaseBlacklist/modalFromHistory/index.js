/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import request from '../../../constants/api';
import './style.scss';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    margin: 'auto',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    // padding: theme.spacing(2, 4, 3),
    width: '100%',
    padding: '15px',
    // minHeight: '80vh',
    position: 'relative',
  },
  titleClass: {
    fontStyle: 'normal',
    fontWeight: '300',
    fontSize: '24px',
    lineHeight: '29px',
    marginBottom: '56px',
    marginTop: '56px',
  },
  wrapperInfoAgent: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: '27px',
  },
  wrapperInfoAgentTitle: {
    fontWeight: '300',
    fontSize: '20px',
    lineHeight: '24px',
    color: '#AFAFAF',
    marginBottom: '16px',
  },
  clearBtn: {
    padding: '5px',
    height: '43px',
    background: '#AFAFAF',
    borderRadius: '10px',
    fontSize: '22px',
    color: 'white',
    border: 'none',
    outline: 'none',
  },
  wraperItems: {
    height: '397px',
    overflowY: 'auto',
  },
}));

const parseClientNumber = (num) => {
  const oneNum = num.slice(0, 3);
  const thoNum = num.slice(3, 6);
  const threeNum = num.slice(6, 8);
  const fourNum = num.slice(8, 10);
  const newNum = `+7(${oneNum}) ${thoNum}-${threeNum}-${fourNum}`;
  return newNum;
};

export default function HistoryModal({
  className, id, name, email, phone,
}) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setLoading(false);
    request().get(`/admin/agent/${id}`)
      .then((res) => {
        if (res.status === 204) {
          setLoading(true);
        } else {
          setData(res.data);
          setLoading(true);
        }
      })
      .catch((err) => console.log('error', err));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const typeParse = {
    0: '...',
    1: '...',
    2: 'просмотрел номера телефона',
    3: 'измененил статус',
  };

  const typeChangeParse = {
    0: 'Актуально',
    1: 'Не актуально',
    2: 'Сдано',
    3: 'Завершено',
  };
  const handleDeletHistory = () => {
    setLoading(false);
    request().post(`/admin/agent/${id}`)
      .then((res) => {
        if (res.status === 204) {
          setLoading(true);
          setData([]);

        } else {
          setData([]);
          setLoading(true);
        }
      })
      .catch((err) => console.log('error', err));
    setOpen(true);
  }
  return (
    <div>
      <button type="button" onClick={handleOpen} className={className}>
        Подробнее
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <div className={classes.titleClass}>Информация об  агенте </div>
            <div className={classes.wrapperInfoAgent}>
              <div>
                <div className={classes.wrapperInfoAgentTitle}>Имя</div>
                <div>{name}</div>
              </div>
              <div>
                <div className={classes.wrapperInfoAgentTitle}>Почта</div>
                <div>{email}</div>
              </div>
              <div>
                <div className={classes.wrapperInfoAgentTitle}>Телефон</div>
                <div>{phone}</div>
              </div>
            </div>
            <div className={classes.wraperItems}>
              {
                loading ? data.length ? data.map((elem) => (
                  <div className="historyNotificationModal">
                    {`${typeParse[elem.type]}  ${elem.data.phone ? parseClientNumber(elem.data.phone) : ''} ${elem.data.statusTo ? `${typeChangeParse[elem.data.statusFrom]} на ${typeChangeParse[elem.data.statusTo]}` : ''}`}
                    {' '}
                  </div>
                )) : 'нет информации для показа' : '...loading'
            }
            </div>
            <button
              type="button"
              className={classes.clearBtn}
              onClick={handleDeletHistory}
            >
              Очистить историю
            </button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
