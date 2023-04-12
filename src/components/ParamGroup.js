import { memo } from 'react';
import { Button, Grid } from '@mui/material';
import { useSelectionContext } from '../context/SelectionContext';

/**
 * ParamGroup component.
 *
 * @component
 * @example
 * <ParamGroup param={param} />
 * @param {Object} param - The parameter object containing options and metadata.
 * @returns {React.Element} The rendered ParamGroup component.
 */
export const ParamGroup = memo(({ param }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sx={{ marginTop: '20px' }}>
        {param.name}
      </Grid>
      <Grid item xs={12}>
        {param.options.map((option) => (
          <ParamButton
            key={option.label}
            label={option.label}
            param={param}
            groupId={param.groupId}
            value={option.value}
          />
        ))}
      </Grid>
    </Grid>
  );
});

/**
 * ParamButton component.
 *
 * @component
 * @example
 * <ParamButton label={option.label} param={param} groupId={param.groupId} />
 * @param {string} label - The label of the button.
 * @param {Object} param - The parameter object containing options and metadata.
 * @param {string} groupId - The group identifier for the button.
 * @returns {React.Element} The rendered ParamButton component.
 */
const ParamButton = memo(({ label, param, value }) => {
  const { selectedParams, toggleParamSelection } = useSelectionContext();
  let pre = param.prefix ? param.prefix : '--';
  const fullParam = pre + value;
  const isSelected = selectedParams.some((p) => p.value === fullParam);
  const buttonColor = isSelected ? 'secondary' : 'primary';

  const handleClick = () => {
    toggleParamSelection(fullParam, param.groupId);
  };

  return (
    <Button
      variant='outlined'
      onClick={handleClick}
      color={buttonColor}
      style={{ margin: '4px' }}
    >
      {label}
    </Button>
  );
});
