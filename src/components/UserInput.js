import React, { memo, useCallback, useMemo, useState } from 'react';
import {
  Button,
  Stack,
  TextField,
  Input,
  InputAdornment,
  IconButton,
  Tooltip,
} from '@mui/material';
import { DeleteForever, CopyAll } from '@mui/icons-material';
import { useUserInputContext } from '../context/SelectionContext';
import { useChipSelectionContext } from '../context/SelectionContext';
import { setSelectionRange } from '@testing-library/user-event/dist/utils';

export const UserInput = memo(() => {
  const { userInput, setUserInput } = useUserInputContext();
  const { selectedChips, selectedParams, resetSelection } =
    useChipSelectionContext();

  const [localInput, setLocalInput] = useState('');

  const handleMainInput = useCallback(
    (event) => {
      setLocalInput(event.target.value);
      setUserInput(event.target.value);
    },
    [setUserInput]
  );

  const chipString = useMemo(
    () => Object.values(selectedChips).join(' '),
    [selectedChips]
  );
  const paramString = useMemo(
    () => selectedParams.map((param) => param.value).join(' '),
    [selectedParams]
  );
  const promptString = useMemo(
    () => `/imagine prompt: ${userInput} ${chipString} ${paramString}`,
    [userInput, chipString, paramString]
  );
  const buildPromptString = () => {
    const chipString = Object.values(selectedChips).join(' ');
    const paramString = selectedParams.map((param) => param.value).join(' ');
    return `/imagine prompt: ${userInput} ${chipString} ${paramString}`;
  };

  const resetPrompt = () => {
    setLocalInput('');
    setUserInput('');
    resetSelection();
  };

  const PromptIcons = () => {
    return (
      <InputAdornment
        position='end'
        style={{ position: 'absolute', bottom: 30, right: 10, display: 'flex' }}
      >
        <Stack direction='row' spacing={1}>
          <Tooltip title='Clear Prompt'>
            <IconButton
              aria-label='copy'
              color='error'
              onClick={() => {
                resetPrompt();
              }}
            >
              <DeleteForever />
            </IconButton>
          </Tooltip>
          <Tooltip title='Copy Prompt'>
            <IconButton
              aria-label='copy'
              color='success'
              onClick={() => navigator.clipboard.writeText(buildPromptString())}
            >
              <CopyAll />
            </IconButton>
          </Tooltip>
        </Stack>
      </InputAdornment>
    );
  };
  return (
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
        value={localInput}
      />
      <TextField
        id='outlined-multiline-static'
        label='Prompt'
        multiline
        rows={4}
        fullWidth
        disabled={true}
        value={promptString}
        InputProps={{
          endAdornment: <PromptIcons />,
        }}
      />
    </Stack>
  );
});
