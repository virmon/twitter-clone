import React from 'react';
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AddCommentIcon from '@material-ui/icons/AddComment';
import ForumIcon from '@material-ui/icons/Forum';
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
        <BottomNavigationAction label="Feed" icon={<ForumIcon />} component={Link} to='/'/>
        <BottomNavigationAction label="Tweet" icon={<AddCommentIcon />} component={Link} to='/add'/>
        <BottomNavigationAction label="Account" icon={<PersonIcon />}  component={Link} to='/account'/>
    </BottomNavigation>
  );
}
