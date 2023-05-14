import { useDispatch, useSelector } from 'react-redux';
import { vote } from '../reducers/anecdoteReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter === '') {
      return anecdotes;
    }
    return anecdotes.filter((anecdote) => anecdote.content.includes(filter));
  });
  const dispatch = useDispatch();

  const handleVote = (id) => {
    console.log('vote', id);
    dispatch(vote(id));
  };

  const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes);

  return (
    <div>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
