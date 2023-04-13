import React, { memo, useState } from 'react';
import { IconButton, Popover, Paper, Typography, Stack } from '@mui/material';
import {
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from '@mui/icons-material';

import { useUserInputContext } from '../context/SelectionContext';

export const EenhancedPromptButtons = memo(({}) => {
  const { userInput } = useUserInputContext();
  const [anchorElRight, setAnchorElRight] = useState(null);
  const [anchorElLeft, setAnchorElLeft] = useState(null);
  const handleEnhanceOpenRight = (event) => {
    setAnchorElRight(event.currentTarget);
  };
  const handleEnhanceCloseRight = () => {
    setAnchorElRight(null);
  };
  const handleEnhanceOpenLeft = (event) => {
    setAnchorElLeft(event.currentTarget);
  };
  const handleEnhanceCloseLeft = () => {
    setAnchorElLeft(null);
  };

  return (
    <Stack style={{ marginTop: '80px' }}>
      <IconButton
        aria-label='copy'
        color='info'
        onMouseEnter={handleEnhanceOpenRight}
        onMouseLeave={handleEnhanceCloseRight}
        style={{ opacity: userInput ? 1 : 0.2 }}
      >
        <KeyboardDoubleArrowRight /> <KeyboardDoubleArrowRight />
      </IconButton>
      <Popover
        id='enhance_prompt_popover_right'
        open={Boolean(anchorElRight)}
        sx={{
          pointerEvents: 'none',
        }}
        anchorEl={anchorElRight}
        onClose={handleEnhanceCloseRight}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        disableRestoreFocus
      >
        <Paper
          elevation={3}
          sx={{
            p: 8,
            width: 240,
            height: 240,
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
            </>
          )}
        </Paper>
      </Popover>
      <IconButton
        aria-label='copy'
        color='info'
        onMouseEnter={handleEnhanceOpenLeft}
        onMouseLeave={handleEnhanceCloseLeft}
        style={{ opacity: userInput ? 1 : 0.2 }}
      >
        <KeyboardDoubleArrowLeft /> <KeyboardDoubleArrowLeft />
      </IconButton>
      <Popover
        id='retrieve_enhanced_prompt_popover'
        open={Boolean(anchorElLeft)}
        sx={{
          pointerEvents: 'none',
        }}
        anchorEl={anchorElLeft}
        onClose={handleEnhanceCloseLeft}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        disableRestoreFocus
      >
        <Paper
          elevation={3}
          sx={{
            p: 8,
            width: 240,
            height: 120,
          }}
        >
          <Typography color='success'>
            When you have a new prompt generated you can click this to send it
            back to your main prompt builder.
          </Typography>
        </Paper>
      </Popover>
    </Stack>
  );
});
