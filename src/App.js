import React, { useEffect, useState, useMemo } from 'react';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import {
  Box,
  Grid,
  Container,
  Typography,
  TextField,
  Paper,
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
import { EenhancedPromptButtons } from './components/EnhancePromptButtons';
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
  const { selectedParams } = useChipSelectionContext();

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
        <Container maxWidth='x2'>
          <Grid container spacing={2} alignItems='center'>
            <Grid item xs={8}>
              <h1>Midjourney Prompt Helper</h1>
            </Grid>
            <Grid item xs={4}>
              <HeadereIcons />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <hr />
            </Grid>
            <Grid item xs={7}>
              <UserInput />
            </Grid>
            <Grid item xs={1}>
              <EenhancedPromptButtons />
            </Grid>
            <Grid item xs={4}>
              <Typography variant='h6' style={{ marginBottom: 40 }}>
                Enhanced prompt
              </Typography>
              <TextField
                id='outlined-multiline-static'
                value=''
                multiline
                rows={4}
                fullWidth
                disabled={true}
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
