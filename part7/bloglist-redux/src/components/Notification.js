import { useSelector } from 'react-redux';

const Notification = () => {
  const { message, error } = useSelector((state) => state.notification);
  if (message === '') {
    return null;
  }

  if (error) {
    return <div className="error">{message}</div>;
  }

  return <div className="notification">{message}</div>;
};

export default Notification;
