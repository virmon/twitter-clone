import { ADD_TWEET, RECEIVE_TWEETS, LIKE_TOGGLE, ADD_COMMENT } from '../constants'
import { saveTweet, saveLikeToggle } from '../utils/api'

export function receiveTweets (tweets) {
    return {
        type: RECEIVE_TWEETS,
        tweets
    }
}

function addTweet (tweet) {
    return {
        type: ADD_TWEET,
        tweet
    }
}

function addComment (tweet) {
    return {
        type: ADD_COMMENT,
        tweet
    }
}

function likeToggle (tweet) {
    return {
        type: LIKE_TOGGLE,
        tweet
    }
}

export function handleLikeToggle ({ id, hasLiked }) {
    return (dispatch, getState) => {
        const { authedUser } = getState()
        const info = { id, hasLiked, authedUser };
        saveLikeToggle({
            id, 
            hasLiked, 
            authedUser
        })
            .then(() => {
                dispatch(likeToggle(info))
            })
    }
}

export function handleAddTweet ({ text }) {
    return (dispatch, getState) => {
        const { authedUser } = getState()
        
        saveTweet({
            text,
            author: authedUser
        })
            .then((info) => dispatch(addTweet(info)))
    }
}

export function handleAddComment ({ text, replyingTo}) {
    return (dispatch, getState) => {
        const { authedUser } = getState()
        
        saveTweet({
            text,
            author: authedUser,
            replyingTo
        })
            .then((info) => {
                dispatch(addTweet(info))
                dispatch(addComment(info))
            })
    }
}