import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import blogService from '../services/blogs';
import {
  showNotification,
  useNotificationDispatch,
} from '../NotificationContext';

const BlogForm = ({ togglableRef }) => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();

  const [newBlog, setNewBlog] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newUrl, setNewUrl] = useState('');

  const createBlogMutation = useMutation(blogService.create, {
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData('blogs');
      queryClient.setQueryData('blogs', [...blogs, newBlog]);
      showNotification(
        dispatch,
        `Blog ${newBlog.title} by ${newBlog.author} created successfully`,
        false,
        5
      );
    },
  });

  const addBlog = (event) => {
    event.preventDefault();
    togglableRef.current.toggleVisibility();
    createBlogMutation.mutate({
      title: newBlog,
      author: newAuthor,
      url: newUrl,
    });

    setNewBlog('');
    setNewAuthor('');
    setNewUrl('');
  };

  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            id="title"
            value={newBlog}
            onChange={({ target }) => setNewBlog(target.value)}
            placeholder="enter title here"
          />
        </div>
        <div>
          author:
          <input
            id="author"
            value={newAuthor}
            onChange={({ target }) => setNewAuthor(target.value)}
            placeholder="enter author here"
          />
        </div>
        <div>
          url:
          <input
            id="url"
            value={newUrl}
            onChange={({ target }) => setNewUrl(target.value)}
            placeholder="enter url here"
          />
        </div>
        <button id="create-button" type="submit">
          create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
