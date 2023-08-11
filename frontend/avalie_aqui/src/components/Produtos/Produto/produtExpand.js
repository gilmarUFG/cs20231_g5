import React, { useEffect, useState } from 'react';
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import * as api from "../../../api/index";
import ReactStars from "react-star-ratings";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ReviewList from "../../Review/reviewList.js";
import UpDateProd from "../Update/updtProdForm.js";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import decode from 'jwt-decode';

// ... rest of the code ...

const ProductImage = ({ imageUrl, onEditClick,user }) => {
 
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  

  return (
    <Grid
      style={{
        position: "relative",
        width: "100%",
        height: "100%"
      }}
    >
      <CardMedia
        component="div"
        sx={{          
          width: "100%",
          height: "120%",
          cursor: "pointer",
        }}
        image={imageUrl || "https://source.unsplash.com/random?wallpapers"}
      />

      {user.email == 'admin@avalieaqui.com'?( <EditSharpIcon
        onClick={onEditClick}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          margin: "5px",
          backgroundColor: "whitesmoke",
          borderRadius: "10px",
          shapeMargin: "circle",
          color: "black",
          fontSize: isSmallScreen ? "18px" : "24px",
        }}
      />):(<a></a>)}
     
    </Grid>
  );
};

// ... rest of the code ...

const ProductInfo = ({ name, category, rating }) => {
  // Verificar se rating é um número válido ou definir o valor padrão como 0
  const normalizedRating = rating && typeof rating === "number" ? rating : 0.0;

  return (
    <CardContent sx={{ flexGrow: 2, width: "100%", alignItems: "flex-start" }}>
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
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [showReview, setShowReview] = React.useState(false);
  const [avgprod, setAvgProd] = React.useState(0.0);
  const [reviews, setReviews] = React.useState([]);
  const storedProfile = JSON.parse(localStorage.getItem('profile'));
  const [user, setUser] = useState(storedProfile || {});
  const [isEditMode, setIsEditMode] = React.useState(false); // State to track edit mode

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleAvaliarClick = async () => {
    setShowReview(true);
    try {
      const reviewavg = await api.getReviewsByProductId(produto.id);
      //console.log(reviewavg);
      setReviews(reviewavg);
    } catch (error) {
      console.error("Erro ao buscar avaliações:", error);
    }
  };

  React.useEffect(() => {  
  
    const token = user?.access_token;

    if (token) {
      console.log(token);
      
      const decodeToken = decode(token);     

      setUser(decodeToken);
      console.log(decodeToken);
    }


    const fetchProdutos = async () => {
      try {
        const produtomed = await api.getProductByProductId(produto.id);
        //console.log(produtomed);
        setAvgProd(produtomed.product.average_rating);
      } catch (error) {
        console.error("Erro ao buscar avaliações:", error);
      }
    };

    fetchProdutos();
  }, []);

  const handleBackClick = () => {
    setShowReview(false);
    onClose();
  };

  return (
    <Grid key={produto} sx={{ height: "80%", width: "80%" }}>
      <Card
        sx={{
          height: "100%",
          width: "100%",
          alignItems: "left",
          backgroundColor: "#b0bada",
        }}
      >
        <Grid container columns={16} justifyContent="left" spacing={1}>
          <Grid item xs={4} sm={6}>
            {isEditMode ? (
              <UpDateProd
                produto={produto}
                onClose={() => setIsEditMode(false)}
              />
            ) : (
              <ProductImage
                imageUrl={produto.image_url}
                onEditClick={handleEditClick}
                user={user}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={10}>

            <Grid container alignItems="left" columns={24} direction="column">
              <Grid item xs={12} sm={4}>
                <ProductInfo
                  name={produto.name}
                  category={produto.category}
                  rating={avgprod}
                />
              </Grid>
              <Grid item xs={12} sm={12}  style={{ marginBottom: "-1px" }}>
                <ReviewList productId={produto.id} user={user} />
              </Grid>
              <Grid item xs={12} sm={10}>

              <Grid item xs={12} sm={10}>

            <CardActions
              sx={{
                margin: "5px",
                borderRadius: "10",
                shapeMargin: "circle",
                fontSize: "24px",
              }}
            >
              <Button size="small" onClick={handleBackClick}>
                <ArrowBackIcon /> Voltar
              </Button>
            </CardActions>

                 </Grid>

              </Grid>
            </Grid>          
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default ExpandedProduto;
