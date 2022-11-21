import classNames from 'classnames';
import { group } from 'console';
import { ChangeEvent, FC, PropsWithChildren, useContext, useRef } from 'react';
import Label from '../input/Label';
import { RadioGroupContext } from './RadioGroup';

export interface RadioProps extends PropsWithChildren {
  name?: string;
  radioSize?: number;
  value: any;
}

const Radio: FC<RadioProps> = ({
  name = '',
  value,
  radioSize = 17,
  ...props
}) => {
  const radioRef = useRef<HTMLInputElement>(null);

  const groupContext = useContext(RadioGroupContext);

  const onRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    groupContext?.onChange(value, event);
  };

  return (
    <>
      <div className="radio-wrap">
        <input
          name={groupContext?.name || name}
          type="radio"
          ref={radioRef}
          className="radio-input"
          defaultChecked={groupContext?.value === value}
          value={value}
          onChange={onRadioChange}
        />
        <div className={classNames('radio-button')}></div>
        <Label htmlFor={groupContext?.name || name}>{props.children}</Label>
      </div>

      <style jsx>{`
        .radio-wrap {
          position: relative;
          display: flex;
          align-items: center;
          width: min-content;
          min-width: ${groupContext?.minWidth}px;
          gap: var(--space-small);
        }

        .radio-input {
          appearance: none;
          border-radius: 0px;
          position: absolute;
          width: 100%;
          height: 100%;
          padding: 0;
          margin: 0;
          left: 0;
          top: 0;
          opacity: 0;
          cursor: pointer;

          &:checked + .radio-button {
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: var(--primary-color);
          }

          &:checked + .radio-button::after {
            content: '';
            width: ${(radioSize - 2) / 2}px;
            height: ${(radioSize - 2) / 2}px;
            border-radius: 50%;
            background-color: var(--color-snow_white);
          }
        }

        .radio-button {
          border: 1px solid var(--ui-border-color);
          width: ${radioSize}px;
          height: ${radioSize}px;
          border-radius: 50%;

          &:hover {
            border: 1px solid var(--primary-text-color);
          }
        }
      `}</style>
    </>
  );
};

export default Radio;
