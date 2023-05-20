import { useRef } from 'react';
import { useSelector } from 'react-redux';
import Togglable from './Togglable';
import BlogForm from './BlogForm';
import { Link } from 'react-router-dom';

const Blogs = () => {
  const blogs = useSelector((state) => {
    return state.blogs.toSorted((a, b) => b.likes - a.likes);
  });

  const blogFormRef = useRef();

  return (
    <div>
      <h2>blogs</h2>

      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm togglableRef={blogFormRef} />
      </Togglable>

      {blogs.map((blog) => (
        <div className="blog" key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} {blog.author}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Blogs;
