import React, { useEffect, useState, useMemo } from 'react';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import {
  Box,
  Button,
  Grid,
  Container,
  Typography,
  TextField,
  Paper,
  Stack,
  CircularProgress,
} from '@mui/material';
import { attributeOptions } from './attributes/params';
import { photoChips } from './attributes/chipObject';
import { artistChips } from './attributes/artistsObject';
import AccordionGroup from './components/AccordionGroup';
import { ParamGroup } from './components/ParamGroup';
import RedditImageScraper from './components/RedditImageScraper';
import { useChipSelectionContext } from './context/SelectionContext';
import { defaultInfo } from './text/DefaultInfo';
import './App.css';
import { UserInput } from './components/UserInput';
import HeadereIcons from './components/HeaderIcons';
import { EnhancedPromptButtons } from './components/EnhancePromptButtons';
import { useUserInputContext } from './context/SelectionContext';

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
              <HeadereIcons theme={theme} StyledBox={StyledBox} />
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
                    height: 160,
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
                      <Typography sx={{ typography: 'h6', marginBottom: 4 }}>
                        Generate Prompt Ideas
                      </Typography>
                      <Typography>
                        Experimental feature to generate more ideas for your
                        prompt. Try typing a few keywords in the input then
                        click the blue arrows to generate some ideas ideas!
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
                <Typography variant='h6'>
                  Latest posts from r/MidJourney
                </Typography>
                <RedditImageScraper subreddit='midjourney' />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant='h5'
                style={{ marginBottom: 20, textTransform: 'uppercase' }}
              >
                Photography
              </Typography>
              <AccordionGroup items={photoChips} />
              <Typography
                variant='h5'
                style={{
                  marginBottom: 20,
                  marginTop: 40,
                  textTransform: 'uppercase',
                }}
              >
                Artists and Styles
              </Typography>
              <AccordionGroup items={artistChips} />
            </Grid>
          </Grid>
        </Container>
      </StyledBox>
    </ThemeProvider>
  );
}

export default App;
