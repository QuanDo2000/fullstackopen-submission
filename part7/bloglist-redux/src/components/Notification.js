import { useSelector } from 'react-redux';
import { Alert } from 'react-bootstrap';

const Notification = () => {
  const { message, error } = useSelector((state) => state.notification);
  if (message === '') {
    return null;
  }

  if (error) {
    return <Alert variant="danger">{message}</Alert>;
  }

  return <Alert variant="success">{message}</Alert>;
};

export default Notification;
