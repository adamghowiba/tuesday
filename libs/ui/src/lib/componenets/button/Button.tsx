import classNames from 'classnames';
import React, { CSSProperties, FC, PropsWithChildren, ReactNode } from 'react';

export type ButtonStyle = 'ghost' | 'outlined' | 'filled';
export type ButtonRadius = 'small' | 'medium' | 'rounded';
export type ButtonColor = 'gray' | 'blue';
export type ButtonSize = 'small' | 'medium';

export interface ButtonProps extends PropsWithChildren {
  buttonStyle?: ButtonStyle;
  radius?: ButtonRadius;
  color?: ButtonColor;
  size?: ButtonSize;
  gap?: string | number;
  style?: CSSProperties;
}

const Button: FC<ButtonProps> = ({
  buttonStyle: style = 'outlined',
  color = 'gray',
  radius = 'small',
  size = 'medium',
  gap = 'var(--space-xs)',
  ...props
}) => {
  return (
    <>
      <button
        style={{ gap, ...props.style }}
        className={classNames(
          'button',
          `style--${style}`,
          `radius--${radius}`,
          `color--${color}`,
          `size--${size}`
        )}
      >
        {props.children}
      </button>

      <style jsx>{`
        .button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid transparent;
          font-size: var(--font-size-10);
          gap: var(--space-xs);
          line-height: 1em;
          font-weight: 500;
          min-height: 32px;
          cursor: pointer;
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

        // STYLES
        .style {
          &--ghost {
            border: 1px solid transparent;
            background-color: transparent;
            color: var(--primary-text-color);
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
          }

          &--medium {
            padding: var(--space-xs) var(--space-small);
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
};

Button.defaultProps = {};

export default Button;
