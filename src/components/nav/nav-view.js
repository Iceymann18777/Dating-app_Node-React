import { AppBar, Toolbar, IconButton, Typography, Button, makeStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React, { Fragment, useContext, useState } from 'react';
import { AuthContext } from './../app/AuthContext';
import { logout } from './../auth'
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Nav = () => {
  const classes = useStyles();
  const authContext = useContext(AuthContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [ isLogout, setIsLogout ] = useState(false);

  console.log('REDIRECT NAV', isLogout);
  authContext.userData.then(data => {
    if (data) {
      setIsLoggedIn(data.success);
    } else {
      setIsLoggedIn(false);
    }
  });
  if (isLogout) {
    return (
      <Redirect
        to={{
          pathname: '/',
          state: {
            toasterType: 'success',
            toasterMessage: 'Your successfully logged out!',
          },
        }}
      />
    );
  } else {
    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Matcha
          </Typography>
          {isLoggedIn ? (
            <Button color="inherit" onClick={(e) => { logout(e, setIsLogout)}}>
              Logout
            </Button>
          ) : (
            <Fragment>
              <Button color="inherit" href="/signup">
                Signup
              </Button>{' '}
              <Button color="inherit" href="/login">
                Login
              </Button>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    );
  }
};

export default Nav;
