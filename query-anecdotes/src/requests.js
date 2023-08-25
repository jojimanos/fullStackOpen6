import axios from "axios";

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = async () => {
    try {
        const response = await axios.get(baseUrl)
        return response.data
    } catch (error) {
       console.log("There was an error getting the anecdotes", error) 
    }
}

export const createNew = async (object) => {
    try {
        const response = await axios.post(baseUrl, object)
        return response.data
    } catch (error) {
       console.log("There was an error creating the anecdote", error) 
    }
}