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
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { CopyAll } from '@mui/icons-material';
// Define the theme
const theme = createTheme({
  palette: {
    mode: 'dark', // or 'dark'
  },
  spacing: 4,
});
const StyledChip = styled(Chip)(({ theme, selected }) => ({
  backgroundColor: selected ? theme.palette.primary.main : 'transparent',
  color: selected
    ? theme.palette.primary.contrastText
    : theme.palette.text.primary,
}));
const attributeOptions = {
  aspectRatio: {
    name: 'Aspect Ratio',
    description:
      'The default aspect ration is 1:1. Common aspect ratios include 5:4 for frame and print ratio, 3:2 common in print photography, and 7:4 close to HD TV and smartphone screens.',
    prefix: '--ar:',
    options: [
      { value: '2:3', label: '2:3' },
      { value: '3:2', label: '3:2' },
      { value: '4:5', label: '4:5' },
      { value: '5:4', label: '5:4' },
      { value: '4:7', label: '4:7' },
      { value: '7:4', label: '7:4' },
    ],
  },
  chaos: {
    name: 'Chaos',
    description:
      'This parameter influences how vaired the inital image  grids are.  The higher the value the more unusual and unexpected results and differences between the variations.',
    max: 100,
    slider: true,
    prefix: '--chaos:',
  },
  quality: {
    name: 'Quality',
    description:
      'Quality parameter changes how much time is spent genrating the image.  Higher values will take longer to generate and produce more details.  Higher values also mean more GPU minutes are used. THe quality is not related ot the resolution of the image.  As ov Version 4 the highest quality setting is 1 which is the default.  You may want to use a lower quality setting to see what kind of results you get, sometimes they may look better especially for a general astract look.',
    options: [
      { value: '.25', label: '.25' },
      { value: '.5', label: '.5' },
    ],
    prefix: '--quality',
  },
};

