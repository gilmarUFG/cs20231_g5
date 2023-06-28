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
import ReactStars from 'react-star-ratings';

const Produto = ({ produto }) => {
  const [showReview, setShowReview] = React.useState(false);
  const [avgprod, setAvgProd] = React.useState(0.0);

  const handleAvaliarClick = () => {
    setShowReview(true);
  };

  React.useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const reviewavg = await api.getReviewsByProductId(produto.id);
        console.log(reviewavg);
        const produtomed = await api.getProductByProductId(produto.id);
        console.log(produtomed);
        setAvgProd(produtomed.product.average_rating);
      } catch (error) {
        console.error('Erro ao buscar avaliações:', error);
      }
    };

    fetchProdutos();
  }, []);

  return (
    <Grid item key={produto}>
      <Card sx={{ height: '70%', width: '80%', display: 'flex', flexDirection: 'column' }}>
        <CardMedia
          component="div"
          sx={{
            // 16:9
            pt: '90.25%',
          }}
          image={produto.image_url || 'https://source.unsplash.com/random?wallpapers'}
        />
        <CardContent sx={{ flexGrow: 2 }}>
          <Typography gutterBottom variant="h7" component="h4">
            {produto.name}
          </Typography>
          <Typography>{produto.category}</Typography>

          <ReactStars
            count={5}
            starDimension = "30px"
            rating={avgprod}
            edit={true}
            isHalf={true}
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            starRatedColor="yellow"
          />

        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleAvaliarClick}>
            Avaliar
          </Button>
        </CardActions>
        {showReview && <ReviewComponent productId={produto.id} />}
      </Card>
     
    </Grid>
  );
};

export default Produto;
