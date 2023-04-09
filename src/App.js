import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import {
  Box,
  Paper,
  Grid,
  Container,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
  TextField,
  Button,
  Slider,
  Stack,
} from '@mui/material';

// Define the theme
const theme = createTheme({
  palette: {
    mode: 'dark', // or 'dark'
  },
  spacing: 4,
});

// Style the Box component based on the theme
const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  height: '100vh',
  padding: theme.spacing(2),
}));

// Define the Paper component
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const StyledImg = styled('img')({
  maxWidth: '100%',
});

function RedditImageScraper({ subreddit }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function fetchImages() {
      const response = await fetch(
        `https://www.reddit.com/r/${subreddit}/new.json?limit=100`
      );
      const data = await response.json();
      console.log(data.data);
      const newImages = data.data.children
        .filter((post) => post.data.post_hint === 'image')
        .map((post) => {
          return {
            img: post?.data?.url,
            title: post?.data?.title,
            permalink: post?.data?.permalink,
          };
        });
      console.log(newImages);
      setImages(newImages);
    }
    fetchImages();
  }, [subreddit]);

  return (
    <Box sx={{ width: '100%', height: 450, overflowY: 'scroll' }}>
      <ImageList cols={3} gap={8} variant='masonry'>
        {images.map((item) => (
          <ImageListItem key={item.img}>
            <img
              src={`${item.img}?w=248&fit=crop&auto=format`}
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading='lazy'
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

// Define the App component
function App() {
  return (
    <ThemeProvider theme={theme}>
      <StyledBox>
        <Container maxWidth='xl'>
          <Grid container spacing={4} alignItems='center'>
            <Grid item xs={10}>
              <TextField label='Input 1' fullWidth />
            </Grid>
            <Grid item xs={2}>
              <Button variant='contained' color='primary'>
                Button
              </Button>
            </Grid>
          </Grid>
          <Grid></Grid>
          <Box mt={4}>
            <Grid container spacing={10} alignItems='center'>
              <Grid item xs={12}>
                <Typography variant='h5' component='h2'>
                  Heading
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Grid container spacing={4} alignItems='center'>
                  <Grid item xs={5}>
                    <StyledPaper>Button 1</StyledPaper>
                  </Grid>
                  <Grid item xs={6}>
                    <StyledPaper>Button 2</StyledPaper>
                  </Grid>
                  <Grid item xs={12}>
                    <StyledPaper>Button 3</StyledPaper>
                  </Grid>
                  <Grid item xs={4}>
                    <StyledPaper>Button 4</StyledPaper>
                  </Grid>
                  <Grid item xs={4}>
                    <StyledPaper>Button 4</StyledPaper>
                  </Grid>
                  <Grid item xs={4}>
                    <StyledPaper>Button 4</StyledPaper>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid item xs={12}>
                  <RedditImageScraper subreddit='midjourney' />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='h5' component='h2'>
                    Sliders
                  </Typography>
                </Grid>
                <Stack>
                  <Slider defaultValue={30} />
                  <Slider defaultValue={30} />
                  <Slider defaultValue={30} />
                  <Slider defaultValue={30} />
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </StyledBox>
    </ThemeProvider>
  );
}

export default App;
