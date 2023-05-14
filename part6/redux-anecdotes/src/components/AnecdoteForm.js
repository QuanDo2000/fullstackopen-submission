import { useDispatch } from 'react-redux';
import { addAnecdote } from '../reducers/anecdoteReducer';
import {
  setNotification,
  removeNotification,
} from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';

    dispatch(addAnecdote(content));
    dispatch(setNotification(`you created '${content}'`));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
