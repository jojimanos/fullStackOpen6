import anecdoteReducer from './anecdoteReducer'
import deepFreeze from 'deep-freeze'

describe('anecdote reducer', () => {
    test('returns new state with action anecdotes/create', () => {
        const getId = () => (100000 * Math.random()).toFixed(0)
        const state = []
        const action = {

            type: 'anecdotes/create',
            payload: {
                content: 'This is the new content',
                id: getId(),
                votes: 0
            },
        }

        deepFreeze(state)
        const newState = anecdoteReducer(state, action)

        expect(newState).toHaveLength(1)
        expect(newState.map(s => s.content)).toContainEqual(action.payload.content)
    })

    test('returns new state with action anecdotes/voteOne', () => {
        const state = [
            {
                content: 'the app state is in redux store',
                id: 800,
                votes: 1
            },
            {
                content: 'state changes are made with actions',
                id: 888,
                votes: 2
            }]

        const updatedAnecdotes = state.map(s => { return { ...s, votes: s.votes + 1 } })

        const action = {

            type: 'anecdotes/voteOne',
            payload: updatedAnecdotes
        }

        deepFreeze(state)
        const newState = anecdoteReducer(state, action)

        expect(newState).toHaveLength(2)

        expect(newState).toContainEqual({
            content: 'the app state is in redux store',
            id: 800,
            votes: 2
        })

        expect(newState).toContainEqual({
            content: 'state changes are made with actions',
            id: 888,
            votes: 3
        })
    })
})