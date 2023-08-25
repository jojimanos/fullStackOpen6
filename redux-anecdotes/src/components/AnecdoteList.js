import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {

  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)


  const vote = (id) => {
    dispatch(voteAnecdote(id))
    dispatch({type: 'notification/changeNotification', payload: `Anecdote with id:${id} received a vote`})
    setTimeout(() => dispatch({type: 'notification/changeNotification', payload: ''}), 5000)
  }

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);

  return (
    <>
      {filter.length !== 0 ?
        <>
          {sortedAnecdotes.map(anecdote =>
            anecdote.content.includes(filter) === true
              ?
              <div key={anecdote.id}>
                <div>
                  {anecdote.content}
                </div>
                <div>
                  has {anecdote.votes}
                  <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
              </div>
              :
              null
          )}
        </>
        :
        <>
          {sortedAnecdotes.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
              </div>
            </div>)}
        </>
      }
    </>
  )
}

export default AnecdoteList