import { createContext, useContext, useState } from 'react';

export const ChipSelectionContext = createContext();
export const UserInputContext = createContext();

export function useChipSelectionContext() {
  const context = useContext(ChipSelectionContext);
  if (!context) {
    throw new Error(
      'useChipSelectionContext must be used within a ChipSelectionProvider'
    );
  }
  return context;
}

export function useUserInputContext() {
  const context = useContext(UserInputContext);
  if (!context) {
    throw new Error(
      'useUserInputContext must be used within a UserInputProvider'
    );
  }
  return context;
}

function useChipSelection() {
  const [selectedChips, setSelectedChips] = useState([]);
  const [selectedParams, setSelectedParams] = useState([]);

  const toggleChipSelection = (chip) => {
    const weightRegex = new RegExp(`^${chip} ::`);
    const matchFound = selectedChips.some(
      (i) => i === chip || weightRegex.test(i)
    );

    setSelectedChips((prevSelected) =>
      prevSelected.includes(chip)
        ? prevSelected.filter((i) => i !== chip)
        : [...prevSelected, chip]
    );
  };

  const toggleParamSelection = (item, groupId) => {
    setSelectedParams((prevSelected) => {
      const otherGroupItems = prevSelected.filter(
        (i) => !i.groupId || i.groupId !== groupId
      );
      return prevSelected.some((i) => i.value === item)
        ? otherGroupItems
        : [...otherGroupItems, { value: item, groupId }];
    });
  };

  const resetSelection = () => {
    setSelectedParams([]);
    setSelectedChips([]);
  };

  return {
    selectedChips,
    selectedParams,
    toggleChipSelection,
    toggleParamSelection,
    resetSelection,
  };
}

function useUserInput() {
  const [userInput, setUserInput] = useState('');
  return {
    userInput,
    setUserInput,
  };
}

export function ChipSelectionProvider({ children }) {
  const chipSelection = useChipSelection();

  return (
    <ChipSelectionContext.Provider value={chipSelection}>
      {children}
    </ChipSelectionContext.Provider>
  );
}

export function UserInputProvider({ children }) {
  const userInput = useUserInput();

  return (
    <UserInputContext.Provider value={userInput}>
      {children}
    </UserInputContext.Provider>
  );
}
