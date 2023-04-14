import React, { memo, useCallback, useMemo, useState } from 'react';
import {
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

  const promptString = useMemo(
    () =>
      `/imagine prompt: ${userInput} ${Object.values(selectedChips).join(
        ' '
      )} ${selectedParams.map((param) => param.value).join(' ')}`,
    [userInput, selectedChips, selectedParams]
  );

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
              onClick={() => navigator.clipboard.writeText(promptString)}
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
        variant='outlined'
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
