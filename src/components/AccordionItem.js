import React, { memo } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from '@mui/material';
import { MemoizedChip } from './MemoizedChip';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const AccordionItem = memo(
  ({
    id,
    value,
    expanded,
    handleChange,
    isModalOpen,
    setIsModalOpen,
    handleChipClick,
    handleModalClose,
    weight,
  }) => (
    <Accordion expanded={expanded} onChange={handleChange}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${id}-content`}
        id={`${id}-header`}
      >
        <Typography sx={{ width: '33%', flexShrink: 0 }}>
          {value.name}
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>
          {value.description}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={3}>
          {value.chips.map((chip, index) => (
            <Grid item key={index}>
              <MemoizedChip
                chip={chip}
                setIsModalOpen={setIsModalOpen}
                handleChipClick={handleChipClick}
                weight={weight}
              />
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  ),
  (prevProps, nextProps) =>
    prevProps.id === nextProps.id &&
    prevProps.expanded === nextProps.expanded &&
    prevProps.value === nextProps.value
);
