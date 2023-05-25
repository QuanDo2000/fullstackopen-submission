import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';

const Books = (props) => {
  const [genre, setGenre] = useState('all genres');

  const allBooks = useQuery(ALL_BOOKS, {
    skip: !props.show,
    fetchPolicy: 'cache-and-network',
  });
  const result = useQuery(ALL_BOOKS, {
    variables: { genre: genre === 'all genres' ? null : genre },
    skip: !props.show,
    fetchPolicy: 'cache-and-network',
  });

  if (!props.show || result.loading || allBooks.loading) {
    return null;
  }

  const books = result.data.allBooks;

  const genres = allBooks.data.allBooks.reduce((acc, book) => {
    book.genres.forEach((genre) => {
      if (!acc.includes(genre)) {
        acc.push(genre);
      }
    });
    return acc;
  }, []);

  return (
    <div>
      <h2>books</h2>

      <div>
        in genre <strong>{genre}</strong>
      </div>

      <div>
        {genres.map((genre) => (
          <button key={genre} onClick={() => setGenre(genre)}>
            {genre}
          </button>
        ))}
        <button onClick={() => setGenre('all genres')}>all genres</button>
      </div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
