import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from './reducers/blogReducer';
import { initializeUser, removeUser } from './reducers/userReducer';

import Notification from './components/Notification';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUser());
  }, [dispatch]);

  const blogs = useSelector((state) => {
    return state.blogs.toSorted((a, b) => b.likes - a.likes);
  });
  const user = useSelector((state) => state.user);

  const blogFormRef = useRef();

  return (
    <div>
      <h1>BlogList App</h1>
      <Notification />
      {user === null ? (
        <LoginForm />
      ) : (
        <div>
          <h2>blogs</h2>
          <p>
            {user.name} logged in
            <button
              onClick={() => {
                window.localStorage.removeItem('loggedBlogappUser');
                dispatch(removeUser());
              }}
            >
              logout
            </button>
          </p>

          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm togglableRef={blogFormRef} />
          </Togglable>

          {blogs.map((blog) => (
            <div className="blog" key={blog.id}>
              <Blog blog={blog} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
