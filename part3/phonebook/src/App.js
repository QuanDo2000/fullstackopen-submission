import { useEffect, useState } from 'react';
import personService from './services/persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';

const showNotification = (message, error, setErrorMessage, setIsError) => {
  setIsError(error);
  setErrorMessage(message);
  setTimeout(() => {
    setErrorMessage(null);
  }, 5000);
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
        setErrorMessage(null);
      })
      .catch((error) => {
        console.log(error.response.data.error);
        showNotification(
          'Could not fetch data from server',
          true,
          setErrorMessage,
          setIsError
        );
      });
  }, []);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      persons.some(
        (person) => person.name === newName && person.number === newNumber
      )
    ) {
      showNotification(
        `${newName} is already added to phonebook`,
        true,
        setErrorMessage,
        setIsError
      );
      return;
    } else if (
      persons.some(
        (person) => person.name === newName && person.number !== newNumber
      )
    ) {
      const person = persons.find((p) => p.name === newName);
      const confirm = window.confirm(
        `${person.name} is already added to phonebook, replace the old number with a new one?`
      );

      if (confirm) {
        const updatedPerson = { ...person, number: newNumber };

        personService
          .update(person.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) => (p.id !== person.id ? p : returnedPerson))
            );
            setNewName('');
            setNewNumber('');
            showNotification(
              `${person.name} was updated`,
              false,
              setErrorMessage,
              setIsError
            );
          })
          .catch((error) => {
            showNotification(
              `${error.response.data.error}`,
              true,
              setErrorMessage,
              setIsError
            );
          });
      }
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    personService
      .create(newPerson)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
        showNotification(
          `${newPerson.name} was added`,
          false,
          setErrorMessage,
          setIsError
        );
      })
      .catch((error) => {
        showNotification(
          `${error.response.data.error}`,
          true,
          setErrorMessage,
          setIsError
        );
      });
  };

  const handleDeletePerson = (id) => {
    const person = persons.find((p) => p.id === id);
    const confirm = window.confirm(`Delete ${person.name}?`);

    if (confirm) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id));
          showNotification(
            `${person.name} was deleted`,
            false,
            setErrorMessage,
            setIsError
          );
        })
        .catch((error) => {
          showNotification(
            `${person.name} was already deleted from server`,
            true,
            setErrorMessage,
            setIsError
          );
          setPersons(persons.filter((p) => p.id !== id));
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} error={isError} />
      <Filter filter={searchTerm} handleFilterChange={handleSearchChange} />
      <h2>Add a new</h2>
      <PersonForm
        addPerson={handleSubmit}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filter={searchTerm}
        deletePerson={handleDeletePerson}
      />
    </div>
  );
};

export default App;
