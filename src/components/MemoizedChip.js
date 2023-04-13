import { memo, useCallback } from 'react';
import { Chip } from '@mui/material';

import { useChipSelectionContext } from '../context/SelectionContext';

/**
 * Represents a memoized chip component.
 * @param {Object} props - The component properties.
 * @param {Object} props.chip - The chip object.
 * @returns {JSX.Element} The memoized chip component.
 */
export const MemoizedChip = memo(
  ({ chip }) => {
    const { selectedChips, toggleChipSelection } = useChipSelectionContext();
    const attribute = chip.label ? chip.label + ', ' + chip.value : chip;
    const selected = selectedChips.includes(attribute);

    const handleClick = useCallback(() => {
      toggleChipSelection(attribute);
    }, [attribute, toggleChipSelection]);

    const handleDelete = useCallback(() => {
      toggleChipSelection(attribute);
    }, [attribute, toggleChipSelection]);

    return (
      <Chip
        label={chip.label ? chip.label : chip}
        variant='outlined'
        onClick={handleClick}
        onDelete={selected ? handleDelete : undefined}
        value={chip}
        color={selected ? 'success' : 'default'}
      />
    );
  },
  (prevProps, nextProps) =>
    prevProps.chip === nextProps.chip &&
    prevProps.selectedChips === nextProps.selectedChips
);
