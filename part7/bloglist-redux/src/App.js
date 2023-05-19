import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import {
  setErrorNotification,
  setNotification,
} from './reducers/notificationReducer';

import Notification from './components/Notification';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';

import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const dispatch = useDispatch();

  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      setUser(user);
    }
  }, []);

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility();
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      dispatch(
        setNotification(
          `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
          5
        )
      );
    });
  };

  const likeBlog = (blogObject) => {
    blogService.update(blogObject.id, blogObject).then((returnedBlog) => {
      const updatedBlogs = blogs.map((blog) =>
        blog.id !== blogObject.id ? blog : returnedBlog
      );
      setBlogs(updatedBlogs);
      dispatch(
        setNotification(
          `Blog ${blogObject.title} by ${blogObject.author} liked`,
          2
        )
      );
    });
  };

  const removeBlog = (blogObject) => {
    if (
      window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)
    ) {
      blogService.remove(blogObject.id).then(() => {
        const updatedBlogs = blogs.filter((blog) => blog.id !== blogObject.id);
        setBlogs(updatedBlogs);
        dispatch(
          setNotification(
            `Blog ${blogObject.title} by ${blogObject.author} removed`,
            5
          )
        );
      });
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      dispatch(setErrorNotification('Wrong credentials', 5));
    }
  };

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

  return (
    <div>
      <h1>BlogList App</h1>
      <Notification />
      {user === null ? (
        <LoginForm
          handleSubmit={handleLogin}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          username={username}
          password={password}
        />
      ) : (
        <div>
          <h2>blogs</h2>
          <p>
            {user.name} logged in
            <button
              onClick={() => {
                window.localStorage.removeItem('loggedBlogappUser');
                setUser(null);
              }}
            >
              logout
            </button>
          </p>

          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>

          {sortedBlogs.map((blog) => (
            <div className="blog" key={blog.id}>
              <Blog
                key={blog.id}
                blog={blog}
                likeBlog={likeBlog}
                removeBlog={removeBlog}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
