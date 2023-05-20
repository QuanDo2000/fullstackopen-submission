import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../reducers/userReducer';
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const padding = {
    padding: 5,
  };

  const navStyle = {
    backgroundColor: 'lightgrey',
    padding: 10,
  };

  return (
    <div style={navStyle}>
      <Link style={padding} to="/blogs">
        Blogs
      </Link>
      <Link style={padding} to="/users">
        Users
      </Link>
      {user ? (
        <em style={padding}>
          {user.name} logged in{' '}
          <button
            onClick={() => {
              window.localStorage.removeItem('loggedBlogappUser');
              dispatch(removeUser());
              navigate('/');
            }}
          >
            Logout
          </button>
        </em>
      ) : (
        <Link style={padding} to="/login">
          Login
        </Link>
      )}
    </div>
  );
};

export default Nav;
