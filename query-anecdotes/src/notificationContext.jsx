import { createContext } from 'react'
import { useReducer } from 'react'

 const notificationReducer = (state, action) => {
    switch (action.type) {
        case "CREATE":
            return "New anecdote created"
        case "VOTE":
            return "The anecdote received one vote"
        case "ERROR":
            return `There was an error ${action.payload}`
        case "NONE":
            return ""
        default:
            return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
        {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext