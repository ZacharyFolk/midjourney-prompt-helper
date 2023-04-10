import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AttributeButton,
  Box,
  ButtonGroup,
  Chip,
  Paper,
  Grid,
  Container,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
  TextField,
  Input,
  Button,
  Slider,
  Stack,
  InputAdornment,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { attributeOptions } from './attributes/params';
import { photoChips } from './attributes/chipObject';
import { artistChips } from './attributes/artistsObject';

import FileCopyIcon from '@mui/icons-material/FileCopy';
import { CopyAll } from '@mui/icons-material';
import './App.css';
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
  height: '100%',
  padding: theme.spacing(2),
}));

function RedditImageScraper({ subreddit }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function fetchImages() {
      const response = await fetch(
        `https://www.reddit.com/r/${subreddit}/new.json?limit=100`
      );
      const data = await response.json();
      const newImages = data.data.children
        .filter((post) => post.data.post_hint === 'image')
        .map((post) => {
          return {
            img: post?.data?.url,
            title: post?.data?.title,
            permalink: post?.data?.permalink,
          };
        });
      setImages(newImages);
    }
    fetchImages();
  }, [subreddit]);

  return (
    <Box
      sx={{
        width: '100%',
        height: 450,
        overflowY: 'scroll',
      }}
    >
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
  const defaultInfo =
    'Here you will find more information about any parameter or attribute.  Just click on the attribute you want to learn more about.';
  const [attributes, setAttributes] = useState({});
  const [selectedChips, setSelectedChips] = useState([]);
  const [aspectWidth, setAspectWidth] = useState(1);
  const [aspectHeight, setAspectHeight] = useState(1);
  const [attributeDescription, setAttributeDescription] = useState(defaultInfo);
  const [currentAttribute, setCurrentAttribute] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [userInput, setUserInput] = useState('');

  /**
   *
   * @param {*} category
   * @param {*} attribute
   * @param {*} desc
   * @param {*} prefix
   */
  const addAttribute = (category, attribute, desc, prefix) => {
    const prefixedAttribute = prefix + attribute; // append the prefix to the attribute value
    setAttributeDescription(desc);
    setCurrentAttribute(prefix);

    // tracking this just to show example aspect ration in help box
    if (prefix === '--ar:') {
      const [width, height] = attribute.split(':');
      setAspectWidth(width);
      setAspectHeight(height);
    }

    setAttributes((prevAttributes) => {
      const newAttributes = { ...prevAttributes };

      console.log(newAttributes);
      newAttributes[category] = prefixedAttribute;

      console.log(newAttributes);
      return newAttributes;
    });
  };

  const onSliderChange = (category, value, chosenValue) => {
    setAttributeDescription(value.description);
    console.log(value);
    addAttribute(category, chosenValue, value.description, value.prefix);
  };

  const removeAttribute = (category) => {
    if (category === 'aspectRatio') {
      setAspectWidth(1);
      setAspectHeight(1);
    }
    setAttributeDescription(defaultInfo);
    setCurrentAttribute('');
    setAttributes((prevAttributes) => {
      const newAttributes = { ...prevAttributes };
      delete newAttributes[category];
      return newAttributes;
    });
  };

  const AttributeButton = ({ label, attribute, onClick }) => (
    <Button onClick={() => onClick(attribute)}>{label}</Button>
  );

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const buildPromptString = () => {
    const attributeString = Object.values(attributes).join(' ');
    const chipString = Object.values(selectedChips).join(' ');
    return `MidJourney ${userInput} ${chipString} ${attributeString}`;
  };
  const handleChipClick = (value) => () => {
    let newAttribute = value.label ? value.label + ', ' + value.value : value;

    console.log(newAttribute);
    setSelectedChips((prevChips) => {
      if (prevChips.includes(newAttribute)) {
        return prevChips.filter((chip) => chip !== newAttribute);
      } else {
        return [...prevChips, newAttribute];
      }
    });
  };
  const handleDeleteChip = (value) => {
    let newAttribute = value.label ? value.label + ', ' + value.value : value;
    setSelectedChips((prevChips) =>
      prevChips.filter((chip) => chip !== newAttribute)
    );
  };
  const isChipSelected = (value) => {
    let newAttribute = value.label ? value.label + ', ' + value.value : value;
    return selectedChips.includes(newAttribute);
  };

  const handleMainInput = (event) => {
    setUserInput(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <StyledBox>
        <Container maxWidth='xl'>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Box sx={{ textAlign: 'center' }}>
                <h1>Midjourney Prompt Helper</h1>
              </Box>
            </Grid>

            <Grid item xs={7}>
              <Stack
                spacing={10}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                  minHeight: '100%',
                }}
              >
                <Input
                  placeholder='Type your imaginging here!'
                  fullWidth
                  onChange={handleMainInput}
                />
                <TextField
                  id='outlined-multiline-static'
                  label='Prompt'
                  multiline
                  rows={4}
                  fullWidth
                  disabled
                  value={buildPromptString()}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position='end'
                        style={{ position: 'absolute', top: 30, right: 10 }}
                      >
                        <IconButton
                          aria-label='copy'
                          onClick={() =>
                            navigator.clipboard.writeText(buildPromptString())
                          }
                        >
                          <CopyAll />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Stack spacing={2} direction='row'>
                  <Button variant='text'>Text</Button>
                  <Button variant='contained'>Contained</Button>
                  <Button variant='outlined'>Outlined</Button>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={1}>
              <Button
                onClick={() =>
                  navigator.clipboard.writeText(buildPromptString())
                }
              >
                Copy
              </Button>
            </Grid>
            {/* Next Grid item here  */}
          </Grid>

          <Grid
            container
            spacing={10}
            style={{ marginTop: '20px', marginBottom: '20px' }}
          >
            <Grid item xs={8}>
              <Grid container spacing={4}>
                <Grid item xs={7}>
                  <Typography
                    variant='h5'
                    component='h2'
                    style={{ marginTop: '20px', marginBottom: '20px' }}
                  >
                    Parameters
                  </Typography>
                  {Object.entries(attributeOptions).map(([key, value]) => (
                    <div key={key}>
                      <div>{value.name}</div>
                      {/* <p>{value.description}</p> */}
                      {console.log(value.max)}
                      {value.slider ? (
                        <Slider
                          min={0}
                          max={value.max}
                          step={10}
                          marks
                          onChange={(event, newValue) =>
                            onSliderChange(key, value, newValue)
                          }
                        />
                      ) : (
                        <ButtonGroup>
                          {value.options.map((option) => (
                            <AttributeButton
                              key={option.value}
                              label={option.label}
                              attribute={key}
                              value={option.value}
                              multiple={value.multiple}
                              onClick={() =>
                                addAttribute(
                                  key,
                                  option.value,
                                  value.description,
                                  value.prefix
                                )
                              }
                            />
                          ))}
                        </ButtonGroup>
                      )}

                      {attributes[key] && (
                        <Button
                          variant='contained'
                          color='error'
                          onClick={() => removeAttribute(key)}
                        >
                          {/* Remove {value.name} */}X
                        </Button>
                      )}
                    </div>
                  ))}
                </Grid>

                <Grid item xs={5}>
                  <Grid item xs={12}>
                    <Typography variant='h5' component='h2'>
                      More info
                    </Typography>
                    <Grid container alignItems='center' justifyContent='center'>
                      {currentAttribute === '--ar:' ? (
                        <>
                          <Grid item xs={8}>
                            {attributeDescription}
                          </Grid>
                          <Grid
                            item
                            xs={4}
                            sx={{
                              display: 'flex',
                              justifyContent: 'center',
                            }}
                          >
                            <Box
                              sx={{
                                width: aspectWidth * 20,
                                height: aspectHeight * 20,
                                backgroundColor: 'secondary.dark',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: 'center',

                                // '&:hover': {
                                //   backgroundColor: 'primary.main',
                                //   opacity: [0.9, 0.8, 0.7],
                                // },
                              }}
                            >
                              {aspectWidth} : {aspectHeight}
                            </Box>
                          </Grid>
                        </>
                      ) : (
                        <Grid item xs={12}>
                          {attributeDescription}
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <Typography variant='h5' component='h2'>
                    Photography
                  </Typography>
                  {Object.entries(photoChips).map(([key, value]) => (
                    <div key={key}>
                      <Accordion
                        expanded={expanded === key}
                        onChange={handleChange(key)}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls={`${key}-content`}
                          id={`${key}-header`}
                        >
                          <Typography sx={{ width: '33%', flexShrink: 0 }}>
                            {value.name}
                          </Typography>
                          <Typography sx={{ color: 'text.secondary' }}>
                            {value.description}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Grid container spacing={3}>
                            {value.chips.map((chip, index) => (
                              <Grid item key={index}>
                                <Chip
                                  key={index}
                                  label={chip.label ? chip.label : chip}
                                  variant='outlined'
                                  onClick={handleChipClick(chip)}
                                  onDelete={
                                    isChipSelected(chip)
                                      ? () => handleDeleteChip(chip)
                                      : undefined
                                  }
                                  value={chip}
                                  color={
                                    isChipSelected(chip) ? 'success' : 'default'
                                  }
                                />
                              </Grid>
                            ))}
                          </Grid>
                        </AccordionDetails>
                      </Accordion>
                    </div>
                  ))}

                  <Typography variant='h5' component='h2'>
                    Artists and Styles
                  </Typography>
                  {Object.entries(artistChips).map(
                    ([categoryKey, categoryValue]) => (
                      <div key={categoryKey}>
                        <Accordion
                          expanded={expanded === categoryKey}
                          onChange={handleChange(categoryKey)}
                        >
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`${categoryKey}-content`}
                            id={`${categoryKey}-header`}
                          >
                            <Typography sx={{ width: '33%', flexShrink: 0 }}>
                              {categoryValue.name}
                            </Typography>
                            <Typography sx={{ color: 'text.secondary' }}>
                              {categoryValue.description}
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Grid container spacing={3}>
                              {categoryValue.chips.map((chip, index) => (
                                <Grid item key={index}>
                                  <Chip
                                    key={index}
                                    label={chip}
                                    variant='outlined'
                                    onClick={handleChipClick(chip)}
                                    onDelete={
                                      isChipSelected(chip)
                                        ? () => handleDeleteChip(chip)
                                        : undefined
                                    }
                                    value={chip}
                                    color={
                                      isChipSelected(chip)
                                        ? 'success'
                                        : 'default'
                                    }
                                  />
                                </Grid>
                              ))}
                            </Grid>
                          </AccordionDetails>
                        </Accordion>
                      </div>
                    )
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid item xs={12} alignItems='flex-start'>
                <RedditImageScraper subreddit='midjourney' />
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </StyledBox>
    </ThemeProvider>
  );
}

export default App;
