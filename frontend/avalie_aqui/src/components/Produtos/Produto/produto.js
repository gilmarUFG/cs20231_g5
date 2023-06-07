import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';


const Produto = ({ produto }) => {
  //<CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
    
  return (
    <Grid item key={produto} >
                <Card
                  sx={{ height: '100%',width:'100%', display: 'flex', flexDirection: 'column' }}
                >
                 <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: '90.25%',
                    }}
                    image = {produto.image_url || 'https://source.unsplash.com/random?wallpapers'}
                  />
                  <CardContent sx={{ flexGrow: 2 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                    {produto.name}
                    </Typography>
                    <Typography>
                    {produto.category}
                    </Typography>
                  </CardContent>
                  <CardActions>
                      <Button size="small">Avaliar</Button>
                  </CardActions>
                </Card>
              </Grid>
  );
};

export default Produto;

