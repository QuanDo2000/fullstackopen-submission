import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: '',
    error: false,
  },
  reducers: {
    updateNotification: (state, action) => {
      state.message = action.payload.message;
      state.error = action.payload.error;
    },
    removeNotification: (state) => {
      state.message = '';
      state.error = false;
    },
  },
});

export const { updateNotification, removeNotification } =
  notificationSlice.actions;

export const setNotification = (message, timeout) => {
  return async (dispatch) => {
    dispatch(
      updateNotification({
        message,
        error: false,
      })
    );
    setTimeout(() => {
      dispatch(removeNotification());
    }, timeout * 1000);
  };
};

export const setErrorNotification = (message, timeout) => {
  return async (dispatch) => {
    dispatch(
      updateNotification({
        message,
        error: true,
      })
    );
    setTimeout(() => {
      dispatch(removeNotification());
    }, timeout * 1000);
  };
};

export default notificationSlice.reducer;