const photoChips = {
  angles: {
    name: 'Camera Angles',
    description: 'Defines camera and lens types',
    chips: [
      {
        label: 'Low-Angle Shot',
        value: 'Sony Alpha a7 III camera with a Sony FE 16-35mm f/2.8 GM lens',
      },
      {
        label: 'High-Angle Shot',
        value: 'Nikon D850 camera with a Nikkor 24-70mm f/2.8E ED VR lens',
      },
    ],
  },
  lighting: {
    name: 'Lighting',
    description: 'Defines the lighting of the scene',
    chips: [
      {
        label: 'Sunny',
        value:
          'Canon EOS 5D Mark IV camera with a Canon EF 24-70mm f/2.8L II USM lens',
      },
      {
        label: 'Partly Cloudy',
        value: 'Nikon D850 camera with a Nikkor 24-70mm f/2.8E ED VR lens',
      },
      {
        label: 'Rainy',
        value:
          'Sony Alpha a7 III camera with a Sony FE 16-35mm f/2.8 GM lens and waterproof housing',
      },

      {
        label: 'Snowy',
        value:
          'Canon EOS-1D X Mark II camera with a Canon EF 24-105mm f/4L IS II USM lens and waterproof housing',
      },

      {
        label: 'Overcast',
        value:
          'Panasonic Lumix GH5S camera with a Panasonic Lumix 12-35mm f/2.8 II lens',
      },
      {
        label: 'Foggy',
        value:
          'Sony Alpha a7R IV camera with a Sony FE 70-200mm f/2.8 GM OSS lens',
      },

      {
        label: 'Hazy',
        value: 'Canon EOS R6 camera with a Canon RF 24-105mm f/4L IS USM lens',
      },
    ],
  },

  timeOfDay: {
    name: 'Time of Day',
    description: 'Defines the time of day the scene is set in',
    chips: [
      {
        label: 'Sunrise',
        value: 'Sony A7R IV camera with a Canon RF 15-35mm f/2.8L IS USM lens',
      },
      {
        label: 'Morning',
        value:
          'Fujifilm X-T4 camera with a Fujinon XF 16-55mm f/2.8 R LM WR lens',
      },
      {
        label: 'Afternoon',
        value: 'Sony A7 III camera with a Sony FE 70-200mm f/2.8 GM OSS lens',
      },
      {
        label: 'Golden Hour',
        value: 'Canon EOS R5 camera with a Canon RF 50mm f/1.2L USM lens',
      },
      {
        label: 'Sunset',
        value: 'Sony A7R IV camera with a Sony FE 16-35mm f/2.8 GM lens',
      },
      {
        label: 'Twilight',
        value:
          'Panasonic Lumix S1H camera with a Panasonic Lumix S Pro 50mm f/1.4 lens',
      },
      {
        label: 'Night',
        value: 'Sony A7S III camera with a Sigma 35mm f/1.2 DG DN Art lens',
      },
    ],
  },

  ambianceAndStyling: {
    name: 'Ambiance & Styling',
    description: 'Defines the overall mood and style of the scene',
    chips: [
      {
        label: 'Dark and Moody',
        value: 'Sony a7S III with Sony FE 50mm f/1.4 ZA lens',
      },
    ],
  },
};
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
    let newAttribute = value.label + ', ' + value.value;

    setSelectedChips((prevChips) => {
      if (prevChips.includes(newAttribute)) {
        return prevChips.filter((chip) => chip !== newAttribute);
      } else {
        return [...prevChips, newAttribute];
      }
    });
  };
  const handleDeleteChip = (value) => {
    let newAttribute = value.label + ', ' + value.value;
    setSelectedChips((prevChips) =>
      prevChips.filter((chip) => chip !== newAttribute)
    );
  };
  const isChipSelected = (value) => {
    let newAttribute = value.label + ', ' + value.value;
    return selectedChips.includes(newAttribute);
  };

  const handleMainInput = (event) => {
    setUserInput(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <StyledBox>
        <Container maxWidth='xl'>
          <Grid container spacing={4} alignItems='center'>
            <Grid item xs={6}>
              <Stack spacing={10}>
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
              </Stack>
            </Grid>
            <Grid item xs={2}>
              <Button
                onClick={() =>
                  navigator.clipboard.writeText(buildPromptString())
                }
              >
                Copy
              </Button>
            </Grid>
          </Grid>

          <Box mt={4}>
            <Grid container spacing={10}>
              <Grid item xs={8}>
                <Grid container spacing={4}>
                  <Grid item xs={5}>
                    <Typography variant='h5' component='h2'>
                      Parameters
                    </Typography>
                    {Object.entries(attributeOptions).map(([key, value]) => (
                      <div key={key}>
                        <div>{value.name}</div>
                        {/* <p>{value.description}</p> */}
                        {console.log(value.max)}
                        {value.slider ? (
                          <Slider
                            max={value.max}
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
                  <Grid item xs={7}>
                    <Typography variant='h5' component='h2'>
                      Photography
                    </Typography>
                    {Object.entries(photoChips).map(([key, value]) => (
                      <div key={key}>
                        <Typography variant='h5' component='h2'>
                          {value.name}
                        </Typography>
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
                                    label={chip.label}
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
                    ))}
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={4}>
                <Grid item xs={12}>
                  <Typography variant='h5' component='h2'>
                    More info
                  </Typography>
                  <Box>{attributeDescription}</Box>
                  {currentAttribute === '--ar:' && (
                    <Box
                      sx={{
                        width: aspectWidth * 10,
                        height: aspectHeight * 10,
                        backgroundColor: 'primary.dark',
                        // '&:hover': {
                        //   backgroundColor: 'primary.main',
                        //   opacity: [0.9, 0.8, 0.7],
                        // },
                      }}
                    />
                  )}
                </Grid>
                <Grid item xs={12}>
                  <RedditImageScraper subreddit='midjourney' />
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </StyledBox>
    </ThemeProvider>
  );
}

export default App;
