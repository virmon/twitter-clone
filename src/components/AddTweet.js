import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import { useDispatch } from 'react-redux'
import { handleAddComment, handleAddTweet } from '../actions/tweets' 
import Grid from '@material-ui/core/Grid'


const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '100%',
        },
    },
    btn: {
        margin: theme.spacing(1),
    },
    m : {
        margin: 10
    }
}));

export default function AddTweet({ replyTo }) {
  const classes = useStyles();
  const [text, setText] = React.useState();
  const dispatch = useDispatch()

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
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
        <div>
            <Grid container spacing={3}>
                <Grid item xs={9}>
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
        </div>
    </form>
  );
}
