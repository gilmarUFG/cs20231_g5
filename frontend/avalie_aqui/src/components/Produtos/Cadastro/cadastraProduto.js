import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, Typography, Container, Paper, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import * as api from '../../../api/index';

const schema = z.object({
  name: z.string().nonempty('Campo obrigatório'),
  category: z.string().nonempty('Campo obrigatório'),
  image_url: z.string().nonempty('Campo obrigatório'),
});

const defaultTheme = createTheme();

export default function CadProd() {
  const navigate = useNavigate();
 

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit = async (data, event) => {
    event.preventDefault();
    //console.log(data);
  
    try {
      
      const profile = JSON.parse(localStorage.getItem('profile'));
      const token = profile?.access_token;


      if (!token) {
        console.log('É necessário estar autenticado e ser Administrador para Cadastrar um produto', token);
        return;
      }
      console.log("Token acessado:  ",token);
      const response = await api.cadProd(data);
      console.log('Sucesso!', response);
      navigate('/home');
    
      // Recarregar a página somente após o redirecionamento ter sido completado
      window.onload = function () {
        window.location.reload();
      };
    } catch (error) {
      
      console.error('Falha:', error.response.data);
    }
  };

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem('profile'));
    if (!profile) {
      console.log('É necessário estar autenticado e ser Administrador para Cadastrar um produto');
    }
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          
          <Paper elevation={3} sx={{ mt: 3, p: 4 }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Cadastro de Produtos
          </Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Nome do Produto"
                name="name"
                autoComplete="name"
                autoFocus
                {...register('name')}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="category"
                label="Categoria do Produto"
                type="category"
                id="category"
                autoComplete="category"
                {...register('category')}
                error={!!errors.category}
                helperText={errors.category?.message}
              />
               <TextField
                margin="normal"
                required
                fullWidth
                name="image_url"
                label="URL da Imagem do Produto"
                type="image_url"
                id="image_url"
                autoComplete="image_url"
                {...register('image_url')}
                error={!!errors.image_url}
                helperText={errors.image_url?.message}
              />
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3 }}
              >
                Cadastrar Produto
              </Button>              
            </Box>
          </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
