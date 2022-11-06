import classNames from 'classnames';
import React, {
  ChangeEvent,
  ChangeEventHandler,
  FC,
  FocusEventHandler,
  useEffect,
  useState,
} from 'react';
import Label from './Label';

export interface TextInputProps {
  label?: string;
  placeholder?: string;
  name: string;
  size?: 'large' | 'small' | 'medium';
  style?: 'ghost' | 'bordered';
  value?: string | number;
  error?: string | string[];
  helperText?: string | string[];
  onChange?: ChangeEventHandler;
  onFocus?: FocusEventHandler;
  onBlur?: FocusEventHandler;
}

const TextInput: FC<TextInputProps> = ({
  size = 'medium',
  style = 'bordered',
  name,
  label,
  placeholder,
  error,
  helperText,
  value = '',
  onBlur,
  onFocus,
  ...props
}) => {
  const [inputValue, setValue] = useState<string | number>('');

  const onChange = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;

    setValue(target.value);
  };

  useEffect(() => {
    setValue(value);
  }, [value]);

  return (
    <>
      <div className="input-container">
        {label && <Label htmlFor={name}>{label}</Label>}
        <input
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          className={classNames('input', `size--${size}`, `style--${style}`)}
        />
        {error ? (
          <span className={'bottom-text bottom-text--error'}>{error}</span>
        ) : (
          <span className={'bottom-text bottom-text--helper'}>
            {helperText}
          </span>
        )}
      </div>

      <style jsx>{`
        .input-container {
          display: flex;
          flex-direction: column;
          gap: var(--space-xs);
        }

        .bottom-text {
          font-size: var(--font-size-general-label);

          &--error {
            color: var(--color-error);
          }
          &--helper {
            color: var(--color-jaco_gray);
          }
        }

        .input {
          border: 1.5px solid #e1e3ea;
          border-radius: var(--border-radius-small);
          font-size: var(--font-size-30);

          &:focus {
            border: 1.5px solid var(--primary-color);
          }
          &::placeholder {
            color: var(--ui-border-on-secondary-color);
          }

          // SIZES
          &.size--large {
          }

          &.size--medium {
            padding: var(--space-small) var(--space-medium);
          }

          &.size--small {
          }

          // STYLE
        }

        input {
          appearance: none;
          outline: none;
          border: none;
          padding: 0;
          margin: 0;
        }
      `}</style>
    </>
  );
};

export default TextInput;
