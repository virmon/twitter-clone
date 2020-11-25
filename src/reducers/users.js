import { ADD_TWEET, RECEIVE_USERS } from "../constants"

export default function users (state = {}, action) {
    switch (action.type) {
        case RECEIVE_USERS :
            return {
                ...state,
                ...action.users
            }
        case ADD_TWEET :
            const user = state[action.tweet.author]
            const tweets = state[action.tweet.author].tweets
            return {
                ...state,
                [action.tweet.author]: {
                    ...user,
                    tweets: tweets.concat(action.tweet.id)
                }
            }
        default:
            return state
    }
}