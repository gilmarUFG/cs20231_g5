import React, { useState } from "react";
import * as api from "../../api/index";
import ReactStars from "react-star-ratings";
import { Avatar, Grid, Paper, IconButton } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

const imgLink =
  "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

const ReviewList = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [currentComment, setCurrentComment] = useState(0);

  React.useEffect(() => {
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
    <div style={{ padding: "14px 0" }} className="App">
      <h4 style={{ textAlign: "left", marginLeft: 14 }}>
        - Avaliações e Comentários
      </h4>

      {/* Container for comments with horizontal scrolling */}
      <div
        style={{
          display: "flex",
          flexWrap: "nowrap",
          overflowX: "hidden", // Hide the horizontal scrollbar
          margin: "0 auto", // Center the comments
          alignItems: "center", // Vertically center the arrow buttons and comments
          position: "relative", // Set position to relative for the arrow buttons
          height: 200, // Set a fixed height for the comment container
        }}
      >
        {/* Left arrow button */}
        <IconButton
          onClick={handlePrevComment}
          style={{ position: "absolute", left: 0 }}
        >
          <ArrowBack />
        </IconButton>

        {reviews.map((review, index) => (
          <Paper
            key={review.id}
            style={{
              minWidth: 797,
              minHeight: 170,              
              marginRight: 10,
              border: "3px solid black",
              padding: "10px",
              display: index === currentComment ? "block" : "none", // Hide other comments
              margin: "0 auto", // Center the selected comment
            }}
          >
            <Grid container wrap="nowrap" spacing={2}>
              <Grid item>
                <Avatar alt="Remy Sharp" src={imgLink} />
              </Grid>
              <Grid justifyContent="left" item xs>
                <h4 style={{ margin: 0, textAlign: "left" }}>
                  {review.reviewer.name}
                </h4>
                <Grid justifyContent="center" item>
                  <h9 style={{ textAlign: "left" }}>{review.comments}</h9>
                  <p
                    style={{
                      textAlign: "center",
                      color: "gray",
                      border: "1px solid white",
                      borderRadius: 1.5,
                    }}
                  >
                    <ReactStars
                      count={5}
                      starDimension="30px"
                      rating={review.rating || 0}
                      edit={true}
                      isHalf={true}
                      emptyIcon={<i className="far fa-star"></i>}
                      halfIcon={<i className="fa fa-star-half-alt"></i>}
                      fullIcon={<i className="fa fa-star"></i>}
                      starRatedColor="green"
                    />
                  </p>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        ))}

        {/* Right arrow button */}
        <IconButton
          onClick={handleNextComment}
          style={{ position: "absolute", right: 0 }}
        >
          <ArrowForward />
        </IconButton>
      </div>
    </div>
  );
};

export default ReviewList;
