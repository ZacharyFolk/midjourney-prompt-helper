import { memo, useCallback, useState } from 'react';
import { Chip } from '@mui/material';

import { useChipSelectionContext } from '../context/SelectionContext';

/**
 * Represents a memoized chip component.
 * @param {Object} props - The component properties.
 * @param {Object} props.chip - The chip object.
 * @returns {JSX.Element} The memoized chip component.
 */
export const MemoizedChip = memo(
  ({
    chip,
    isModalOpen,
    setIsModalOpen,
    handleChipClick,
    handleModalClose,
  }) => {
    const { selectedChips, toggleChipSelection } = useChipSelectionContext();

    const attribute = chip.label ? chip.label + ', ' + chip.value : chip;
    const selected = selectedChips.includes(attribute);

    const weight = 1;
    // const handleClick = useCallback(() => {
    //   toggleChipSelection(attribute);
    // }, [attribute, toggleChipSelection]);

    const handleClick = useCallback(() => {
      const chipWithValue = attribute + ' :: ' + weight;
      console.log('chip', chip, 'attribute', attribute, 'selcted', selected);
      console.log(
        'chipWithValue: ' + chipWithValue,
        'selectedChips: ' + selectedChips,
        'selectedChips.includes(chipWithValue): ' +
          selectedChips.includes(chipWithValue),
        'selectedChips.includes(attribute): ' +
          selectedChips.includes(attribute)
      );

      const exists =
        selectedChips.includes(attribute) ||
        selectedChips.includes(chipWithValue);

      console.log('exists', exists);
      if (exists) {
        // toggleChipSelection(attribute);
      } else {
        setIsModalOpen(true);
      }
    }, [attribute, selectedChips, toggleChipSelection, weight]);

    // const handleDelete = useCallback(() => {
    //   toggleChipSelection(attribute);
    // }, [attribute, toggleChipSelection]);
    const handleDelete = useCallback(() => {
      const chipWithValue = attribute + ' :: ' + weight;
      toggleChipSelection(chipWithValue);
    }, [attribute, toggleChipSelection, weight]);
    const handleModalConfirm = useCallback(() => {
      const chipWithValue = attribute + ' :: ' + weight;
      toggleChipSelection(chipWithValue);
      setIsModalOpen(false);
    }, [attribute, toggleChipSelection, weight]);
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
