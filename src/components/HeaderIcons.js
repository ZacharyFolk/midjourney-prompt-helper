import { Grid, IconButton } from '@mui/material';
import { HelpOutline, Twitter, Reddit, GitHub } from '@mui/icons-material';
export default function HeadereIcons() {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        justifyContent: 'flex-end',
      }}
    >
      <IconButton aria-label='copy' color='success' onClick={null}>
        <HelpOutline />
      </IconButton>
      <IconButton aria-label='copy' color='success'>
        <Twitter />
      </IconButton>
      <IconButton aria-label='copy' color='success'>
        <Twitter />
      </IconButton>
      <IconButton aria-label='copy' color='success'>
        <Reddit />
      </IconButton>
      <IconButton aria-label='copy' color='success'>
        <GitHub />
      </IconButton>
    </Grid>
  );
}
