import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import * as api from '../../api/index.js';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import { AUTH } from '../../constants/actionTypes.js';

const schema = z.object({
  name: z.string(),
  cpf: z.string(),
  email: z.string(),
  password: z.string(),
});

const defaultTheme = createTheme();

const useUser = () => {
    const storedProfile = JSON.parse(localStorage.getItem('profile'));
    const [user, setUser] = useState(storedProfile || {});
    
    useEffect(() => {
      const token = user?.access_token;
  
      if (token) {
        const decodeToken = decode(token);
        setUser(decodeToken);
      }
    }, [user?.access_token]);
  
    return user;
  };

export default function EditUser() {

    const dispatch = useDispatch();
    const user = useUser();
    

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  });

 

  const onSubmit = async (data, event) => {
    event.preventDefault();
    
    
    //console.log(data);
    
    //try {
      

    let nameenv = '';
    if (data.name !== null && data.name !=='') nameenv = ',"name":"' + data.name + '"';
    let cpfenv = '';
    if (data.cpf !== null && data.cpf!=='') cpfenv = ',"cpf":"' + data.cpf + '"';
    let emailenv = '';
    if (data.email !== null && data.email!=='') emailenv = ',"email":"' + data.email + '"';
    let passenv = '';
    if (data.password !== null&& data.password!=='') passenv = ',"password":"' + data.password + '"';
    
    const gerenv = '{ "id":"' + user.id + '"' + nameenv + cpfenv + emailenv + passenv + '}';
    
      console.log(gerenv)
      const response = await api.putUserById(gerenv);

    
      console.log("Sucesso!", response);
    
      navigate('/login');
    
      // Recarregar a página somente após o redirecionamento ter sido completado
      window.onload = function () {
        window.location.reload();
      };
    /*} catch (error) {
      console.error("Falha:", error.response);
    }*/
  };

  const navigate = useNavigate();

  const handleLoginLinkClick = () => {
    navigate('/login');
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Editar Usuário
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Nome de Usuário"
                  autoFocus
                  {...register('name')}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="cpf"
                  label="CPF do Usuário"
                  name="cpf"
                  autoComplete="family-name"
                  {...register('cpf')}
                  error={!!errors.cpf}
                  helperText={errors.cpf?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Endereço de Email"
                  name="email"
                  autoComplete="email"
                  {...register('email')}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Senha"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  {...register('password')}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              </Grid>
           </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
              <Link href="#" variant="body2" onClick={handleLoginLinkClick}>
                 Já Possui uma conta? Entrar na Conta
              </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
