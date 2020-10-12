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

import { useDispatch, useSelector } from 'react-redux';
import { getQueryHistory } from '../../store/thunkAction/adminActionThunk/getQueryHistory';
import { getHistoryPostAdmin } from '../../store/selector/admin';

function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

const AdminNotificationHistory = ({ id }) => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const notificationText = useSelector(getHistoryPostAdmin);
  const handleClickOpen = () => {
    dispatch(getQueryHistory(id));
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const toISODateArivalDate = (milliseconds) => {
    if (milliseconds) {
      const date = new Date(milliseconds);
      const y = date.getFullYear();
      let m = date.getMonth() + 1;
      let d = date.getDate();
      m = (m < 10) ? `0${m}` : m;
      d = (d < 10) ? `0${d}` : d;
      return [y, m, d].join('.');
    }
    return 'Отсуствует';
  };

  const parseStatus = {
    0: 'Актуально',
    1: 'Не актуально',
    2: 'Сдано"',
    3: 'Завершено',
  };

  return (
    <div>
      <button
        className="sortList_icon_btn_eye"
        onClick={handleClickOpen}
      >
        <FontAwesomeIcon icon="history" />
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          История изменений статуса
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {notificationText.data ? notificationText.data.map((elem) => (
              <div key={elem.id}>
                {`${toISODateArivalDate(elem.time)}  ${elem.agentFio} изменил статус запроса с "${parseStatus[elem.statusFrom]}" на "${parseStatus[elem.statusTo]}"`}
                <hr />
              </div>

            )) : 'нет просмотров'}
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

export default AdminNotificationHistory;
