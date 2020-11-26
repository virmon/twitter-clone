import { ADD_TWEET, RECEIVE_TWEETS, LIKE_TOGGLE, ADD_COMMENT } from '../constants'
import { saveTweet, saveLikeToggle } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

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

        dispatch(likeToggle(info))
        saveLikeToggle({
            id, 
            hasLiked, 
            authedUser
        })
        .catch(() => dispatch(likeToggle(info)))
    }
}

export function handleAddTweet ({ text }) {
    return (dispatch, getState) => {
        const { authedUser } = getState()
        
        dispatch(showLoading())
        saveTweet({
            text,
            author: authedUser
        })
        .then((info) => dispatch(addTweet(info)))
        .then(() => dispatch(hideLoading()))
    }
}

export function handleAddComment ({ text, replyingTo}) {
    return (dispatch, getState) => {
        const { authedUser } = getState()
        
        dispatch(showLoading())
        saveTweet({
            text,
            author: authedUser,
            replyingTo
        })
        .then((info) => {
            dispatch(addTweet(info))
            dispatch(addComment(info))
        })
        .then(() => dispatch(hideLoading()))
    }
}