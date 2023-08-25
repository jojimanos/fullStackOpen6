import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (newAnecdote) => {
  const object = newAnecdote
  const response = await axios.post(baseUrl, object)
  return response.data
}

const voteAnecdote = async (id) => {
  const initialAnecdote = await axios.get(baseUrl + "/" + id)
  const updatedAnecdote = { ...initialAnecdote.data, votes: initialAnecdote.data.votes + 1 }
  console.log(updatedAnecdote)
  const response = await axios.put(baseUrl + "/" + id, updatedAnecdote)
  const reinitializeTheAnecdotes = await axios(baseUrl)
  console.log(response.data)
  return reinitializeTheAnecdotes.data
}

export default { getAll, createNew, voteAnecdote }