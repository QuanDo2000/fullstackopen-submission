import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';
import { likeBlog, deleteBlog } from '../reducers/blogReducer';

const Blog = ({ blog }) => {
  const dispatch = useDispatch();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const user = useSelector((state) => state.user);

  const [visible, setVisible] = useState(false);

  const handleLike = () => {
    dispatch(
      likeBlog({
        ...blog,
        likes: blog.likes + 1,
      })
    );

    dispatch(setNotification(`Blog ${blog.title} by ${blog.author} liked`, 2));
  };

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog));
      dispatch(
        setNotification(`Blog ${blog.title} by ${blog.author} removed`, 5)
      );
    }
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
