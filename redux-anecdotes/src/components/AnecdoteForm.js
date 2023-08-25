import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { initializeAnecdotes } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {

    const getId = () => (100000 * Math.random()).toFixed(0)

    const dispatch = useDispatch()

    const createNote = async (e) => {
        e.preventDefault()
        const content = e.target.anecdote.value
        e.target.anecdote.value = ''
        let newAnecdote = {
            content,
            id: getId(),
            votes: 0
        }
        dispatch(createAnecdote(newAnecdote))
        dispatch(initializeAnecdotes())
        console.log(newAnecdote)
        dispatch({ type: 'notification/changeNotification', payload: `Anecdote with id:${newAnecdote.id} was created` })
        setTimeout(() => dispatch({ type: 'notification/changeNotification', payload: '' }), 5000)
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={createNote}>
                <div><input name='anecdote' type='text' /></div>
                <button>create</button>
            </form>
        </>
    )
}

export default AnecdoteForm