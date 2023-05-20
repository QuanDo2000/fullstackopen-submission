import { useSelector } from 'react-redux';
import { ListGroup, Col } from 'react-bootstrap';
import { Link, useMatch } from 'react-router-dom';

const UserView = () => {
  const users = useSelector((state) => state.users);

  const match = useMatch('/users/:id');
  const user = match ? users.find((user) => user.id === match.params.id) : null;

  if (!user) {
    return null;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ListGroup>
        <Col sm={7}>
          {user.blogs.map((blog) => (
            <ListGroup.Item key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </ListGroup.Item>
          ))}
        </Col>
      </ListGroup>
    </div>
  );
};

export default UserView;
