import { useDispatch, useSelector } from 'react-redux';
import { useMatch, useNavigate } from 'react-router-dom';
import { deleteBlog, likeBlog } from '../reducers/blogReducer';
import {
  setErrorNotification,
  setNotification,
} from '../reducers/notificationReducer';

const BlogView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  const match = useMatch('/blogs/:id');
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null;

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
      dispatch(deleteBlog(blog))
        .then(() => {
          dispatch(
            setNotification(`Blog ${blog.title} by ${blog.author} removed`, 5)
          );
          navigate('/blogs');
        })
        .catch((error) => {
          dispatch(setErrorNotification(error.response.data.error, 5));
        });
    }
  };

  if (!blog) {
    return null;
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <div>
        <a>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes <button onClick={handleLike}>like</button>
      </div>
      <div>added by {blog.user ? blog.user.name : 'Undefined'}</div>
      {blog.user &&
      user &&
      blog.user.username === user.username &&
      blog.user.name === user.name ? (
        <button onClick={handleRemove}>remove</button>
      ) : null}
    </div>
  );
};

export default BlogView;
