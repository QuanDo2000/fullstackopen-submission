import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import blogService from '../services/blogs';
import {
  showNotification,
  useNotificationDispatch,
} from '../NotificationContext';

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();

  const updateBlogMutation = useMutation(blogService.update, {
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData('blogs');
      queryClient.setQueryData(
        'blogs',
        blogs.map((blog) => (blog.id !== newBlog.id ? blog : newBlog))
      );
    },
  });

  const removeBlogMutation = useMutation(blogService.remove, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs');
    },
  });

  const user = JSON.parse(window.localStorage.getItem('loggedBlogappUser'));

  const [visible, setVisible] = useState(false);

  const handleLike = () => {
    updateBlogMutation.mutate({
      ...blog,
      likes: blog.likes + 1,
    });
  };

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlogMutation.mutate(blog.id);
      showNotification(
        dispatch,
        `Blog ${blog.title} by ${blog.author} removed`,
        false,
        5
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
