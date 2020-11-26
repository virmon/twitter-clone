import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { handleInitialData } from './actions/shared'
import LoadingBar from 'react-redux-loading-bar'
import TweetFeed from './components/TweetFeed'
import AddTweet from './components/AddTweet'
import Nav from './components/Nav'

function App() {
  const dispatch = useDispatch()
  // const users = useSelector((state) => state.users)
  // const tweets = useSelector((state) => state.tweets)

  React.useEffect(() => {
    dispatch(handleInitialData())
    // let id = setTimeout(() => {
    //   dispatch(handleAddTweet({ text: 'hello' }))
    //   dispatch(handleAddComment({ text: 'hello', replyingTo: 'r0xu2v1qrxa6ygtvf2rkjw' }))
    //   dispatch(handleLikeToggle({ id: 'r0xu2v1qrxa6ygtvf2rkjw', hasLiked: true, authedUser: 'sarah_edo' }))
    //   // dispatch(handleLikeToggle({ id: 'r0xu2v1qrxa6ygtvf2rkjw', hasLiked: false, authedUser: 'sarah_edo' }))
    // }, 1000)
    // return () => clearInterval(id)
  }, [dispatch])
  
  return (
    <Router> 
      <div className="App">
        <LoadingBar />
        <Switch>
          <Route path='/' exact>
            <TweetFeed />
          </Route>
          <Route path='/add'>
            <AddTweet />
          </Route>
        </Switch>
      </div>
      <Nav />
    </Router>
  );
}

export default App;
