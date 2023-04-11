import { createContext, useContext, useState } from 'react';

/**
 * @typedef SelectionContextType
 * @property {Array} selectedChips - An array of selected chips.
 * @property {Array} selectedParams - An array of selected parameters.
 * @property {function} toggleChipSelection - Function to toggle chip selection.
 * @property {function} toggleParamSelection - Function to toggle parameter selection.
 */

/**
 * Selection context.
 * @type {React.Context<SelectionContextType>}
 */
export const SelectionContext = createContext();

/**
 * Hook to use the selection context.
 * @returns {SelectionContextType} The selection context value.
 * @throws Will throw an error if not used within a SelectionProvider.
 */ export function useSelectionContext() {
  const context = useContext(SelectionContext);
  if (!context) {
    throw new Error(
      'useSelectionContext must be used within a SelectionProvider'
    );
  }
  return context;
}
/**
 * Hook to manage selection state.
 * @returns {SelectionContextType} The selection state and related functions.
 */
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
/**
 * SelectionProvider component.
 *
 * @component
 * @example
 * <SelectionProvider>{children}</SelectionProvider>
 * @param {Object} props - The props object.
 * @param {React.ReactNode} props.children - The children elements.
 * @returns {React.Element} The rendered SelectionProvider component.
 */
export function SelectionProvider({ children }) {
  const selection = useSelection();

  return (
    <SelectionContext.Provider value={selection}>
      {children}
    </SelectionContext.Provider>
  );
}
