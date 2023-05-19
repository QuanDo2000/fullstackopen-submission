import { useNotificationValue } from '../NotificationContext';

const Notification = () => {
  const notificationObject = useNotificationValue(
    (state) => state.notification
  );
  const message = notificationObject ? notificationObject.message : null;
  const error = notificationObject ? notificationObject.error : false;

  if (message === null) {
    return null;
  }

  if (error) {
    return <div className="error">{message}</div>;
  }

  return <div className="notification">{message}</div>;
};

export default Notification;
