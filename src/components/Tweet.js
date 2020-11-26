import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ReplyIcon from '@material-ui/icons/Reply';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { formatDate } from '../utils/helper'
import { useSelector, useDispatch } from 'react-redux'
import { handleLikeToggle } from '../actions/tweets'
import AddTweet from './AddTweet'

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 345,
    margin: 10,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function Tweet({ id, text, author, timestamp, likes, replies, replyingTo }) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const users = useSelector((state) => state.users)
    const tweets = useSelector((state) => state.tweets)
    const authedUser = useSelector((state) => state.authedUser)
    const dispatch = useDispatch()

    const name = users[author].name
    const avatarURL = users[author].avatarURL
    const replyCount = tweets[id].replies.length
    const likeCount = tweets[id].likes.length
    const hasLike = tweets[id].likes.includes(authedUser)
    const subtweet = tweets[id].replies

    const toggleLike = () => {
        dispatch(handleLikeToggle({
            id,
            hasLiked: !hasLike
        }))
    }

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card className={classes.root}>
        <CardHeader
            avatar={
            <Avatar aria-label="recipe" className={classes.avatar} src={avatarURL} alt={`${name}`}>
                {author.slice(0,1).toUpperCase()}
            </Avatar>
            }
            action={
            <IconButton aria-label="settings">
                <MoreVertIcon />
            </IconButton>
            }
            title={name}
        subheader={`${replyingTo ? 'replying to ' + tweets[replyingTo].author + ' | ' : ''}${formatDate(timestamp)}`}
        />
        <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
            {text}
            </Typography>
        </CardContent>
        <CardActions disableSpacing>
            <IconButton 
                aria-label="reply"
                onClick={handleExpandClick}
            >
                <ReplyIcon />
            </IconButton><span>{replyCount}</span>
            <IconButton 
                aria-label="like"
                onClick={toggleLike}
            >
                <FavoriteIcon style={{color: hasLike ? red[300] : 'gray'}}/>
            </IconButton><span>{likeCount}</span>
            <IconButton
            className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            >
            <ExpandMoreIcon />
            </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
                <AddTweet replyTo={id} />
                {
                    subtweet.map((id) => (
                        <Tweet 
                            key={tweets[id].id}
                            id={tweets[id].id}
                            text={tweets[id].text}
                            author={tweets[id].author}
                            timestamp={tweets[id].timestamp}
                            likes={tweets[id].likes}
                            replies={tweets[id].replies}
                            replyingTo={tweets[id].replyingTo}
                        />
                    )).sort((a,b) => b.timestamp - a.timestamp)
                }
            </CardContent>
        </Collapse>
        </Card>
    );
}
