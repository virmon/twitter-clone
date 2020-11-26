import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Redirect } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar'

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
        marginTop: theme.spacing(10)
    },
    large: {
        width: theme.spacing(20),
        height: theme.spacing(20),
    },
    center: {
        textAlign: 'center'
    },
}));

export default function Profile ({ authedUser, users }) {
    const classes = useStyles()
    
    if (authedUser === undefined) {
        return <Redirect to='/' />
    }

    const name = users && users[authedUser].name
    const avatarURL = users[authedUser].avatarURL
    const tweetCount = users[authedUser].tweets.length

    return (
        <Container maxWidth='sm'>
            <Paper className={classes.root}>
                <div className={classes.center} style={{justifyContent:'center', display:'flex'}}>
                    <Avatar src={avatarURL} alt={name} className={classes.large} />
                </div>
                <h1 className={classes.center} >{name}</h1>
                <h4 className={classes.center} >@{authedUser}</h4>
                <h4 className={classes.center} >Tweets: {tweetCount}</h4>
            </Paper>
        </Container>
    )
}