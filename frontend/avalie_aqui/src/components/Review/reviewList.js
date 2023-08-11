import React, { useState, useEffect } from "react";
import * as api from "../../api/index";
import ReactStars from "react-star-ratings";
import { Avatar, Grid, Paper, IconButton, Typography } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import AvalieAqui from "../Produtos/Produto/avalieAqui";
import ReviewComponent from "./doReview";

const imgLink =
  "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

const ReviewList = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [currentComment, setCurrentComment] = useState(0);
  const [showReviewComponent, setShowReviewComponent] = useState(false); // New state to track the review component visibility

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const revisoes = await api.getReviewsByProductId(productId);
        //console.log(revisoes);
        setReviews(revisoes.reviews);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchReviews();
  }, [productId]);

  const handleAvalieAquiClick = () => {
    setShowReviewComponent(true); // Show the review component when the button is clicked
  };

  const handleNextComment = () => {
    setCurrentComment((prevComment) =>
      prevComment === reviews.length - 1 ? 0 : prevComment + 1
    );
  };

  const handlePrevComment = () => {
    setCurrentComment((prevComment) =>
      prevComment === 0 ? reviews.length - 1 : prevComment - 1
    );
  };

  if (reviews === undefined || reviews.length === 0) {
    return <div>Carregando...</div>;
  }

  return (
    <Grid className="App" sx={{width:"100%", height:"70%"}}>
      <Typography variant="h5" style={{ textAlign: "left", marginLeft: 10 }}>
        - Avaliações e Comentários
      </Typography>

      {showReviewComponent ? (
        // If showReviewComponent is true, render the ReviewComponent
        <ReviewComponent productId={productId} />
      ) : (
        // Div de comentários é aqui
        <Grid
          sx={{
            display: "flex",           
            overflowX: "hidden", // Hide the horizontal scrollbar
            overflowY: "hidden",
            marginTop: "35px", // Center the comments          
            position: "relative", // Set position to relative for the arrow buttons
            width: "100%",
          }}
        >
          {/* Left arrow button */}
          <IconButton onClick={handlePrevComment} style={{ position: "absolute", left: 0, paddingTop:85 }}>
            <ArrowBack />
          </IconButton>

          {reviews.map((review, index) => (
            <Paper
              //key={review.id}
              sx={{
                width: "100%",
                height: "170px", // Define a altura fixa para o Paper
                backgroundColor: "#30404F",
                border: "3px solid black",
                paddingTop: "20px",
                paddingBottom: "20px",
                paddingLeft: "50px",
                paddingRight: "50px",
                display: index === currentComment ? "block" : "none", // Hide other comments
              }}
            >
              <Grid container wrap="wrap" spacing={1}>
              <Grid
                    item
                    sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center", // Centraliza os itens horizontalmente
                    justifyContent: "center", // Centraliza os itens verticalmente
                    }}
                    >
                    <Avatar alt="Remy Sharp" sx={{border: "3px solid white",}} src={imgLink} />
                    <Typography variant="h6" color="white" style={{ margin: 0, textAlign: "center" }}>
                    {review.reviewer.name}
                    </Typography>
                    <Grid onClick={handleAvalieAquiClick}>
                     <AvalieAqui />
                    </Grid>
                    
                    </Grid>
                <Grid
                  justifyContent="center"
                  style={{
                    paddingLeft: "30px",
                    paddingRight: "20px",
                  }}
                  item
                  xs
                >
                  <Grid container alignItems="center" columns={16}  spacing={0} direction="column">
                    <Grid item xs={12} md={12} sx={{ textAlign: "center" }}>
                      <ReactStars
                        count={5}
                        starDimension="20px"
                        rating={review.rating || 0}
                        edit={true}
                        isHalf={true}
                        emptyIcon={<i className="far fa-star"></i>}
                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                        fullIcon={<i className="fa fa-star"></i>}
                        starRatedColor="white"
                        starEmptyColor="black"
                      />
                    </Grid>
                    <Grid item  zeroMinWidth xs={12} md={10}>
                      <Typography  variant="body1" style={{ textAlign: "left", color: "white",maxHeight: '100px',
                       overflow: 'hidden', // Oculta o texto que ultrapassar a altura máxima
                       textOverflow: 'ellipsis' // Adiciona reticências no final do texto cortado
                       
                    }}>
                        {review.comments}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>                  
              </Grid>
             
              
            </Paper>
          ))}

          {/* Right arrow button */}
          <IconButton onClick={handleNextComment} style={{ position: "absolute", right: 0, paddingTop:85 }}>
            <ArrowForward />
          </IconButton>
        </Grid>
      )}
    </Grid>
  );
};

export default ReviewList;
