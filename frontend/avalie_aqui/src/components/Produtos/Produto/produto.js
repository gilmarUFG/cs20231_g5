import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ReviewComponent from '../../Review/doReview.js';
import * as api from '../../../api/index';

const Produto = ({ produto }) => {
  const [showReview, setShowReview] = React.useState(false);

  const handleAvaliarClick = () => {
    setShowReview(true);
  };


  React.useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const reviewavg = await api.getReviewsByProductId(produto.id);
        console.log(reviewavg)
        
      } catch (error) {
        console.error('Erro ao buscar avaliações:', error);
      }
    };

    
  }, []);


  return (
    <Grid item key={produto}>
      <Card sx={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardMedia
          component="div"
          sx={{
            // 16:9
            pt: '90.25%',
          }}
          image={produto.image_url || 'https://source.unsplash.com/random?wallpapers'}
        />
        <CardContent sx={{ flexGrow: 2 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {produto.name}
          </Typography>
          <Typography>{produto.category}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleAvaliarClick}>
            Avaliar
          </Button>
        </CardActions>
      </Card>
      {showReview && <ReviewComponent productId = {produto.id} />}
    </Grid>
  );
};

export default Produto;
