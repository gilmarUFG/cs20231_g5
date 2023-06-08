import React, { useEffect, useState } from 'react';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import memories from '../../images/avalie.png';

export default function Navbar() {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
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
    <AppBar  position="static" color="inherit">
      <div >
        <Typography
         
          variant="h2"
          align="center"
        >
          Avalie Aqui!
        </Typography>
        <img  src={memories} alt="icon" height="60" />
      </div>
      <Toolbar >
        <Button
          component={Link}
          to="/"
          
          color={location.pathname === '/' ? 'primary' : 'inherit'}
        >
          Home
        </Button>
       
        <Button
          component={Link}
          to="/cadprod"
          
          color={
            location.pathname === '/cadastro-produtos' ? 'primary' : 'inherit'
          }
        >
          Cadastro de Produtos
        </Button>
        {user ? (
          <div >
            
            <Button
              variant="contained"
              className={logout}
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
            
            color={location.pathname === '/login' ? 'primary' : 'inherit'}
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}


/*
<Avatar
              
              alt={user.result.name}
              
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography  variant="h6">
              {user.name}
            </Typography>

            */