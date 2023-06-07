import React, { useEffect, useState } from 'react';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@mui/material';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import memories from '../../images/avalie.png';

export default function Navbar() {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    history.push('/');
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodeToken = decode(token);

      if (decodeToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography
          className={classes.heading}
          variant="h2"
          align="center"
        >
          Avalie Aqui!
        </Typography>
        <img className={classes.image} src={memories} alt="icon" height="60" />
      </div>
      <Toolbar className={classes.toolbar}>
        <Button
          component={Link}
          to="/"
          className={classes.link}
          color={location.pathname === '/' ? 'primary' : 'inherit'}
        >
          Home
        </Button>
       
        <Button
          component={Link}
          to="/cadprod"
          className={classes.link}
          color={
            location.pathname === '/cadastro-produtos' ? 'primary' : 'inherit'
          }
        >
          Cadastro de Produtos
        </Button>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              Sair
            </Button>
          </div>
        ) : (
            <Button
            component={Link}
            to="/login"
            className={classes.link}
            color={location.pathname === '/login' ? 'primary' : 'inherit'}
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}