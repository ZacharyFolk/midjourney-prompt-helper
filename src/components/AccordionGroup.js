import React, { useState } from 'react';
import { AccordionItem } from './AccordionItem';
export default function AccordionGroup({
  items,
  isModalOpen,
  setIsModalOpen,
  handleChipClick,
  handleModalClose,
  weight,
}) {
  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <div>
      {items &&
        items.map(({ id, ...value }) => (
          <AccordionItem
            key={id}
            id={id}
            value={value}
            expanded={expanded === id}
            handleChange={handleChange(id)}
            setIsModalOpen={setIsModalOpen}
            handleChipClick={handleChipClick}
            weight={weight}
          />
        ))}
    </div>
  );
}
