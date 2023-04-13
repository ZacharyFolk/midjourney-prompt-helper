import React, { memo, useState } from 'react';
import axios from 'axios';
import {
  CircularProgress,
  IconButton,
  Popover,
  Paper,
  Typography,
  Stack,
} from '@mui/material';
import { KeyboardDoubleArrowRight } from '@mui/icons-material';

import { useUserInputContext } from '../context/SelectionContext';

export const EnhancedPromptButtons = memo(
  ({ setGeneratedItems, setIsLoading }) => {
    const { userInput } = useUserInputContext();
    const [anchorElRight, setAnchorElRight] = useState(null);
    const [anchorElLeft, setAnchorElLeft] = useState(null);
    const [isDisabled, setIsDisabled] = useState(false);

    const [response, setResponse] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [responseItems, setResponseItems] = useState([]);

    const handleEnhanceOpenRight = (event) => {
      setAnchorElRight(event.currentTarget);
    };
    const handleEnhanceCloseRight = () => {
      setAnchorElRight(null);
    };

    const handleRightClick = () => {
      if (!userInput) {
        return;
      }
      handleGeneratePrompt();
    };

    const handleGeneratePrompt = async () => {
      setIsLoading(true);
      setIsDisabled(true);

      try {
        const requestBody = { data: [userInput] };
        const response = await axios.post(
          'https://doevent-prompt-generator.hf.space/run/predict',
          requestBody,
          { timeout: 60000 }
        );
        const responseArray = response.data.data[0].split('\n');
        setResponse(response.data.data[0]);
        setResponseItems(responseArray);
        setGeneratedItems(responseArray); // update the generated items in the parent component
      } catch (error) {
        console.error(error);
      }

      setIsLoading(false);
      setIsDisabled(false);
    };
    return (
      <Stack style={{ marginTop: '10px' }}>
        <IconButton
          aria-label='copy'
          color='info'
          onMouseEnter={handleEnhanceOpenRight}
          onMouseLeave={handleEnhanceCloseRight}
          onClick={handleRightClick}
          style={{ opacity: userInput ? 1 : 0.2 }}
          disabled={isDisabled}
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
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          disableRestoreFocus
        >
          <Paper
            elevation={3}
            sx={{
              p: 8,
              width: 240,
              height: 140,
            }}
          >
            <Typography color='success'>
              Clicking this sends your input to HuggingFace to generate some
              more ideas for prompts.
            </Typography>
            {!userInput ? (
              <Typography color='error' sx={{ marginTop: 4 }}>
                You need to enter your ideas into the main input first!
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
      </Stack>
    );
  }
);
