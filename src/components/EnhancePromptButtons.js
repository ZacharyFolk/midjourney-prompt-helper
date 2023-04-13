import React, { memo, useState } from 'react';
import { IconButton, Popover, Paper, Typography, Stack } from '@mui/material';
import {
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from '@mui/icons-material';

import { useUserInputContext } from '../context/SelectionContext';

export const EenhancedPromptButtons = memo(({}) => {
  const { userInput } = useUserInputContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleEnhanceOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleEnhanceClose = () => {
    setAnchorEl(null);
  };

  return (
    <Stack style={{ marginTop: '80px' }}>
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
            Clicking this sends your prompt to HuggingFace to generate an
            experimental prompt enhancement.
          </Typography>
          {!userInput ? (
            <Typography color='error' sx={{ marginTop: 4 }}>
              You need to enter your ideas into the input first!
            </Typography>
          ) : (
            <>
              <Typography sx={{ marginTop: 4 }}>
                It takes a few seconds to generate, so please be patient.
              </Typography>
              <Typography sx={{ marginTop: 4 }}>
                When ready, click &#171;&#171; to send it back to the final
                prompt!
              </Typography>
            </>
          )}
        </Paper>
      </Popover>
      <IconButton aria-label='copy' color='info'>
        <KeyboardDoubleArrowLeft /> <KeyboardDoubleArrowLeft />
      </IconButton>
    </Stack>
  );
});
