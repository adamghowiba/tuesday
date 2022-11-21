import classNames from 'classnames';
import { createContext, FC, PropsWithChildren, ReactElement } from 'react';
import Label from '../input/Label';
import { RadioGroupContextProps } from './types';

export const RadioGroupContext = createContext<RadioGroupContextProps | null>(
  null
);

interface RadioGroupProps extends PropsWithChildren, RadioGroupContextProps {
  label: string | ReactElement;
  justifyBetween?: boolean;
  gridColumns?: number;
  helperText?: string | ReactElement;
}

const RadioGroup: FC<RadioGroupProps> = ({
  label,
  name,
  disabled,
  value,
  justifyBetween = false,
  ...props
}) => {
  const onRadioChange: RadioGroupContextProps['onChange'] = (value, event) => {
    if (props?.onChange) props.onChange(value, event);
  };

  return (
    <>
      <div className="radio-container">
        <Label htmlFor={name}>{label}</Label>

        <div className={classNames('radios', props.gridColumns && 'grid')}>
          <RadioGroupContext.Provider
            value={{
              name: name,
              minWidth: props.minWidth,
              onChange: onRadioChange,
              disabled: disabled,
              value: value,
            }}
          >
            {props.children}
          </RadioGroupContext.Provider>
        </div>

        {props.helperText && (
          <span className="helper-text">{props.helperText}</span>
        )}
      </div>

      <style jsx>{`
        .radio-container {
          display: flex;
          flex-direction: column;
          gap: var(--space-small);

          .helper-text {
            font-size: var(--font-size-20);
            line-height: var(--font-line-height-20);
            margin-top: -2px;
            color: var(--color-jaco_gray);
          }
        }

        .radios {
          display: flex;
          align-items: center;
          gap: var(--space-medium);
          justify-content: ${justifyBetween ? 'space-between' : 'unset'};

          &.grid {
            display: grid;
            grid-template-columns: repeat(${props.gridColumns}, 1fr);
          }
        }
      `}</style>
    </>
  );
};

export default RadioGroup;
