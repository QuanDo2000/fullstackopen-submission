import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';

import { removeUser } from '../reducers/userReducer';

const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const padding = {
    padding: 5,
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/blogs">
              Blogs
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/users">
              Users
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            {user ? (
              <em style={padding}>
                {user.name} logged in{' '}
                <Button
                  onClick={() => {
                    window.localStorage.removeItem('loggedBlogappUser');
                    dispatch(removeUser());
                    navigate('/');
                  }}
                >
                  Logout
                </Button>
              </em>
            ) : (
              <Link style={padding} to="/login">
                Login
              </Link>
            )}
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
