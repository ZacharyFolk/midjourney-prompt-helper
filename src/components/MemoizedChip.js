import { memo } from 'react';
import { Chip } from '@mui/material';
import { useSelectionContext } from '../context/SelectionContext';
/**
 * Represents a memoized chip component.
 * @param {Object} props - The component properties.
 * @param {Object} props.chip - The chip object.
 * @returns {JSX.Element} The memoized chip component.
 */
export const MemoizedChip = memo(({ chip }) => {
  const { selectedChips, toggleChipSelection } = useSelectionContext();
  const attribute = chip.label ? chip.label + ', ' + chip.value : chip;
  const selected = selectedChips.includes(attribute);

  const handleClick = () => {
    toggleChipSelection(attribute);
  };

  const handleDelete = () => {
    toggleChipSelection(attribute);
  };

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
});
