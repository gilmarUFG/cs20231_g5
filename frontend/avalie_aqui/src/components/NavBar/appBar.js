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
    const token = user?.access_token;

    if (token) {
      const decodeToken = decode(token);

      if (decodeToken.exp * 1000 < new Date().getTime()) logout();
    }

    

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
    <AppBar position="static" sx={{ backgroundColor: '#006064' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <div sx={{ display: 'flex', alignItems: 'center' }}>
          <img src={memories} alt="icon" height="60" sx={{ marginRight: '10px' }} />
          <Typography variant="h5" sx={{ color: 'white' }}>
            Avalie Aqui!
          </Typography>
        </div>
        <div>
          <Button
            component={Link}
            to="/"
            sx={{ color: location.pathname === '/' ? 'white' : '#B2EBF2' }}
          >
            Home
          </Button>
          <Button
            component={Link}
            to="/cadprod"
            sx={{ color: location.pathname === '/cadastro-produtos' ? 'white' : '#B2EBF2' }}
          >
            Cadastro de Produtos
          </Button>
          {user ? (
            <div sx={{ display: 'flex', alignItems: 'center' }}>
               <Avatar
                sx={{ bgcolor: '#FF4081', marginRight: '10px' }}
                alt={user.result.user.name}
              >
                {user.result.user.name.charAt(0)}
              </Avatar>
              <Typography variant="h6" sx={{ color: 'white' }}>
                {user.result.user.name}
              </Typography>
             
              <Button
                variant="contained"
                sx={{ marginLeft: '10px' }}
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
              sx={{ color: location.pathname === '/login' ? 'white' : '#B2EBF2' }}
            >
              Login
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}
/**/