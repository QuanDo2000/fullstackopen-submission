import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import Select from 'react-select';

import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries';

const Authors = (props) => {
  const [name, setName] = useState(null);
  const [born, setBorn] = useState('');

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const result = useQuery(ALL_AUTHORS, {
    skip: !props.show,
  });

  if (!props.show || result.loading) {
    return null;
  }

  const updateAuthor = (event) => {
    event.preventDefault();

    editAuthor({ variables: { name: name.value, born: parseInt(born) } });

    setName(null);
    setBorn('');
  };

  const authors = result.data.allAuthors;
  const options = authors.map((a) => ({ value: a.name, label: a.name }));

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Set birthyear</h3>
      <form onSubmit={updateAuthor}>
        <Select options={options} value={name} onChange={setName} />
        <div>
          born{' '}
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Authors;
