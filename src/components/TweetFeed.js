import React from 'react'
import { useSelector } from 'react-redux'
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Tweet from './Tweet'

export default function TweetFeed () {
    const tweets = useSelector((state) => state.tweets)

    const sortedTweets = Object.keys(tweets)
        .map((id) => tweets[id])
        .sort((a, b) => b.timestamp - a.timestamp)

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm">
                {sortedTweets.map((tweet) => (
                    <Tweet 
                        key={tweet.id}
                        id={tweet.id}
                        text={tweet.text}
                        author={tweet.author}
                        timestamp={tweet.timestamp}
                        likes={tweet.likes}
                        replies={tweet.replies}
                        replyingTo={tweet.replyingTo}
                    />
                ))}
            </Container>
        </React.Fragment>
    )
}