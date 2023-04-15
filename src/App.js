import React, { useEffect, useState, useMemo } from 'react';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import {
  Box,
  Button,
  Grid,
  Container,
  Typography,
  Paper,
  Stack,
  CircularProgress,
} from '@mui/material';
import { defaultInfo } from './text/DefaultInfo';
import { attributeOptions } from './attributes/params';
import { photoChips } from './attributes/chipObject';
import { artistChips } from './attributes/artistsObject';

import { genreChips } from './attributes/genreObject';

import { ParamGroup } from './components/ParamGroup';
import { UserInput } from './components/UserInput';
import { EnhancedPromptButtons } from './components/EnhancePromptButtons';
import { useUserInputContext } from './context/SelectionContext';
import { useChipSelectionContext } from './context/SelectionContext';

import RedditImageScraper from './components/RedditImageScraper';
import HeadereIcons from './components/HeaderIcons';
import AccordionGroup from './components/AccordionGroup';

import './App.css';
import { Reddit } from '@mui/icons-material';

const VERSION = '0.0.1';

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
  const [paramDesc, setParamDesc] = useState(defaultInfo);
  const [generatedItems, setGeneratedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { setUserInput } = useUserInputContext();

  const { selectedParams } = useChipSelectionContext();
  const handleSetGeneratedItems = (items) => {
    setGeneratedItems(items);
  };
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
        <Container
          maxWidth='x2'
          style={{ paddingLeft: '40px', paddingRight: '40px' }}
        >
          <Grid container spacing={2} alignItems='center'>
            <Grid item xs={8}>
              <Typography sx={{ typography: 'h6' }}>
                Midjourney Prompt Helper {VERSION}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <HeadereIcons
                theme={theme}
                StyledBox={StyledBox}
                version={VERSION}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} alignItems='flex-start'>
            <Grid item xs={12} marginBottom={10}>
              <hr />
            </Grid>
            <Grid item xs={7}>
              <UserInput />
            </Grid>
            <Grid item xs={1}>
              <EnhancedPromptButtons
                setGeneratedItems={handleSetGeneratedItems}
                setIsLoading={setIsLoading}
              />
            </Grid>
            <Grid item xs={4}>
              {generatedItems.length > 0 ? (
                <Box
                  sx={{
                    width: '100%',
                    maxHeight: 250,
                    overflowY: 'scroll',
                  }}
                >
                  <Stack style={{ paddingRight: '20px' }}>
                    {generatedItems.map((item, index) => (
                      <Button
                        key={index}
                        variant='outlined'
                        style={{
                          textAlign: 'left',
                          textTransform: 'none',
                          justifyContent: 'flex-start',
                          marginBottom: '20px',
                        }}
                        onClick={() => setUserInput(item)}
                      >
                        {item}
                      </Button>
                    ))}
                  </Stack>
                </Box>
              ) : (
                <Paper
                  elevation={3}
                  sx={{
                    p: 8,
                    height: 180,
                  }}
                >
                  {isLoading ? (
                    <Grid
                      container
                      spacing={2}
                      justifyContent='center'
                      alignItems='center'
                      style={{ height: '100%' }}
                    >
                      <Grid
                        item
                        xs={1}
                        alignItems='center'
                        justifyContent='center'
                      >
                        <CircularProgress />
                      </Grid>
                    </Grid>
                  ) : (
                    <>
                      <Typography
                        variant='h6'
                        sx={{ pt: 0, mb: 2, color: 'info.main' }}
                      >
                        Generate Prompt Ideas
                      </Typography>
                      <Typography sx={{ mb: 2 }}>
                        Type a few keywords in the input and then click the blue
                        arrows to generate prompt ideas.
                      </Typography>
                      <Typography>
                        This uses an API model that is tuned on a dataset of
                        250k prompts users have issued to Midjourney.
                      </Typography>
                    </>
                  )}
                </Paper>
              )}
            </Grid>
          </Grid>

          <Grid
            container
            spacing={10}
            style={{ marginTop: '20px', marginBottom: '20px' }}
          >
            <Grid item xs={8}>
              <Grid container spacing={4}>
                <Grid item xs={5}>
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

                <Grid item xs={7} style={{ paddingLeft: '40px' }}>
                  <Box>
                    {Object.entries(attributeOptions).map(([key, value]) => (
                      <ParamGroup key={key} param={value} />
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={4}>
              <Paper elevation={6} style={{ padding: '20px' }}>
                <Typography variant='h6' sx={{ mb: 4, color: 'warning.main' }}>
                  Latest posts from r/MidJourney
                </Typography>
                <RedditImageScraper subreddit='midjourney' />
              </Paper>
            </Grid>
            <Grid item xs={12} sx={{ pb: 20 }}>
              <Typography
                variant='h5'
                sx={{
                  mt: 4,
                  mb: 2,

                  color: 'grey',
                }}
              >
                Mediums and Styles
              </Typography>
              <AccordionGroup items={artistChips} />

              <Typography
                variant='h5'
                sx={{
                  mt: 10,
                  color: 'grey',
                }}
              >
                Photography
              </Typography>
              <Typography
                variant='h6'
                sx={{
                  mb: 2,
                  color: 'darkgrey',
                  fontStyle: 'italic',
                  fontSize: '90%',
                  textIndent: '10px',
                }}
              >
                Some add add additonal values like lens type
              </Typography>
              <AccordionGroup items={photoChips} />

              <Typography
                variant='h5'
                sx={{
                  mt: 4,
                  mb: 2,

                  color: 'grey',
                }}
              >
                Comics and Movies
              </Typography>
              <AccordionGroup items={genreChips} />
            </Grid>
          </Grid>
        </Container>
      </StyledBox>
    </ThemeProvider>
  );
}

export default App;
