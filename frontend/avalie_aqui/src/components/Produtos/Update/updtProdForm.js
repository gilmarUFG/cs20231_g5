import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, Typography, Container, Paper, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as api from '../../../api/index';

const schema = z.object({
  name: z.string().nonempty('Campo obrigatório'),
  category: z.string().nonempty('Campo obrigatório'),
  image_url: z.string().nonempty('Campo obrigatório'),
});

const defaultTheme = createTheme();

export default function UpDateProd({ produto }) {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit = async (data, event) => {
    event.preventDefault();
    console.log(data);

    try {
      const profile = JSON.parse(localStorage.getItem('profile'));
      const token = profile?.access_token;

      if (!token) {
        toast.error('É necessário estar autenticado e ser Administrador para Cadastrar um produto');
        return;
      }

      console.log('Token acessado: ', token);
      console.log('dados que são passados:  ', data);
      const response = await api.putProductByProductId(produto.id, data);
      toast.success('Produto atualizado com sucesso!');
      
      console.log('Sucesso!', response);
      // Aguarde 1 segundo antes de recarregar a página
      setTimeout(() => {
      window.location.reload();
    }, 1000);
    } catch (error) {
      console.error('Falha:', error.response.data);
      toast.error('Falha ao atualizar o produto. Por favor, tente novamente.');
    }
  };

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem('profile'));
    if (!profile) {
      toast.warning('É necessário estar autenticado e ser Administrador para Atualizar um produto');
    }

    if (produto) {
      setValue('name', produto.name || '');
      setValue('category', produto.category || '');
      setValue('image_url', produto.image_url || '');
    }
  }, [produto, setValue]);

  return (
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
            <TipsAndUpdatesIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Atualizar Produto
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
              Confirmar Atualização
            </Button>
          </Box>
        </Paper>
      </Box>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
    </Container>
  );
}
