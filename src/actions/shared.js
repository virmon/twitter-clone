import { getInitialData } from '../utils/api'
import { setAuthedUser } from './authedUser'
import { receiveTweets } from './tweets'
import { receiveUsers } from './users'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

const AUTHED_USER = 'sarah_edo'

export function handleInitialData () {
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialData()
            .then(({ users, tweets }) => {
                dispatch(receiveUsers(users))
                dispatch(receiveTweets(tweets))
                dispatch(setAuthedUser(AUTHED_USER))
            })
            .then(() => dispatch(hideLoading()))
            .catch((err) => console.log('Error occurred in handleInitialData', err))
    }
}