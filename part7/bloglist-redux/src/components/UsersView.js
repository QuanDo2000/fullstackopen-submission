import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Table } from 'react-bootstrap';

const UsersView = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem('loggedBlogappUser'));
    if (!user) {
      navigate('/login');
    }
  });

  const users = useSelector((state) => state.users);

  if (!users) {
    return null;
  }

  const sortedUsers = users.toSorted((a, b) => b.blogs.length - a.blogs.length);

  return (
    <div>
      <h2>Users</h2>

      <Table striped>
        <thead>
          <tr>
            <th></th>
            <th>Blogs created</th>
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
      </Table>
    </div>
  );
};

export default UsersView;
