import React from 'react';
import NotificationsRequest from '../../components/NotificationsRequest';

const NotificationRequestHOC = (Comp) => {
  
  const hoc = (props) => (
    <>
      <NotificationsRequest {...props} />
      <Comp />
    </>
  );
  return hoc;
};

export default NotificationRequestHOC;
