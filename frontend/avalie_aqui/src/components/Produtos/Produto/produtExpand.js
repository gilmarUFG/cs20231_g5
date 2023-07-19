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
import { SwipeLeft } from '@mui/icons-material';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { relative } from 'path-browserify';
import ReviewList from '../../Review/reviewList.js';

const ProductImage = ({ imageUrl }) => (
  
  <div style={{ position: 'relative', width: '100%', height: '150%' }}>
    <CardMedia
      component="div"
      sx={{
        // 16:9
        pt: '90.25%',
        width: '100%',
        height: '100%',
        cursor: 'pointer',
      }}
      image={imageUrl || 'https://source.unsplash.com/random?wallpapers'}
    />
    <EditSharpIcon
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        margin: '5px',
        backgroundColor: "whitesmoke",
        borderRadiusb: "10",
        shapeMargin: "circle",
        color: 'black', // Customize the color of the icon as needed
        fontSize: '24px', // Customize the size of the icon as needed
      }}
    />
  </div>  
  
);

const ProductInfo = ({ name, category, rating }) => (
  <CardContent sx={{ flexGrow: 2, width: '100%', alignItems: 'flex-start' }}>
    <Typography gutterBottom variant="h3" component="h4">
      {name}
    </Typography>
    <Typography>{category}</Typography>

    <ReactStars
      count={5}
      starDimension="50px"
      rating={rating}
      edit={true}
      isHalf={true}
      emptyIcon={<i className="far fa-star"></i>}
      halfIcon={<i className="fa fa-star-half-alt"></i>}
      fullIcon={<i className="fa fa-star"></i>}
      starRatedColor="yellow"
    />
  </CardContent>
);

const ExpandedProduto = ({ produto, onClose }) => {
  const [showReview, setShowReview] = React.useState(false);
  const [avgprod, setAvgProd] = React.useState(0.0);
  const [reviews, setReviews] = React.useState([]);

  const handleAvaliarClick = async () => {
    setShowReview(true);
    try {
      const reviewavg = await api.getReviewsByProductId(produto.id);
      console.log(reviewavg);
      setReviews(reviewavg);
    } catch (error) {
      console.error('Erro ao buscar avaliações:', error);
    }
  };

  React.useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const produtomed = await api.getProductByProductId(produto.id);
        console.log(produtomed);
        setAvgProd(produtomed.product.average_rating);
      } catch (error) {
        console.error('Erro ao buscar avaliações:', error);
      }
    };

    fetchProdutos();
  }, []);

  const handleBackClick = () => {
    setShowReview(false);
    onClose();
  };

  return (
    <Grid item key={produto}>
      <Card sx={{ height: '530px', width: '1200px',alignItems: 'left' }}>
        <Grid container justifyContent="flex-start" spacing={1}>
          <Grid item  xs={4}>            
            <ProductImage imageUrl={produto.image_url} />
          </Grid>
          <Grid item xs={8}>            
              <ProductInfo name={produto.name} category={produto.category} rating={avgprod} />            
              <ReviewList productId={produto.id} />            
            <CardActions
            style={{  
              position: 'absolute',     
              top: 500,
              left: 470,       
              margin: '5px',              
              borderRadiusb: "10",
              shapeMargin: "circle",              
              fontSize: '24px', // Customize the size of the icon as needed
            }}
            >  
                <Button size="small" onClick={handleBackClick}>
                  <ArrowBackIcon/> Voltar
                </Button>           
            </CardActions>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default ExpandedProduto;
