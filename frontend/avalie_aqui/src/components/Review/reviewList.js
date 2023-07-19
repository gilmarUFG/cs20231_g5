import React from "react";

import { Divider, Avatar, Grid, Paper } from "@mui/material";

const imgLink =
  "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

  const ReviewList = ({ productId }) => {
  return (
    <div style={{ padding: 14 }} className="App">
      <h4>Comentários</h4>
      <Paper style={{ padding: "5px 20px" }}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar alt="Remy Sharp" src={imgLink} />
          </Grid>
          <Grid justifyContent="left" item xs >
            <h6 style={{ margin: 0, textAlign: "left" }}>Michel Michel</h6>
            <h7 style={{ textAlign: "left" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
              Suspendisse congue vulputate lobortis. Pellentesque at interdum
              tortor.{" "}
            </h7>
            <p style={{ textAlign: "left", color: "gray" }}>
              posted 1 minute ago
            </p>
          </Grid>
        </Grid>
        
      </Paper>      
    </div>
  );
}


export default ReviewList;