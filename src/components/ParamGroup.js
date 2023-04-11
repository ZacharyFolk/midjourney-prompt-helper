import { memo } from 'react';
import { Button } from '@mui/material';
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
