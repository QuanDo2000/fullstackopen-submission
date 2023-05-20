import { useSelector } from 'react-redux';
import { Link, useMatch } from 'react-router-dom';

const UserView = () => {
  const users = useSelector((state) => state.users);

  const match = useMatch('/users/:id');
  const user = match ? users.find((user) => user.id === match.params.id) : null;

  if (!user) {
    return null;
  }
  console.log(user);

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserView;
