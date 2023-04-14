import React, { useState } from 'react';
import { AccordionItem } from './AccordionItem';
export default function AccordionGroup({ items }) {
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
          />
        ))}
    </div>
  );
}
