import classNames from 'classnames';
import {
  CSSProperties,
  forwardRef,
  MouseEventHandler,
  PropsWithChildren,
  useContext,
} from 'react';
import { useRouter } from 'next/router';
import { MenuContext } from '../menu/MenuV2';

export type ButtonStyle = 'ghost' | 'outlined' | 'filled';
export type ButtonRadius = 'small' | 'medium' | 'rounded';
export type ButtonColor = 'gray' | 'blue';
export type ButtonSize = 'small' | 'medium' | 'large' | 'xs';

export interface ButtonProps extends PropsWithChildren {
  buttonStyle?: ButtonStyle;
  buttonType?: 'submit' | 'button' | 'reset';
  radius?: ButtonRadius;
  color?: ButtonColor;
  size?: ButtonSize;
  gap?: string | number;
  sx?: CSSProperties;
  fullWidth?: boolean;
  textAlign?: 'left' | 'center' | 'right';
  stopPropagation?: boolean;
  active?: boolean;
  href?: string;
  textWrap?: 'nowrap' | 'normal';
  onMouseLeave?: MouseEventHandler;
  onMouseEnter?: MouseEventHandler;
  onClick?: MouseEventHandler;
}

const DEFAULT_BUTTON_PROPS: ButtonProps = {
  buttonStyle: 'outlined',
  color: 'gray',
  radius: 'small',
  size: 'medium',
  gap: 'var(--space-small)',
  buttonType: 'button',
  textAlign: 'center',
  active: false,
  fullWidth: false,
  textWrap: 'normal',
  stopPropagation: false,
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ href, ...props }, ref) => {
    const menuContext = useContext(MenuContext);
    const router = useRouter();

    const {
      buttonStyle: style,
      color,
      radius,
      size,
      gap,
      buttonType,
      textAlign,
      active,
      fullWidth,
      stopPropagation,
      textWrap,
    } = { ...DEFAULT_BUTTON_PROPS, ...menuContext?.buttonProps, ...props };

    return (
      <>
        <button
          style={{ gap, ...props.sx }}
          type={buttonType}
          onMouseEnter={props.onMouseEnter}
          onMouseLeave={props.onMouseLeave}
          onClick={(event) => {
            if (href) router.push(href);

            props?.onClick && props.onClick(event);
            stopPropagation && event.stopPropagation();
          }}
          ref={ref}
          className={classNames(
            'button',
            `style--${style || menuContext?.buttonProps.buttonStyle}`,
            `radius--${radius}`,
            `color--${color}`,
            `size--${size}`,
            `align--${textAlign}`,
            active && 'active',
            fullWidth && 'full-width'
          )}
        >
          {props.children}
        </button>

        <style jsx>{`
          .button {
            position: relative;
            width: max-content;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border: 1px solid transparent;
            font-size: var(--font-size-10);
            gap: var(--space-small);
            line-height: 1em;
            font-weight: 500;
            min-height: 32px;
            cursor: pointer;
            white-space: ${textWrap};
          }

          .full-width {
            width: 100%;
          }

          // COLORS
          .color {
            &--blue {
              border-color: var(--color-basic_blue);
              background-color: var(--color-basic_blue);
              color: white;
            }

            &--blue:hover {
              background-color: var(--color-word-blue);
              border-color: var(--color-word-blue);
            }

            &--gray {
              border-color: var(--ui-border-color);
            }

            &--gray:hover {
              background-color: #dcdfec;
            }
          }

          .align {
            &--center {
              justify-content: center;
              text-align: center;
            }

            &--left {
              text-align: left;
              justify-content: start;
            }

            &--right {
              text-align: right;
              justify-content: flex-end;
            }
          }

          // STYLES
          .style {
            &--ghost {
              border: 1px solid transparent;
              background-color: transparent;
              color: var(--primary-text-color);

              &.active {
                background-color: var(--primary-selected-color) !important;
              }
            }

            &--ghost:hover {
              background-color: #dcdfec;
              border-color: transparent;
            }

            &--outlined {
              border: 1px solid inherit;
            }

            &--filled {
            }
          }

          // SIZES
          .size {
            &--small {
              padding: var(--space-xs) var(--space-xs);
            }

            &--medium {
              padding: var(--space-xs) var(--space-small);
            }

            &--large {
              padding: var(--space-small) var(--space-medium);
              font-size: var(--font-size-30);
              line-height: var(--font-line-height-30);
            }

            &--xs {
              min-height: unset;
              padding: 2px 2px;
            }
          }

          // RADIUS
          .radius {
            &--small {
              border-radius: var(--border-radius-small);
            }

            &--medium {
              border-radius: var(--border-radius-medium);
            }

            &--rounded {
              border-radius: 50%;
            }
          }

          button {
            appearance: none;
            background-color: transparent;
            outline: none;
            border: none;
            padding: 0;
            margin: 0;
          }
        `}</style>
      </>
    );
  }
);

Button.defaultProps = {};

export default Button;
