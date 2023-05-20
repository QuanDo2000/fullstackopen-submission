import { useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  setErrorNotification,
  setNotification,
} from '../reducers/notificationReducer';
import { createBlog } from '../reducers/blogReducer';

const BlogForm = ({ togglableRef }) => {
  const dispatch = useDispatch();

  const [newBlog, setNewBlog] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newUrl, setNewUrl] = useState('');

  const addBlog = (event) => {
    event.preventDefault();
    dispatch(
      createBlog({
        title: newBlog,
        author: newAuthor,
        url: newUrl,
      })
    )
      .then(() => {
        togglableRef.current.toggleVisibility();
        dispatch(
          setNotification(`a new blog ${newBlog} by ${newAuthor} added`, 5)
        );

        setNewBlog('');
        setNewAuthor('');
        setNewUrl('');
      })
      .catch((error) => {
        console.log(error);

        dispatch(setErrorNotification('Error creating blog', 5));
      });
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
