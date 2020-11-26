import React from 'react';
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import { useDispatch } from 'react-redux'
import { handleAddComment, handleAddTweet } from '../actions/tweets' 
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container';


const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(2),
            width: '100%',
        },
    },
    btn: {
        margin: theme.spacing(3),
    },
    m : {
        margin: 10
    },
    wrapper: {
        marginTop: '100px'
    }
}));

export default function AddTweet({ replyTo }) {
  const classes = useStyles();
  const [text, setText] = React.useState();
  const dispatch = useDispatch()
  const history = useHistory()

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = () => {
    if (replyTo) {
        dispatch(handleAddComment({
            text,
            replyingTo: replyTo
        }))
    } else {
        dispatch(handleAddTweet({
            text
        }))
    }
    setText('')
    history.push('/')
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
        <Container maxWidth='sm' className={ !replyTo ? classes.wrapper : ''}>
            <Grid container spacing={1}>
                <Grid item xs={8}>
                    <TextField
                        label="Tweet"
                        multiline
                        rowsMax={4}
                        value={text}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={3}>
                    <Button 
                        className={classes.btn}
                        variant="contained" 
                        color="default"
                        onClick={handleSubmit}
                    >
                        <SendIcon />
                    </Button>
                </Grid>
            </Grid> 
        </Container>
    </form>
  );
}
