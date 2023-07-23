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
        console.log(revisoes);
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
    <div className="App">
      <Typography variant="h5" style={{ textAlign: "left", marginLeft: 10 }}>
        - Avaliações e Comentários
      </Typography>

      {showReviewComponent ? (
        // If showReviewComponent is true, render the ReviewComponent
        <ReviewComponent productId={productId} />
      ) : (
        // Div de comentários é aqui
        <div
          style={{
            display: "flex",
            // flexWrap: "nowrap",
            overflowX: "hidden", // Hide the horizontal scrollbar
            marginTop: "35px", // Center the comments
           // alignItems: "center", // Vertically center the arrow buttons and comments
            position: "relative", // Set position to relative for the arrow buttons
            //height: 300, // Set a fixed height for the comment container
          }}
        >
          {/* Left arrow button */}
          <IconButton onClick={handlePrevComment} style={{ position: "absolute", left: 0, paddingTop:85 }}>
            <ArrowBack />
          </IconButton>

          {reviews.map((review, index) => (
            <Paper
              //key={review.id}
              style={{
                minWidth: 797,
                minHeight: 200,
                backgroundColor: "#30404F",
                border: "3px solid black",
                paddingTop: "20px",
                paddingBottom: "20px",
                paddingLeft: "50px",
                paddingRight: "50px",
                display: index === currentComment ? "block" : "none", // Hide other comments
              }}
            >
              <Grid container wrap="nowrap" spacing={1}>
                <Grid item>
                  <Avatar alt="Remy Sharp" style={{ marginLeft: 36 }} src={imgLink} />
                  <Typography variant="h6" style={{ margin: 0, textAlign: "left" }}>
                    {review.reviewer.name}
                  </Typography>
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
                  <Grid container alignItems="center" spacing={0}>
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
                    <Grid item xs={12} md={12}>
                      <Typography variant="body1" style={{ textAlign: "left", color: "white" }}>
                        {review.comments}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <div onClick={handleAvalieAquiClick} style={{ position: "absolute", left: 300, padding: 10, }}>
                <AvalieAqui />
              </div>
            </Paper>
          ))}

          {/* Right arrow button */}
          <IconButton onClick={handleNextComment} style={{ position: "absolute", right: 0, paddingTop:85 }}>
            <ArrowForward />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default ReviewList;
