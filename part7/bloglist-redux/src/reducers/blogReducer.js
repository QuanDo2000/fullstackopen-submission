import { createSlice } from '@reduxjs/toolkit';

import blogService from '../services/blogs';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    updateBlog: (state, action) => {
      return state.map((blog) =>
        blog.id !== action.payload.id ? blog : action.payload
      );
    },
    setBlogs: (state, action) => {
      return action.payload;
    },
    appendBlog: (state, action) => {
      state.push(action.payload);
    },
    removeBlog: (state, action) => {
      return state.filter((blog) => blog.id !== action.payload);
    },
  },
});

export const { updateBlog, setBlogs, appendBlog, removeBlog } =
  blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blogObject);
    dispatch(appendBlog(newBlog));
  };
};

export const likeBlog = (blogObject) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(blogObject.id, blogObject);
    dispatch(updateBlog(updatedBlog));
  };
};

export const deleteBlog = (blogObject) => {
  return async (dispatch) => {
    await blogService.remove(blogObject.id);
    dispatch(removeBlog(blogObject.id));
  };
};

export default blogSlice.reducer;
