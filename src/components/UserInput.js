import React, { memo, useCallback, useMemo } from 'react';
import {
  Button,
  Stack,
  TextField,
  Input,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { DeleteForever, CopyAll } from '@mui/icons-material';
import { useUserInputContext } from '../context/SelectionContext';
import { useChipSelectionContext } from '../context/SelectionContext';

export const UserInput = memo(() => {
  const { userInput, setUserInput } = useUserInputContext();
  const { selectedChips, selectedParams, resetSelection } =
    useChipSelectionContext();
  /**
   * handleMainInput function - handles changes to the main input field
   * @param {React.SyntheticEvent} event - The event object from the input change
   */
  const handleMainInput = useCallback(
    (event) => {
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

  const PromptIcons = () => {
    return (
      <InputAdornment
        position='end'
        style={{ position: 'absolute', top: 30, right: 10, display: 'flex' }}
      >
        <Stack direction='row' spacing={2}>
          <IconButton
            aria-label='copy'
            color='error'
            onClick={() => {
              resetSelection();
            }}
          >
            <DeleteForever />
          </IconButton>
          <IconButton
            aria-label='copy'
            color='success'
            onClick={() => navigator.clipboard.writeText(buildPromptString())}
          >
            <CopyAll />
          </IconButton>
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
      <Stack spacing={2} direction='row'>
        <Button
          variant='outlined'
          color='error'
          onClick={() => {
            resetSelection();
          }}
        >
          Clear
        </Button>
        <Button
          variant='outlined'
          color='success'
          onClick={() => navigator.clipboard.writeText(buildPromptString())}
        >
          Copy
        </Button>
      </Stack>
    </Stack>
  );
});
