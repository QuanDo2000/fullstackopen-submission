import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMatch, useNavigate } from 'react-router-dom';
import { Button, Form, Row, Col, ListGroup } from 'react-bootstrap';

import { addComment, deleteBlog, likeBlog } from '../reducers/blogReducer';
import {
  setErrorNotification,
  setNotification,
} from '../reducers/notificationReducer';

const BlogView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [comment, setComment] = useState('');

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

  const handleComment = () => {
    if (comment === '') {
      return;
    }

    dispatch(addComment(blog, comment))
      .then(dispatch(setNotification(`Comment ${comment} added`, 5)))
      .catch((error) => {
        dispatch(setErrorNotification(error.response.data.error, 5));
      });
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
        {blog.likes} likes{' '}
        <Button size="sm" onClick={handleLike}>
          like
        </Button>
      </div>
      <div>added by {blog.user ? blog.user.name : 'Undefined'}</div>
      {blog.user &&
      user &&
      blog.user.username === user.username &&
      blog.user.name === user.name ? (
        <Button onClick={handleRemove}>remove</Button>
      ) : null}

      <h3>Comments</h3>
      <Form>
        <Form.Group as={Row} controlId="comment">
          <Col sm={5}>
            <Form.Control
              type="text"
              name="comment"
              value={comment}
              onChange={({ target }) => setComment(target.value)}
            />
          </Col>
          <Col sm={2}>
            <Button onClick={handleComment}>add comment</Button>
          </Col>
        </Form.Group>
      </Form>
      <br />
      <ListGroup>
        <Col sm={7}>
          {blog.comments.map((comment, index) => (
            <ListGroup.Item key={index}>{comment}</ListGroup.Item>
          ))}
        </Col>
      </ListGroup>
    </div>
  );
};

export default BlogView;
