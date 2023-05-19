import { useEffect, useRef } from 'react';
import { useQuery } from 'react-query';

import blogService from './services/blogs';

import Notification from './components/Notification';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';
import { initializeUser, useUserDispatch, useUserValue } from './UserContext';

const App = () => {
  const userDispatch = useUserDispatch();
  const user = useUserValue();

  const blogFormRef = useRef();

  useEffect(() => {
    initializeUser(userDispatch);
  }, []);

  const result = useQuery('blogs', blogService.getAll, {
    refetchOnWindowFocus: false,
  });
  console.log(result);

  if (result.isLoading) {
    return <div>Blog service not available due to problems in server.</div>;
  }

  const blogs = result.data.toSorted((a, b) => b.likes - a.likes);

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
                userDispatch({
                  type: 'CLEAR_USER',
                });
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
