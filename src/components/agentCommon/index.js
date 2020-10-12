import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getListNotification } from '../../store/thunkAction/getListNotifications';
import { getPostNotificationData } from '../../store/selector/getPostNotificationData';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getUserFioId } from '../../store/selector/getUserFioId';

function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

const AdminNotificationViewed = ({ id }) => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const notificationText = useSelector(getPostNotificationData);
  const fio = useSelector(getUserFioId);
  const handleClickOpen = () => {
    dispatch(getListNotification(id));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const timeParse = (time) => {
    const dateStr = new Date(time);
    const humanreadableStr = `${dateStr.getHours()}:${dateStr.getMinutes()}`;
    return humanreadableStr;
  };

  const parseClientNumber = (num) => {
    const oneNum = num.slice(0, 3);
    const thoNum = num.slice(3, 6);
    const threeNum = num.slice(6, 8);
    const fourNum = num.slice(8, 10);
    const newNum = `+7(${oneNum}) ${thoNum}-${threeNum}-${fourNum}`;
    return newNum;
  };
  return (
    <div>
      <button
        className="sortList_icon_btn_eye"
        onClick={handleClickOpen}
      >
        <FontAwesomeIcon icon="eye" className="sortList_icon_btn_eye_i" />
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Просмотры
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {notificationText.data ? notificationText.data.map((elem) => <span key={elem.id}>{`ваш номер просмотрели ${parseClientNumber(elem.phone)} ${timeParse(elem.time)}`}</span>) : 'нет просмотров'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminNotificationViewed;
