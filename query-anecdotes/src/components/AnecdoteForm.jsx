import { useQueryClient, useMutation } from "@tanstack/react-query"
import { createNew } from '../requests'
import { useContext } from 'react'
import NotificationContext from "../notificationContext"

const AnecdoteForm = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext)
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation(createNew, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    if (content.length > 5) {
      event.target.anecdote.value = ''
      newAnecdoteMutation.mutate({ content: content, votes: 0 })
    notificationDispatch({type: 'CREATE'})
    setTimeout(() => {notificationDispatch({type: 'NONE'})}, 5000)
      console.log('new anecdote')
    } else {
      const message = new Error('Content has to be longer than five characters')
      notificationDispatch({type: 'ERROR', payload: message})
      setTimeout(() => {notificationDispatch({type: 'NONE'})}, 5000)
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
