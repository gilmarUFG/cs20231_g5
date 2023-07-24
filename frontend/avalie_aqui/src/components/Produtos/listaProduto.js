import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Produto from './Produto/produto';
import * as api from '../../api/index';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function Album() {
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const produtos = await api.getProdutos();
        console.log(produtos);
        setCards(produtos.data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProdutos();
  }, []);

  if (cards === undefined) {
    return <div>Carregando...</div>;
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
     
      <main>
        <Box
          sx={{
            bgcolor: '#b0bada',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              AVALIE AQUI
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              O AvalieAqui é sua plataforma de  avaliação de produtos, devido ao fato de 
              não possuir interesse monetário nosso site traz uma avaliação transparente e confiável
              refletindo a real opinião dos consumidores!
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 10, backgroundColor: '#30404F' }} maxWidth="120%">
  <Grid container spacing={4}>
    {cards.map((card) => (
      <Grid item key={card} xs={12} sm={8} md={4}>
        <Produto produto={card} />
      </Grid>
    ))}
  </Grid>
</Container>

      </main>
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
    </ThemeProvider>
  );
}
