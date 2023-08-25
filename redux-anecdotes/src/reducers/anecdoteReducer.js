import { createSlice } from '@reduxjs/toolkit'
import anecdotes from '../services/anecdotes'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteOne(state = initialState, action) {
      const updatedAnecdotes = action.payload
      return updatedAnecdotes
    },
    appendAnecdote(state, action) {
      //change according to the previous ones
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { voteOne, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const notes = await anecdotes.getAll()
    dispatch(setAnecdotes(notes))
  }
}

export const createAnecdote = newAnecdote => {
  return async dispatch => {
    const newEntry = await anecdotes.createNew(newAnecdote)
    dispatch(appendAnecdote(newEntry))
  }
}

export const voteAnecdote = (id) => {
  return async dispatch => {
    const newState = await anecdotes.voteAnecdote(id)
    dispatch(voteOne(newState))
  }
}

export default anecdoteSlice.reducer