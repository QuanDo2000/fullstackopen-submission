import { useState } from 'react';
import { useApolloClient, useQuery } from '@apollo/client';

import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import PhoneForm from './components/PhoneForm';
import LoginForm from './components/LoginForm';

import { ALL_PERSONS } from './queries';

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }

  return <div style={{ color: 'red' }}>{errorMessage}</div>;
};

const App = () => {
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const client = useApolloClient();

  const result = useQuery(ALL_PERSONS);

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm setToken={setToken} setError={notify} />
      </div>
    );
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <button onClick={logout}>logout</button>
      <Persons setError={notify} persons={result.data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </div>
  );
};

export default App;
