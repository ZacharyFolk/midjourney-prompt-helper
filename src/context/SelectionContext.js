import { createContext, useContext, useState } from 'react';
export const SelectionContext = createContext();

export function useSelectionContext() {
  const context = useContext(SelectionContext);
  if (!context) {
    throw new Error(
      'useSelectionContext must be used within a SelectionProvider'
    );
  }
  return context;
}

function useSelection() {
  const [selectedParams, setSelectedParams] = useState([]);

  const [selected, setSelected] = useState([]);

  const toggleSelection = (item) => {
    setSelected((prevSelected) =>
      prevSelected.includes(item)
        ? prevSelected.filter((i) => i !== item)
        : [...prevSelected, item]
    );
  };

  const toggleParamSelection = (item, groupId) => {
    console.log('item', item, 'groupId', groupId);
    setSelectedParams((prevSelected) => {
      const otherGroupItems = prevSelected.filter(
        (i) => !i.groupId || i.groupId !== groupId
      );
      return prevSelected.some((i) => i.value === item)
        ? otherGroupItems
        : [...otherGroupItems, { value: item, groupId }];
    });
  };

  return {
    selectedChips: selected,
    selectedParams: selectedParams,
    toggleChipSelection: toggleSelection,
    toggleParamSelection: toggleParamSelection,
  };
}

export function SelectionProvider({ children }) {
  const selection = useSelection();

  return (
    <SelectionContext.Provider value={selection}>
      {children}
    </SelectionContext.Provider>
  );
}
