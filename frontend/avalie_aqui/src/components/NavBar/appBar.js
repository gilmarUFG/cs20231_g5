import React, { useEffect, useState } from 'react';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import memories from '../../images/avalie.png';

export default function Navbar() {
  const storedProfile = JSON.parse(localStorage.getItem('profile'));
  const [user, setUser] = useState(storedProfile || {});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
    setUser({});
  };

  useEffect(() => {
    const token = user?.access_token;

    if (token) {
      const decodeToken = decode(token);

      if (decodeToken.exp * 1000 < new Date().getTime()) logout();

      setUser(decodeToken);
    }
  }, [location]);

  return (
    <AppBar position="static" sx={{ backgroundColor: '#006064' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <div sx={{ display: 'flex', alignItems: 'center' }}>
          <img src={memories} alt="icon" height="60" sx={{ marginRight: '5px' }} />
          <Typography variant="h5" sx={{ color: 'white' }}>
            Avalie Aqui!
          </Typography>
        </div>
        <div sx={{ display: 'flex', alignItems: 'center' }}>
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
        </div>
        {user && user.name ? (
          <div sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ bgcolor: '#FF4081', marginRight: '10px' }}>
              {user.name.charAt(0)}
            </Avatar>
            <div sx={{ marginRight: '10px' }}>
              <Typography variant="h6" sx={{ color: 'white' }}>
                {user.name}
              </Typography>
            </div>
            <Button
              variant="contained"
              sx={{ marginLeft: '10px', height: '32px', fontSize: '12px' }}
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
      </Toolbar>
    </AppBar>
  );
}
