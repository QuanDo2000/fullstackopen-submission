import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Table } from 'react-bootstrap';

import Togglable from './Togglable';
import BlogForm from './BlogForm';

const Blogs = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem('loggedBlogappUser'));
    if (!user) {
      navigate('/login');
    }
  });

  const blogs = useSelector((state) => {
    return state.blogs.toSorted((a, b) => b.likes - a.likes);
  });

  const blogFormRef = useRef();

  return (
    <div>
      <h2>Blogs</h2>

      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm togglableRef={blogFormRef} />
      </Togglable>
      <br />
      <Table striped>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </td>
              <td>
                <Link to={`/users/${blog.user.id}`}>{blog.user.name}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Blogs;
