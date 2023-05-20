import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';

import loginService from '../services/login';
import blogService from '../services/blogs';

import { setUser } from '../reducers/userReducer';
import { setErrorNotification } from '../reducers/notificationReducer';

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem('loggedBlogappUser'));
    if (user) {
      navigate('/blogs');
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setUser(user));
      setUsername('');
      setPassword('');
      navigate('/blogs');
    } catch (exception) {
      dispatch(setErrorNotification('Wrong credentials', 5));
    }
  };

  return (
    <div>
      <h2>Log in to application</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Row>
            <Col sm={1}>
              <Form.Label>username:</Form.Label>
            </Col>
            <Col sm={3}>
              <Form.Control
                size="sm"
                id="username"
                type="text"
                value={username}
                name="Username"
                onChange={(event) => setUsername(event.target.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={1}>
              <Form.Label>password:</Form.Label>
            </Col>
            <Col sm={3}>
              <Form.Control
                size="sm"
                id="password"
                type="password"
                value={password}
                name="Password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </Col>
          </Row>
          <Button id="login-button" type="submit">
            login
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default LoginForm;
