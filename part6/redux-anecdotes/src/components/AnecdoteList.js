import { useDispatch, useSelector } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import {
  setNotification,
  removeNotification,
} from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter === '') {
      return anecdotes;
    }
    return anecdotes.filter((anecdote) => anecdote.content.includes(filter));
  });
  const dispatch = useDispatch();

  const handleVote = (anecdote) => {
    console.log('vote', anecdote.id);
    dispatch(voteAnecdote(anecdote.id));
    dispatch(setNotification(`you voted '${anecdote.content}'`));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  };

  const sortedAnecdotes = anecdotes.toSorted((a, b) => {
    return b.votes - a.votes;
  });

  return (
    <div>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
