import { Typography, Box, Button, TextField,Paper } from '@mui/material';
import { z } from 'zod';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import decode from 'jwt-decode';
import * as api from '../../api/index.js';
import ReactStars from 'react-star-ratings';

const ReviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comments: z.string().min(1),
});

const ReviewComponent = ({ productId }) => {

  const storedProfile = JSON.parse(localStorage.getItem('profile'));
  const [user, setUser] = useState(storedProfile || {});
  
  const location = useLocation();


  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState('');

  const handleStarClick = (starIndex) => {
    if (starIndex === rating) {
      // If the clicked star is already selected, reset the rating
      setRating(0);
    } else {
      // Otherwise, update the rating to the clicked star
      setRating(starIndex);
    }
  };


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
      
      console.log(
        {
          reviewerId: user.id, // You can set the reviewer data here
          ratedProductId: productId,
          rating: parseFloat(rating),
          comments: validReviewData.comments,
        }
      )
      api.doReview({
        reviewerId: 1, // You can set the reviewer data here
        ratedProductId: productId,
        rating: validReviewData.rating,
        comments: validReviewData.comments,
      })
        .then((response) => {
          console.log('Review saved successfully:', response);
          // Additional logic after saving the review
        })
        .catch((error) => {
          console.error('Error saving review:', error);
          // Additional logic in case of error while saving the review
        });
    } catch (error) {
      console.error('Invalid review data:', error);
      // Handle validation error
    }
  };

  return (
    <Paper
    
    style={{
      minWidth: 797,
      height: 200,
      backgroundColor: "#30404F",
      border: "3px solid black",
      marginTop: "35px",
      //paddingTop: "35px",
      paddingBottom: "20px",
      paddingLeft: "50px",
      paddingRight: "50px",
     
    }}
  >
    <Box>
      <Typography variant="h5">Avalie o Produto</Typography>
      <ReactStars
        count={5}
        starDimension="50px"
        changeRating={rating}
        isSelectable= "true"
        isHalf={true}
        emptyIcon={<i className="far fa-star"></i>}
        halfIcon={<i className="fa fa-star-half-alt"></i>}
        fullIcon={<i className="fa fa-star"></i>}
        starRatedColor="yellow"
      />
      <TextField
        placeholder="Seu Comentário"
        value={comments}
        onChange={(event) => setComments(event.target.value)}
        style={{ width: '100%', height: '100%', marginTop: '10px' }}
      />
      <Button variant="contained" onClick={handleSaveReview}>
        Salvar Avaliação
      </Button>
    </Box>
    </Paper>
  );
};

export default ReviewComponent;
