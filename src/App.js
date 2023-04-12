import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import {
  Box,
  Grid,
  Container,
  IconButton,
  Typography,
  TextField,
  Input,
  Button,
  Stack,
  InputAdornment,
  Link,
  Popover,
  Paper,
} from '@mui/material';
import { attributeOptions } from './attributes/params';
import { photoChips } from './attributes/chipObject';
import { artistChips } from './attributes/artistsObject';
import AccordionGroup from './components/AccordionGroup';
import { ParamGroup } from './components/ParamGroup';
import RedditImageScraper from './components/RedditImageScraper';

import { useSelectionContext } from './context/SelectionContext';
import {
  CopyAll,
  TaskAlt,
  DeleteForever,
  Reddit,
  KeyboardDoubleArrowRight,
  KeyboardDoubleArrowLeft,
  Twitter,
  GitHub,
  HelpOutline,
} from '@mui/icons-material';
import './App.css';
const theme = createTheme({
  palette: {
    mode: 'dark',
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
    '<h2>Docs</h2><p>Parameters are options added to the end of the prompt to change how an image geneartes.</p><span style="font-size: 1.2em"> &#8612; </span> Select a value to find out more about each parameter. </p> <p>View more info at <a href="https://docs.midjourney.com/docs" target="_blank"> MidJourney documentation &#129125;</a> <i>(opens a new window)</i> </p>';

  // const [selectedParams, setSelectedParams] = useState([]);

  const [paramDesc, setParamDesc] = useState(defaultInfo);
  const [expanded, setExpanded] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [editInput, setEditInput] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [textFieldIcons, setTextFieldIcons] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { selectedChips, selectedParams, resetSelection } =
    useSelectionContext();

  const handleChange = (panel) => (isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const buildPromptString = () => {
    const chipString = Object.values(selectedChips).join(' ');
    const paramString = selectedParams.map((param) => param.value).join(' ');
    return `/imagine prompt: ${userInput} ${chipString} ${paramString}`;
  };

  const handleMainInput = (event) => {
    setUserInput(event.target.value);
  };

  const clearPrompt = () => {
    resetSelection();
  };

  const handleEnhanceOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleEnhanceClose = () => {
    setAnchorEl(null);
  };
  // Method to update parameter info section
  useEffect(() => {
    if (selectedParams) {
      const selectedParam =
        selectedParams.length > 0
          ? selectedParams[selectedParams.length - 1]
          : null;

      if (selectedParam) {
        const groupId = selectedParam.groupId;
        setParamDesc(attributeOptions[groupId].description);
      }
    }
  }, [selectedParams]);

  const PromptIcons = () => {
    return (
      <InputAdornment
        position='end'
        style={{ position: 'absolute', top: 50, right: 10, display: 'flex' }}
      >
        <Stack>
          <IconButton
            aria-label='copy'
            color='error'
            onClick={() => {
              resetSelection();
            }}
          >
            <DeleteForever />
          </IconButton>
          <IconButton
            aria-label='copy'
            color='success'
            onClick={() => navigator.clipboard.writeText(buildPromptString())}
          >
            <CopyAll />
          </IconButton>
        </Stack>
      </InputAdornment>
    );
  };

  const handleFocus = () => {
    setIsDisabled(false);
    console.log('wut');
  };
  return (
    <ThemeProvider theme={theme}>
      <StyledBox>
        <Container maxWidth='x2'>
          <Grid container spacing={2} alignItems='center'>
            <Grid item xs={8}>
              <h1>Midjourney Prompt Helper</h1>
            </Grid>

            <Grid item xs={4}>
              <Grid
                container
                spacing={2}
                sx={{
                  justifyContent: 'flex-end',
                }}
              >
                <IconButton
                  aria-label='copy'
                  color='success'
                  onClick={() =>
                    navigator.clipboard.writeText(buildPromptString())
                  }
                >
                  <HelpOutline />
                </IconButton>
                <IconButton
                  aria-label='copy'
                  color='success'
                  onClick={() =>
                    navigator.clipboard.writeText(buildPromptString())
                  }
                >
                  <Twitter />
                </IconButton>
                <IconButton
                  aria-label='copy'
                  color='success'
                  onClick={() =>
                    navigator.clipboard.writeText(buildPromptString())
                  }
                >
                  <Twitter />
                </IconButton>
                <IconButton
                  aria-label='copy'
                  color='success'
                  onClick={() =>
                    navigator.clipboard.writeText(buildPromptString())
                  }
                >
                  <Reddit />
                </IconButton>
                <IconButton
                  aria-label='copy'
                  color='success'
                  onClick={() =>
                    navigator.clipboard.writeText(buildPromptString())
                  }
                >
                  <GitHub />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <hr />
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
                  disabled={isDisabled}
                  value={buildPromptString()}
                  InputProps={{
                    endAdornment: <PromptIcons />,
                  }}
                />
                <Stack spacing={2} direction='row'>
                  <Button
                    variant='outlined'
                    color='error'
                    onClick={() => {
                      resetSelection();
                    }}
                  >
                    Clear
                  </Button>
                  <Button
                    variant='outlined'
                    color='success'
                    onClick={() =>
                      navigator.clipboard.writeText(buildPromptString())
                    }
                  >
                    Copy
                  </Button>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={1}>
              <Stack style={{ marginTop: '10px' }}>
                <IconButton
                  aria-label='copy'
                  color='info'
                  onMouseEnter={handleEnhanceOpen}
                  onMouseLeave={handleEnhanceClose}
                  style={{ opacity: userInput ? 1 : 0.2 }}
                >
                  <KeyboardDoubleArrowRight /> <KeyboardDoubleArrowRight />
                </IconButton>
                <Popover
                  id='enhance_prompt_popover'
                  open={open}
                  sx={{
                    pointerEvents: 'none',
                  }}
                  anchorEl={anchorEl}
                  onClose={handleEnhanceClose}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  disableRestoreFocus
                >
                  <Paper
                    elevation={3}
                    sx={{
                      p: 8,
                      width: 240,
                      height: 280,
                    }}
                  >
                    <Typography
                      sx={{ typography: 'h6', marginBottom: 4 }}
                      color='secondary'
                    >
                      Enhance your prompt!
                    </Typography>
                    <Typography color='success'>
                      Clicking this sends your prompt to HuggingFace to generate
                      an experimental prompt enhancement.
                    </Typography>
                    {!userInput ? (
                      <Typography color='error' sx={{ marginTop: 4 }}>
                        You need to enter your ideas into the input first!
                      </Typography>
                    ) : (
                      <>
                        <Typography sx={{ marginTop: 4 }}>
                          It takes a few seconds to generate, so please be
                          patient.
                        </Typography>
                        <Typography sx={{ marginTop: 4 }}>
                          When ready, click &#171;&#171; to send it back to the
                          final prompt!
                        </Typography>
                      </>
                    )}
                  </Paper>
                </Popover>
                <IconButton aria-label='copy' color='info'>
                  <KeyboardDoubleArrowLeft /> <KeyboardDoubleArrowLeft />
                </IconButton>
              </Stack>
            </Grid>
            <Grid item xs={4}>
              <h3 style={{ marginBottom: '30px' }}>Enhanced prompt</h3>
              <TextField
                id='outlined-multiline-static'
                value=''
                multiline
                rows={4}
                fullWidth
                disabled={isDisabled}
                placeholder='Your enhanced prompt will appear here!'
              />
            </Grid>
          </Grid>
          <Grid
            container
            spacing={10}
            style={{ marginTop: '20px', marginBottom: '20px' }}
          >
            <Grid item xs={8}>
              <Grid container spacing={4}>
                <Grid item xs={6}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography
                      variant='h5'
                      component='h2'
                      style={{ marginTop: '20px', marginBottom: '20px' }}
                    >
                      Parameters
                    </Typography>

                    {Object.entries(attributeOptions).map(([key, value]) => (
                      <ParamGroup key={key} param={value} />
                    ))}
                  </Box>
                </Grid>

                <Grid item xs={6}>
                  <Grid item xs={12}>
                    <Grid container alignItems='center' justifyContent='center'>
                      <Grid item xs={12}>
                        <Paper elevation={1} style={{ padding: '20px' }}>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: paramDesc,
                            }}
                          />
                        </Paper>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Paper elevation={6} style={{ padding: '20px' }}>
                <h2>
                  Latest posts from r/MidJourney
                  <Link
                    href='https://www.reddit.com/r/midjourney/'
                    target='_blank'
                    color='inherit'
                  >
                    <IconButton aria-label='copy' color='warning'>
                      <Reddit />
                    </IconButton>
                  </Link>
                </h2>
                <RedditImageScraper subreddit='midjourney' />
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Typography variant='h5' component='h2'>
                Photography
              </Typography>
              <AccordionGroup
                items={Object.entries(photoChips)}
                expanded={expanded}
                handleChange={handleChange}
              />
              <Typography variant='h5' component='h2'>
                Artists and Styles
              </Typography>
              <AccordionGroup
                items={Object.entries(artistChips)}
                expanded={expanded}
                handleChange={handleChange}
              />
            </Grid>
          </Grid>
        </Container>
      </StyledBox>
    </ThemeProvider>
  );
}

export default App;
