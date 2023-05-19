import { createContext, useReducer, useContext } from 'react';
import blogService from './services/blogs';

const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data;
    case 'CLEAR_USER':
      return null;
    default:
      return state;
  }
};

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, dispatch] = useReducer(userReducer, null);

  return (
    <UserContext.Provider value={[user, dispatch]}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserValue = () => {
  const userAndDispatch = useContext(UserContext);
  return userAndDispatch[0];
};

export const useUserDispatch = () => {
  const userAndDispatch = useContext(UserContext);
  return userAndDispatch[1];
};

export const initializeUser = (dispatch) => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON);
    blogService.setToken(user.token);
    dispatch({
      type: 'SET_USER',
      data: user,
    });
  }
};

export default UserContext;
