import { memo } from 'react';
import { Button } from '@mui/material';
import { useSelectionContext } from '../context/SelectionContext';

export const ParamGroup = memo(({ param }) => {
  return (
    <div>
      <div>{param.name}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {param.options.map((option) => (
          <ParamButton
            key={option.label}
            label={option.label}
            param={param}
            groupId={param.groupId}
          />
        ))}
      </div>
    </div>
  );
});

const ParamButton = memo(({ label, param }) => {
  const { selectedParams, toggleParamSelection } = useSelectionContext();
  const fullParam = param.prefix + ' ' + label;
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
