import { useState } from 'react';
import { useUserDispatch } from '../UserContext';

import loginService from '../services/login';
import blogService from '../services/blogs';
import {
  showNotification,
  useNotificationDispatch,
} from '../NotificationContext';

const LoginForm = () => {
  const notificationDispatch = useNotificationDispatch();
  const userDispatch = useUserDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      userDispatch({
        type: 'SET_USER',
        data: user,
      });
      setUsername('');
      setPassword('');
    } catch (exception) {
      showNotification(notificationDispatch, 'Wrong credentials', true, 5);
    }
  };

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
