import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const UsersView = () => {
  const users = useSelector((state) => state.users);
  console.log(users);

  if (!users) {
    return null;
  }

  const sortedUsers = users.toSorted((a, b) => b.blogs.length - a.blogs.length);

  return (
    <div>
      <h2>Users</h2>

      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersView;
