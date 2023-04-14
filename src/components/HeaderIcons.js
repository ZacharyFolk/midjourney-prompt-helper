import { useState } from 'react';
import {
  Box,
  Grid,
  IconButton,
  Link,
  Modal,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import {
  HelpOutline,
  Twitter,
  Reddit,
  GitHub,
  LinkedIn,
  Home,
} from '@mui/icons-material';

import weHear from './../images/we-here-for-you.png';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  width: '50%',
  maxWidth: 800,
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function HeadereIcons({ theme, StyledBox, version }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <ThemeProvider theme={theme}>
      <StyledBox>
        <Grid
          container
          spacing={2}
          sx={{
            justifyContent: 'flex-end',
          }}
        >
          <IconButton aria-label='copy' color='success' onClick={handleOpen}>
            <HelpOutline />
          </IconButton>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box sx={style}>
              <Paper
                elevation={3}
                sx={{
                  p: 8,
                }}
              >
                <Typography
                  id='modal-modal-title'
                  variant='h4'
                  component='h2'
                  sx={{ mb: 4, color: 'info.main' }}
                >
                  Prompt Generator v.{version}
                </Typography>
                <Typography variant='body1' sx={{ pb: 4 }}>
                  This is a little app I built for fun after discovering
                  MidJourney and trying to learn all of the prompt options. I am
                  also trying to keep my development chops fresh and having some
                  fun with React and Material UI.
                </Typography>
                <Typography variant='body1' sx={{ mb: 4 }}>
                  If this helped you out in any way, or you have any suggestions
                  for improvment, I would love to hear from you! A hello and a
                  follow will go a long way in motivating me to maintain and
                  update this gizmo.
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <img
                    src={weHear}
                    style={{ width: '650px', maxWidth: '100%' }}
                    alt='We hear for you'
                  />
                </Box>
                <Typography variant='body1' sx={{ mb: 4 }}></Typography>
                <Stack
                  spacing={2}
                  sx={{ mt: 4 }}
                  direction='row'
                  justifyContent={'flex-end'}
                >
                  <Link target='_blank' href='https://zacs.website'>
                    <IconButton aria-label='copy' color='success'>
                      <Home />
                    </IconButton>
                  </Link>

                  <Link
                    target='_blank'
                    href='https://twitter.com/ArtificialSpoon'
                  >
                    <IconButton aria-label='copy' color='success'>
                      <Twitter />
                    </IconButton>
                  </Link>

                  <Link
                    target='_blank'
                    href='https://www.reddit.com/user/ArtificialSpoon'
                  >
                    <IconButton aria-label='copy' color='success'>
                      <Reddit />
                    </IconButton>
                  </Link>
                  <Link target='_blank' href='https://github.com/ZacharyFolk'>
                    <IconButton aria-label='copy' color='success'>
                      <GitHub />
                    </IconButton>
                  </Link>

                  <Link
                    target='_blank'
                    href='https://www.linkedin.com/in/zacharyfolk/'
                  >
                    <IconButton aria-label='copy' color='success'>
                      <LinkedIn />
                    </IconButton>
                  </Link>
                </Stack>
              </Paper>
            </Box>
          </Modal>
        </Grid>
      </StyledBox>
    </ThemeProvider>
  );
}
