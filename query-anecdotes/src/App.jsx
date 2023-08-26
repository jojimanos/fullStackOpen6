import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery } from '@tanstack/react-query'
import { getAll } from "./requests"
import { NotificationContextProvider } from './notificationContext'
import AnecdoteList from './components/AnecdoteList'

const App = () => {


  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    retry: false
  })
  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>There was an error {JSON.stringify(result.error.message)}</div>
  }

  const anecdotes = result.data

  return (
    <NotificationContextProvider>
      <div>
        <h3>Anecdote app</h3>
        <Notification />
        <AnecdoteForm />
        <AnecdoteList anecdotes={anecdotes} />
      </div>
    </NotificationContextProvider>
  )
}

export default App
