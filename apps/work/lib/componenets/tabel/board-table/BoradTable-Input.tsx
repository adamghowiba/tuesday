import {
  ChangeEvent,
  FC,
  FocusEvent,
  FocusEventHandler,
  InputHTMLAttributes,
  useEffect,
  useState,
} from 'react';

interface BoardTableInputProps {
  value?: string;
  placeholder?: string;
  type?: InputHTMLAttributes<HTMLInputElement>['type'];
  align?: 'center' | 'left' | 'right';
  maxWidth?: number | string;
  onChange?: (event: ChangeEvent<HTMLInputElement>, value: string) => void;
  onBlur?: (
    event: FocusEvent,
    value: string | number,
    params: { isChanged: boolean }
  ) => void;
  onFocus?: FocusEventHandler;
}

export const BoardTableInput: FC<BoardTableInputProps> = ({
  value = '',
  type = 'text',
  placeholder,
  align = 'center',
  maxWidth = 'none',
  ...props
}) => {
  const [inputValue, setValue] = useState<string>(value);

  const handleChangeEvent = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    props.onChange && props.onChange(event, event.target.value);
  };

  useEffect(() => {
    setValue(value);
  }, [value]);

  return (
    <>
      <input
        className="input"
        type={type}
        value={inputValue}
        placeholder={placeholder}
        onChange={handleChangeEvent}
        onBlur={(event) =>
          props?.onBlur && props.onBlur(event, inputValue, { isChanged: true })
        }
        onFocus={props.onFocus}
        style={{ maxWidth }}
      ></input>

      <style jsx>{`
        .input {
          border: 1px solid transparent;
          background-color: transparent;
          text-align: ${align};
          width: 100%;

          &::placeholder {
            font-size: 14px;
          }

          &:hover,
          &:focus {
            background-color: var(--color-snow_white);
            border: 1px solid var(--color-ui_grey);
          }
        }

        input {
          appearance: none;
          border: none;
          outline: none;
        }
      `}</style>
    </>
  );
};
