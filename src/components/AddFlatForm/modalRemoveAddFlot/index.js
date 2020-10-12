/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {nanoid} from 'nanoid';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import elipse from '../../../assect/image/elipse.png';
import './style.scss';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function TransitionsModal({ params, handleDeletPic }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const newParam = params.filter((elem) => !elem.name && elem.length >= 10);

  return (
    <div>
      <button type="button" onClick={handleOpen} className="addFloatForm_data-container_btn-all">
        <img src={elipse} alt="elipse" />
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
            {
               params.length ? params[0].name ? params.map((elem, index) => (
                 <div className="document__parametrs" key={nanoid()}>
                   {elem.name ? elem.name : `+7 ${elem}`}
                   {' '}
                   <button type="button" onClick={() => handleDeletPic(index)}>X</button>
                 </div>
               )) : newParam.length ? newParam.map((elem, index) => (
                 <div className="document__parametrs" key={nanoid()}>
                   { `+7 ${elem}`}
                   {' '}
                   <button type="button" onClick={() => handleDeletPic(index)}>X</button>
                 </div>
               )) : 'нечего не выбрано' : 'нечего не выбрано'
           }
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
