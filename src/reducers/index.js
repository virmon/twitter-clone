import { combineReducers } from 'redux'
import users from './users'
import tweets from './tweets'
import authedUser from './setAuthedUser'

export default combineReducers({
    users,
    tweets,
    authedUser
})