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
import UpDateProd from '../Update/updtProdForm.js';

// ... rest of the code ...

const ProductImage = ({ imageUrl, onEditClick }) => (
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
      onClick={onEditClick} // Use the onEditClick prop here
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        margin: '5px',
        backgroundColor: 'whitesmoke',
        borderRadius: '10',
        shapeMargin: 'circle',
        color: 'black',
        fontSize: '24px',
      }}
    />
  </div>
);

// ... rest of the code ...


const ProductInfo = ({ name, category, rating }) => {
  // Verificar se rating é um número válido ou definir o valor padrão como 0
  if(rating === null)
  {console.log("Rating possui null")}
  const normalizedRating = rating && typeof rating === 'number' ? rating : 0.0;

  return (
    <CardContent sx={{ flexGrow: 2, width: '100%', alignItems: 'flex-start' }}>
      <Typography gutterBottom variant="h3" component="h4">
        {name}
      </Typography>
      <Typography>{category}</Typography>

      <ReactStars
        count={5}
        starDimension="50px"
        rating={normalizedRating}
        edit={true}
        isHalf={true}
        emptyIcon={<i className="far fa-star"></i>}
        halfIcon={<i className="fa fa-star-half-alt"></i>}
        fullIcon={<i className="fa fa-star"></i>}
        starRatedColor="yellow"
      />
    </CardContent>
  );
};




const ExpandedProduto = ({ produto, onClose }) => {
  const [showReview, setShowReview] = React.useState(false);
  const [avgprod, setAvgProd] = React.useState(0.0);
  const [reviews, setReviews] = React.useState([]);
  const [isEditMode, setIsEditMode] = React.useState(false); // State to track edit mode


  const handleEditClick = () => {
    setIsEditMode(true);
  };

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
          <Grid item sx={{ alignItems: 'center' }} xs={4}>            
          {isEditMode ? ( // Render the update product form when in edit mode
              <UpDateProd produto={produto} onClose={() => setIsEditMode(false)} />
            ) : (
              <ProductImage imageUrl={produto.image_url} onEditClick={handleEditClick} />
            )}
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
