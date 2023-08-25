import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"
import { createNew } from '../requests'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation(createNew, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
        if (content.length > 5) { 
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content: content, votes: 0 })
    console.log('new anecdote')
        }
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
