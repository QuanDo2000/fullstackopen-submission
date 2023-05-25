import { useQuery } from '@apollo/client';
import { ALL_BOOKS, CURRENT_USER } from '../queries';

const Recommend = ({ show }) => {
  const currentUser = useQuery(CURRENT_USER);
  const result = useQuery(ALL_BOOKS, {
    variables: {
      genre: currentUser.data ? currentUser.data.me.favoriteGenre : null,
    },
    skip: !show,
    fetchPolicy: 'cache-and-network',
  });

  if (!currentUser.data) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  if (!show || !currentUser.data.me) {
    return null;
  }

  const books = result.data.allBooks;

  return (
    <div>
      <h2>recommendations</h2>
      <div>
        books in your favorite genre{' '}
        <strong>{currentUser.data.me.favoriteGenre}</strong>
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

export default Recommend;
