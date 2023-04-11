import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from '@mui/material';
import { MemoizedChip } from './MemoizedChip';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

/**
 * Accordion component for all of the chip options
 * @param {Object} props - The component properties.
 * @param {Array} props.items - The accordion items.
 * @param {boolean} props.expanded - The expanded state of the accordion.
 * @param {function} props.handleChange - The function to handle changes in the accordion.
 * @returns {JSX.Element} The accordion group component.
 */

export default function AccordionGroup({ items, expanded, handleChange }) {
  return (
    <div>
      {items.map(([key, value]) => (
        <Accordion
          key={key}
          expanded={expanded === key}
          onChange={handleChange(key)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${key}-content`}
            id={`${key}-header`}
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
                  <MemoizedChip chip={chip} />
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
