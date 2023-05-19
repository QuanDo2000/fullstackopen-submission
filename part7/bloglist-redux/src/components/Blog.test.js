import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Jest',
    url: 'https://jestjs.io/',
    likes: 10,
    user: {
      username: 'test',
      name: 'Test User',
    },
  };

  render(<Blog blog={blog} />);

  const element = screen.getByText(
    'Component testing is done with react-testing-library Jest'
  );
  expect(element).toBeDefined();

  const div = screen.queryByText('https://jestjs.io/');
  expect(div).toBeNull();
});

test('clicking the button shows url and likes', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Jest',
    url: 'https://jestjs.io/',
    likes: 10,
    user: {
      username: 'test',
      name: 'Test User',
    },
  };

  render(<Blog blog={blog} />);

  const user = userEvent.setup();
  const button = screen.getByText('view');
  await user.click(button);

  const div = screen.getByText('https://jestjs.io/');
  expect(div).toBeDefined();

  const likes = screen.getByText('likes 10');
  expect(likes).toBeDefined();
});

test('clicking the like button twice calls event handler twice', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Jest',
    url: 'https://jestjs.io/',
    likes: 10,
    user: {
      username: 'test',
      name: 'Test User',
    },
  };

  const mockHandler = jest.fn();

  render(<Blog blog={blog} likeBlog={mockHandler} />);

  const user = userEvent.setup();
  const button = screen.getByText('view');
  await user.click(button);

  const likeButton = screen.getByText('like');
  await user.click(likeButton);
  await user.click(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
