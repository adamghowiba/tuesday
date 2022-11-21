import { useClickOutside } from 'libs/ui/src/lib/hooks/useClickOutside';
import {
  ChangeEvent,
  FC,
  FocusEvent,
  FocusEventHandler,
  InputHTMLAttributes,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';

interface EditableInputProps extends PropsWithChildren {
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

const EditableInput: FC<EditableInputProps> = ({
  value = '',
  type = 'text',
  placeholder,
  align = 'center',
  maxWidth = 'none',
  ...props
}) => {
  const [inputValue, setValue] = useState<string>(value);
  const [isEditing, setIsEditing] = useState(false);

  const ref = useClickOutside(() => console.log('Clicked outside'));

  const handleChangeEvent = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    props.onChange && props.onChange(event, event.target.value);
  };

  const handleEditableClick = () => {
    if (!isEditing) setIsEditing(true);
  };


  useEffect(() => {
    setValue(value);
  }, [value]);

  return (
    <>
    <button onClick={() => setIsEditing(false)}>close</button>
      <div className="editable" onClick={handleEditableClick} ref={ref}>
        {!isEditing ? (
          <div className="display-value"> {props.children}</div>
        ) : (
          <input
            className="input"
            type={type}
            value={inputValue}
            placeholder={placeholder}
            onChange={handleChangeEvent}
            onBlur={(event) =>
              props?.onBlur &&
              props.onBlur(event, inputValue, { isChanged: true })
            }
            onFocus={props.onFocus}
            style={{ maxWidth }}
          ></input>
        )}
      </div>

      <style jsx>{`
        .editable {
          border: 1px solid transparent;

          &:hover {
            border: 1px solid var(--ui-border-color);
          }
        }
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

export default EditableInput;
