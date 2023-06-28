import { Typography, Box, Button, TextField } from '@mui/material';
import { z } from 'zod';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import decode from 'jwt-decode';
import * as api from '../../api/index.js';

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
    <Box>
      <Typography variant="h5">Avalie o Produto</Typography>
      <Box>
        <Button
          variant={rating >= 1 ? 'contained' : 'outlined'}
          color={rating >= 1 ? 'warning' : 'inherit'}
          onClick={() => handleStarClick(1)}
          style={{ marginRight: '5px' }}
        >
          ★
        </Button>
        <Button
          variant={rating >= 2 ? 'contained' : 'outlined'}
          color={rating >= 2 ? 'warning' : 'inherit'}
          onClick={() => handleStarClick(2)}
          style={{ marginRight: '5px' }}
        >
          ★
        </Button>
        <Button
          variant={rating >= 3 ? 'contained' : 'outlined'}
          color={rating >= 3 ? 'warning' : 'inherit'}
          onClick={() => handleStarClick(3)}
          style={{ marginRight: '5px' }}
        >
          ★
        </Button>
        <Button
          variant={rating >= 4 ? 'contained' : 'outlined'}
          color={rating >= 4 ? 'warning' : 'inherit'}
          onClick={() => handleStarClick(4)}
          style={{ marginRight: '5px' }}
        >
          ★
        </Button>
        <Button
          variant={rating >= 5 ? 'contained' : 'outlined'}
          color={rating >= 5 ? 'warning' : 'inherit'}
          onClick={() => handleStarClick(5)}
        >
          ★
        </Button>
      </Box>
      <TextField
        placeholder="Seu Comentário"
        value={comments}
        onChange={(event) => setComments(event.target.value)}
        style={{ width: '100%', height: '100px', marginTop: '10px' }}
      />
      <Button variant="contained" onClick={handleSaveReview}>
        Salvar Avaliação
      </Button>
    </Box>
  );
};

export default ReviewComponent;
