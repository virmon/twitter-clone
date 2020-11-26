import React from 'react'
import { useDispatch } from 'react-redux'
import { handleInitialData } from './actions/shared'
import TweetFeed from './components/TweetFeed'
// import AddTweet from './components/AddTweet'

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
    <div className="App">
      {/* <AddTweet /> */}
      <TweetFeed />
    </div>
  );
}

export default App;
