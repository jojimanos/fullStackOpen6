import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {getAll, createNew} from "./requests"

const App = () => {
    const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    // retry: false
  })
  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>There was an error {JSON.stringify(result.error.message)}</div>
  }

  const handleVote = (anecdote) => {
    console.log('vote')
  }

  const anecdotes = result.data 
  // [
    // {
      // "content": "If it hurts, do it more often",
      // "id": "47145",
      // "votes": 0
    // },
  // ]

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
