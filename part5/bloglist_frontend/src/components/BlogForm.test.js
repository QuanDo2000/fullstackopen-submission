import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BlogForm from './BlogForm';
import userEvent from '@testing-library/user-event';

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = jest.fn();
  const user = userEvent.setup();

  render(<BlogForm createBlog={createBlog} />);

  const title = screen.getByPlaceholderText('enter title here');
  const author = screen.getByPlaceholderText('enter author here');
  const url = screen.getByPlaceholderText('enter url here');
  const sendButton = screen.getByText('create');

  await user.type(title, 'testing a form...');
  await user.type(author, 'test author');
  await user.type(url, 'test url');
  await user.click(sendButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe('testing a form...');
  expect(createBlog.mock.calls[0][0].author).toBe('test author');
  expect(createBlog.mock.calls[0][0].url).toBe('test url');
});
