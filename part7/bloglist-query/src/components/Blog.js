import { useState } from 'react';

const Blog = ({ blog, likeBlog, removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const user = JSON.parse(window.localStorage.getItem('loggedBlogappUser'));

  const [visible, setVisible] = useState(false);

  const handleLike = () => {
    likeBlog({
      ...blog,
      likes: blog.likes + 1,
    });
  };

  const handleRemove = () => {
    removeBlog(blog);
  };

  return (
    <div style={blogStyle}>
      {visible ? (
        <div>
          {blog.title} {blog.author}
          <button onClick={() => setVisible(false)}>hide</button>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}
            <button onClick={handleLike}>like</button>
          </div>
          <div>{blog.user ? blog.user.name : 'Undefined'}</div>
          {blog.user &&
          user &&
          blog.user.username === user.username &&
          blog.user.name === user.name ? (
            <button onClick={handleRemove}>remove</button>
          ) : null}
        </div>
      ) : (
        <div>
          {blog.title} {blog.author}
          <button onClick={() => setVisible(true)}>view</button>
        </div>
      )}
    </div>
  );
};

export default Blog;
