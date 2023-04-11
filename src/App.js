import React, { memo, useEffect, useState } from 'react';
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
} from '@mui/material';
import { attributeOptions } from './attributes/params';
import { photoChips } from './attributes/chipObject';
import { artistChips } from './attributes/artistsObject';
import AccordionGroup from './components/AccordionGroup';
import { ParamGroup } from './components/ParamGroup';
import RedditImageScraper from './components/RedditImageScraper';

import { useSelectionContext } from './context/SelectionContext';
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

  // const [selectedParams, setSelectedParams] = useState([]);

  const [paramDesc, setParamDesc] = useState(defaultInfo);
  const [expanded, setExpanded] = useState(false);
  const [userInput, setUserInput] = useState('');

  const { selectedChips, selectedParams } = useSelectionContext();

  const handleChange = (panel) => (isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const buildPromptString = () => {
    // const attributeString = Object.values(attributes).join(' ');
    const chipString = Object.values(selectedChips).join(' ');
    const paramString = selectedParams.map((param) => param.value).join(' ');

    return `/imagine prompt: ${userInput} ${chipString} ${paramString}`;
  };

  const handleMainInput = (event) => {
    setUserInput(event.target.value);
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
                    <ParamGroup key={key} param={value} />
                  ))}
                </Grid>

                <Grid item xs={5}>
                  <Grid item xs={12}>
                    <Grid container alignItems='center' justifyContent='center'>
                      <Grid item xs={12}>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: paramDesc,
                          }}
                        />
                      </Grid>
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
