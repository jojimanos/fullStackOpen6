import { useContext } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { useMutation } from "@tanstack/react-query"
import NotificationContext from "../notificationContext"
import { voteOne } from "../requests"

const AnecdoteList = ({ anecdotes }) => {

    const [notification, notificationDispatch] = useContext(NotificationContext)

    const queryClient = useQueryClient()

    const newAnecdoteMutation = useMutation(voteOne, {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
        }
    })

    const handleVote = (anecdote) => {
        const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
        newAnecdoteMutation.mutate(updatedAnecdote)
        notificationDispatch({ type: 'VOTE' })
        setTimeout(() => { notificationDispatch({ type: 'NONE' }) }, 5000)
        console.log('vote')
    }

    return (
        <>
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
        </>
    )
}

export default AnecdoteList