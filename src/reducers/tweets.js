import { RECEIVE_TWEETS, ADD_TWEET, ADD_COMMENT, LIKE_TOGGLE } from "../constants"

export default function tweets (state = {}, action) {
    switch (action.type) {
        case RECEIVE_TWEETS :
            return {
                ...state,
                ...action.tweets
            }
        case ADD_TWEET :
            return {
                ...state,
                [action.tweet.id]: action.tweet
            }
        case ADD_COMMENT :
            return {
                ...state,
                [action.tweet.replyingTo]: {
                    ...state[action.tweet.replyingTo],
                    replies: state[action.tweet.replyingTo].replies.concat(action.tweet.id)
                }
            }
        case LIKE_TOGGLE :
            return {
                ...state,
                [action.tweet.id]: {
                    ...state[action.tweet.id],
                    likes: action.tweet.hasLiked 
                            ? state[action.tweet.id].likes.concat(action.tweet.authedUser)
                            : state[action.tweet.id].likes.filter((user) => user !== action.tweet.authedUser)
                }
            }
        default:
            return state
    }
}