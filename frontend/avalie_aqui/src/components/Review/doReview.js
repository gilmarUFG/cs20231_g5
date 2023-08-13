import { Typography, Grid, Button, TextField, Paper } from "@mui/material";
import { z } from "zod";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import decode from "jwt-decode";
import * as api from "../../api/index.js";
import Rating from "@mui/material/Rating";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ReviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comments: z.string().min(1),
});

const ReviewComponent = ({ productId }) => {
  const storedProfile = JSON.parse(localStorage.getItem("profile"));
  const [user, setUser] = useState(storedProfile || {});

  const location = useLocation();

  const [rating, setRating] = React.useState(0);
  const [comments, setComments] = useState("");

  useEffect(() => {
    const token = user?.access_token;

    if (token) {
      const decodeToken = decode(token);

      setUser(decodeToken);
    }
  }, [location]);

  const handleSaveReview = () => {
    const reviewData = {
      rating,
      comments,
    };

    try {
      const validReviewData = ReviewSchema.parse(reviewData);

      // console.log({
      //   reviewerId: user.id, // You can set the reviewer data here
      //   ratedProductId: productId,
      //   rating: parseFloat(rating),
      //   comments: validReviewData.comments,
      // });
      api
        .doReview({
          reviewerId: 1, // You can set the reviewer data here
          ratedProductId: productId,
          rating: validReviewData.rating,
          comments: validReviewData.comments,
        })
        .then((response) => {
          console.log("Review saved successfully:", response);

          // Additional logic after saving the review
          toast.success('Produto avaliado com sucesso!');
          setTimeout(() => {
            window.location.reload();
          }, 2000);
          
        })
        .catch((error) => {
          console.error("Error saving review:", error);
          // Additional logic in case of error while saving the review
        });
    } catch (error) {
      console.error("Invalid review data:", error);
      // Handle validation error
    }
  };

  return (
    <Paper
      style={{
        width: "100%",
        height: "170px",
        backgroundColor: "#30404F",
        border: "3px solid black",
        //marginTop: "35px",
        paddingTop: "10px",
        paddingBottom: "20px",
        paddingLeft: "10px",
        paddingRight: "10px",
      }}
    >
      <Grid container spacing={1} columns={10} alignItems="center">
        <Grid item sm={4}>
          <Grid container spacing={1} columns={16} direction="column" alignItems="center">
            <Grid item sm={4}>
              <Typography variant="h5" color={"white"}>Avalie o Produto</Typography>
            </Grid>

            <Grid item sm={4}>
              <Rating
                name="simple-controlled"
                value={rating}
                onChange={(event,newValue) => {
                  setRating(newValue);
                }}
                sx={{
                  fontSize: "3rem",
                  '& .MuiRating-iconFilled': {
                    color: 'yellow',
                  },
                  '& .MuiRating-iconFocus': {
                    color: 'orange',
                  },
                  '& .MuiRating-iconHover': {
                    color: 'white',
                  },
                  '& .MuiRating-emptyIcon':{
                    color: 'black',
                  },
                }}
                precision={0.5}
              />
             
            </Grid>
            <Grid item sm={4}>
                <Button variant="contained" onClick={handleSaveReview} size="large" sx={{width:"100%"}}>
                  Salvar Avaliação
                </Button>
              </Grid>
          </Grid>
        </Grid>
        <Grid item sm={6}>
        <TextField
          label="Comente Aqui!!"
          id="outlined-multiline-static"
          multiline
          variant="filled" 
          color="success" 
          focused
          rows={4}
          value={comments}
          inputProps={{ style: { color: "white" } }}
          onChange={(event) => setComments(event.target.value)}
          style={{ width: "100%", height: "100%"}}
        />
      </Grid>
      </Grid> 
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
    </Paper>
  );
};

export default ReviewComponent;
