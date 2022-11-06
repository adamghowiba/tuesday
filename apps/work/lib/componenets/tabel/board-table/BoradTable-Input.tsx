import React, {
  ChangeEvent,
  ChangeEventHandler,
  FC,
  FocusEvent,
  FocusEventHandler,
  useEffect,
  useState,
} from 'react';

interface BoardTableInputProps {
  onChange?: (event: ChangeEvent<HTMLInputElement>, value: string) => void;
  onBlur?: (
    event: FocusEvent,
    value: string | number,
    params: { isChanged: boolean }
  ) => void;
  onFocus?: FocusEventHandler;
  value?: string;
  placeholder?: string;
}

export const BoardTableInput: FC<BoardTableInputProps> = ({
  value = '',
  placeholder,
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
        type="text"
        value={inputValue}
        placeholder={placeholder}
        onChange={handleChangeEvent}
        onBlur={(event) =>
          props?.onBlur && props.onBlur(event, inputValue, { isChanged: true })
        }
        onFocus={props.onFocus}
      ></input>

      <style jsx>{`
        .input {
          width: 100%;
          border: 1px solid transparent;
          background-color: transparent;

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
