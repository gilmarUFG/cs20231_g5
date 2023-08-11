import React, { useEffect, useState } from 'react';
import { AppBar, Avatar, Button, Grid, Toolbar, Typography } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import memories from '../../images/avalie.png';
import LogoutIcon from '@mui/icons-material/Logout';

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
      console.log(token);
      
      const decodeToken = decode(token);

      if (decodeToken.exp * 1000 < new Date().getTime()) logout();

      setUser(decodeToken);
      console.log(decodeToken);
    }
  }, [location]);

  return (
    <AppBar position="static" sx={{ backgroundColor: '#30404F' }}>
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
          {user.email === "admin@avalieaqui.com" ? (
          <Button
            component={Link}
            to="/cadprod"
            sx={{ color: location.pathname === '/cadastro-produtos' ? 'white' : '#B2EBF2' }}
          >
            Cadastro de Produtos
          </Button>):(<a></a>)}
        </div>
        {user && user.name ? (
          <div sx={{ display: 'flex', alignItems: 'center' }}>
            <Grid container justifyContent={"center"} alignItems={"center"} columns={8}>
            <Grid item  xs={5}>
              <Grid container justifyContent={"center"} alignItems={"center"} direction={"column"} columns={8}>
                <Grid item xs={5}>
                        <Button
                    variant="outlined"
                    //sx={{ marginLeft: '10px', height: '32px', fontSize: '12px' }}
                    color="secondary"
                    component={Link}
                    rounded
                    sx={{ bgcolor: '#FF4081', color:"white", borderRadius: 100 }}
                    to="/editUser"
                    //onClick={navigate('/editUser')}
                  >              
                      {user.name.charAt(0)}              
                  </Button> 
                </Grid>

                <Grid item xs={3}>
                    <Typography variant="h6" sx={{ color: 'white' }}>
                      {user.name}
                    </Typography>
                </Grid>

             </Grid>   
            </Grid>
            <Grid item xs={2}>
              <Grid
              variant="contained"
              sx={{  height: '100%', width: "100%", fontSize: '12px' }}
              color="secondary"
              onClick={logout}
            >
              <LogoutIcon/>
              <Typography variant="h6" sx={{ color: 'white' }}>
                Sair
              </Typography>
              
            </Grid>
            </Grid>
            

            </Grid>
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
