import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Button } from 'react-bootstrap';

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
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control
            id="title"
            value={newBlog}
            onChange={({ target }) => setNewBlog(target.value)}
            placeholder="enter title here"
          />
          <Form.Label>author:</Form.Label>
          <Form.Control
            id="author"
            value={newAuthor}
            onChange={({ target }) => setNewAuthor(target.value)}
            placeholder="enter author here"
          />
          <Form.Label>url:</Form.Label>
          <Form.Control
            id="url"
            value={newUrl}
            onChange={({ target }) => setNewUrl(target.value)}
            placeholder="enter url here"
          />
          <Button id="create-button" type="submit">
            create
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default BlogForm;
