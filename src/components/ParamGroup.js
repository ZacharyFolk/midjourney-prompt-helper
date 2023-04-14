import { memo, useState } from 'react';
import { Button, Grid, Slider, Stack } from '@mui/material';
import { useChipSelectionContext } from '../context/SelectionContext';

export const ParamGroup = memo(({ param }) => {
  const [selectedValue, setSelectedValue] = useState(param.default);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sx={{ marginTop: '20px' }}>
        {param.name}
      </Grid>
      <Grid item xs={12}>
        {param.slider ? (
          <Stack spacing={4} direction='row' alignItems='center'>
            <ParamButton
              key={param.groupId}
              label={selectedValue}
              param={param}
              value={selectedValue}
            />

            <Slider
              sx={{ maxWidth: '400px' }}
              key={param.name}
              label={param.name}
              defaultValue={param.default}
              min={0}
              marks={false}
              steps={param.steps}
              max={param.max}
              prefix={param.prefix}
              valueLabelDisplay='auto'
              value={selectedValue}
              onChange={(event, newValue) => {
                setSelectedValue(newValue);
              }}
            />
          </Stack>
        ) : (
          param.options.map((option) => (
            <ParamButton
              key={option.label}
              label={option.label}
              param={param}
              groupId={param.groupId}
              value={option.value}
            />
          ))
        )}
      </Grid>
    </Grid>
  );
});

const ParamButton = memo(({ label, param, value }) => {
  const { selectedParams, toggleParamSelection } = useChipSelectionContext();
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
