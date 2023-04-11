import React, { memo, useState, useEffect, useCallback } from 'react';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  ButtonGroup,
  Chip,
  Grid,
  Container,
  IconButton,
  Typography,
  TextField,
  Input,
  Button,
  Stack,
  InputAdornment,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { attributeOptions } from './attributes/params';
import { photoChips } from './attributes/chipObject';
import { artistChips } from './attributes/artistsObject';
import RedditImageScraper from './components/RedditImageScraper';
import { CopyAll } from '@mui/icons-material';
import './App.css';
const theme = createTheme({
  palette: {
    mode: 'dark', // or 'dark'
  },
  spacing: 4,
});

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  height: '100%',
  padding: theme.spacing(2),
}));

function App() {
  const defaultInfo =
    'Here you will find more information about any parameter or attribute.  Just click on the attribute you want to learn more about.';
  const [attributes, setAttributes] = useState({});
  const [selectedChips, setSelectedChips] = useState([]);
  const [selectedParams, setSelectedParams] = useState([]);

  const [aspectRatio, setAspectRatio] = useState({ width: 1, height: 1 });
  const [attributeDescription, setAttributeDescription] = useState(defaultInfo);
  const [currentAttribute, setCurrentAttribute] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [userInput, setUserInput] = useState('');

  const addAttribute = useCallback((category, attribute, desc, prefix) => {
    const prefixedAttribute = prefix + attribute; // append the prefix to the attribute value
    setAttributeDescription(desc);
    setCurrentAttribute(prefix);

    // tracking this just to show example aspect ration in help box
    if (prefix === '--ar:') {
      const [width, height] = attribute.split(':');
      setAspectRatio({ width, height });
    }

    setAttributes((prevAttributes) => ({
      ...prevAttributes,
      [category]: prefixedAttribute,
    }));
  }, []);

  const removeAttribute = useCallback((category) => {
    if (category === 'aspectRatio') {
      setAspectRatio({ width: 1, height: 1 });
    }
    setAttributeDescription(defaultInfo);
    setCurrentAttribute('');
    setAttributes((prevAttributes) => {
      const newAttributes = { ...prevAttributes };
      delete newAttributes[category];
      return newAttributes;
    });
  }, []);

  const AttributeGroup = memo(
    ({ attributeName, value, addAttribute, removeAttribute }) => (
      <div>
        <div>{value.name}</div>

        <ButtonGroup>
          {value.options.map((option) => (
            <AttributeButton
              key={option.value}
              label={option.label}
              attribute={attributeName}
              value={option.value}
              multiple={value.multiple}
              onClick={() =>
                addAttribute(
                  attributeName,
                  option.value,
                  value.description,
                  value.prefix
                )
              }
            />
          ))}
        </ButtonGroup>

        {attributes[attributeName] && (
          <Button
            variant='contained'
            color='error'
            onClick={() => removeAttribute(attributeName)}
          >
            {/* Remove {value.name} */}X
          </Button>
        )}
      </div>
    )
  );
  const AttributeButton = memo(({ label, attribute, onClick }) => (
    <Button onClick={() => onClick(attribute)} color='secondary'>
      {label}
    </Button>
  ));

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const buildPromptString = () => {
    const attributeString = Object.values(attributes).join(' ');
    const chipString = Object.values(selectedChips).join(' ');
    return `MidJourney ${userInput} ${chipString} ${attributeString}`;
  };

  // ACCORDION

  function AccordionGroup({ items, expanded, handleChange, MemoizedChip }) {
    return (
      <div>
        {items.map(([key, value]) => (
          <Accordion
            key={key}
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
                    <MemoizedChip chip={chip} />
                  </Grid>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    );
  }

  // CHIPS

  const MemoizedChip = memo(({ chip }) => {
    const attribute = chip.label ? chip.label + ', ' + chip.value : chip;
    const selected = selectedChips.includes(attribute);
    const handleClick = () => {
      if (selected) {
        setSelectedChips((prevChips) =>
          prevChips.filter((chip) => chip !== attribute)
        );
      } else {
        setSelectedChips((prevChips) => [...prevChips, attribute]);
      }
    };

    const handleDelete = () => {
      setSelectedChips((prevChips) =>
        prevChips.filter((chip) => chip !== attribute)
      );
    };
    return (
      <Chip
        label={chip.label ? chip.label : chip}
        variant='outlined'
        onClick={handleClick}
        onDelete={selected ? handleDelete : undefined}
        value={chip}
        color={selected ? 'success' : 'default'}
      />
    );
  });

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
                    <AttributeGroup
                      key={key}
                      value={value}
                      attributeName={key}
                      addAttribute={addAttribute}
                      removeAttribute={removeAttribute}
                      defaultInfo={defaultInfo}
                      currentAttribute={currentAttribute}
                      setAttributeDescription={setAttributeDescription}
                    />
                  ))}
                </Grid>

                <Grid item xs={5}>
                  <Grid item xs={12}>
                    <Grid container alignItems='center' justifyContent='center'>
                      {currentAttribute === '--ar:' ? (
                        <>
                          <Grid item xs={8}>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: attributeDescription,
                              }}
                            />
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
                                width: aspectRatio.width * 20,
                                height: aspectRatio.height * 20,
                                backgroundColor: 'secondary.dark',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: 'center',
                              }}
                            >
                              {aspectRatio.width} : {aspectRatio.height}
                            </Box>
                          </Grid>
                        </>
                      ) : (
                        <Grid item xs={12}>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: attributeDescription,
                            }}
                          />
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
                  <AccordionGroup
                    items={Object.entries(photoChips)}
                    expanded={expanded}
                    handleChange={handleChange}
                    MemoizedChip={MemoizedChip}
                  />
                  <Typography variant='h5' component='h2'>
                    Artists and Styles
                  </Typography>
                  <AccordionGroup
                    items={Object.entries(artistChips)}
                    expanded={expanded}
                    handleChange={handleChange}
                    MemoizedChip={MemoizedChip}
                  />{' '}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid item xs={12} alignItems='flex-start'>
                {/* <RedditImageScraper subreddit='midjourney' /> */}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </StyledBox>
    </ThemeProvider>
  );
}

export default App;
