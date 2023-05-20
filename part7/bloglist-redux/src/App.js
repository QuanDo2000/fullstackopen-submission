import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { initializeBlogs } from './reducers/blogReducer';
import { initializeUser } from './reducers/userReducer';

import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import Blogs from './components/Blogs';
import UsersView from './components/UsersView';
import Nav from './components/Nav';
import { initializeUsers } from './reducers/usersReducer';
import UserView from './components/UserView';
import BlogView from './components/BlogView';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUser());
    dispatch(initializeUsers());
  }, [dispatch]);

  return (
    <div>
      <Nav />
      <h1>BlogList App</h1>
      <Notification />
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<BlogView />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/users" element={<UsersView />} />
        <Route path="/users/:id" element={<UserView />} />
      </Routes>
    </div>
  );
};

export default App;
