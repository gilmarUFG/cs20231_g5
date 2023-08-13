import * as React from 'react';
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
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import * as api from '../../api/index.js';
import { useDispatch } from "react-redux";
import { AUTH } from '../../constants/actionTypes.js';


const schema = z.object({
  email: z.string().email('E-mail inválido').nonempty('Campo obrigatório'),
  password: z.string().min(8, 'Senha deve conter no mínimo 8 caracteres').nonempty('Campo obrigatório'),
});

const defaultTheme = createTheme();


export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  });
  const dispatch = useDispatch();
// ...

const onSubmit = async (data, event) => {
  event.preventDefault();
  //console.log(data);
  
  try {
    if (data.email === 'admin@avalieaqui.com') {
      const response = await api.signInadm({ email: data.email, password: data.password });
      if (response.data.statusCode !== 401) {
        const responseData = response.data;
        console.log("responseData: ", responseData);
        dispatch({ type: AUTH, data: responseData });
        console.log("Sucesso ao logar como Administrador!", response);
        navigate('/home');
    
        // Recarregar a página após o redirecionamento ter sido completado
        window.onload = function () {
          window.location.replace('/home'); // Use replace em vez de reload
        };
      } else {
        console.error("Resposta inválida:", response);
      }
    } else {
      const response = await api.signIn({ email: data.email, password: data.password }); // Corrigido: alterado para api.signIn
      if (response.data.statusCode !== 401) {
        const responseData = response.data;
        console.log("responseData: ", responseData);
        dispatch({ type: AUTH, data: responseData });
        console.log("Sucesso!", response);
        navigate('/home');
    
    // Recarregar a página após o redirecionamento ter sido completado
    window.onload = function () {
      window.location.replace('/home'); // Use replace em vez de reload
    };

     
      } else {
        console.error("Resposta inválida:", response);
      }
    }
  } catch (error) {
    console.error("Falha:", error.response?.data);
  }
};

const navigate = useNavigate();

  const handleSignupLinkClick = () => {
    navigate('/signup');
  };



  return (
    <ThemeProvider theme={defaultTheme}>
    <CssBaseline />
   
    <main>
        <Paper
          sx={{
            backgroundImage: "url(https://i.pinimg.com/originals/f2/42/ba/f242bac4512325947a7284b1afd4d32b.gif)",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%', // Adicione esta linha
            height: '565px', // Adicione esta linha
          }}
        >
          
          
          <Paper elevation={3} alignItems= 'center' sx={{ mt: 3, p: 4, width: "30%", height: "70%", backgroundColor: "rgba(255, 255, 255, 0.7)", }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5"sx={{color:"black"}} >
            Minha Conta
          </Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Endereço de Email"
                name="email"
                autoComplete="email"
                autoFocus
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
             
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3 }}
                >
                Entrar
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Esqueceu sua senha?
                  </Link>
                </Grid>
                <Grid item>
                 <Link href="#" variant="body2" onClick={handleSignupLinkClick}>
                 Não Possui uma conta? Cadastre-se!
                </Link>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Paper>
        </main>
    </ThemeProvider>
  );
}
