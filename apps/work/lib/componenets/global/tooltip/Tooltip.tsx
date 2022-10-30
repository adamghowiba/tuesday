import { Icon } from '@iconify/react';
import { createPopper } from '@popperjs/core';
import {
  FC,
  forwardRef, ReactElement,
  useEffect,
  useRef
} from 'react';
import Popover from './Tooltip-Popover';

interface ToolTipProps {
  children?: ReactElement | ReactElement[];
  placement: 'top' | 'left' | 'right' | 'bottom';
  content?: ReactElement | string;
}

const ToolTip: FC<ToolTipProps> = (props, ref) => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    createPopper(tooltipRef.current, popoverRef.current, {
      placement: props.placement,
      strategy: 'absolute',
      modifiers: [
        { name: 'offset', options: { offset: [0, 17] } },
        {
          name: 'arrow',
          options: {
            element: arrowRef.current,
          },
        },
      ],
    });
  }, [props.children, props.placement]);

  return (
    <>
      <div className="tooltip" ref={tooltipRef}>
        <div className="child">{props.children}</div>

        <div className={`popover-wrap`} ref={popoverRef}>
          <Popover>{props.content}</Popover>

          <PopOverArrow ref={arrowRef} placement={props.placement} />
        </div>
      </div>

      <style jsx>{`
        .tooltip {
          width: max-content;
          z-index: 100;

          .popover-wrap {
            visibility: hidden;
            opacity: 0;
          }

          &:hover .popover-wrap {
            visibility: visible;
            opacity: 1;
          }
        }

        .arrow {
          position: absolute;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .placement {
          &--right {
            left: -13px;
          }

          &--top {
            bottom: -13px;
          }

          &--left {
            right: -13px;
          }

          &--bottom {
            top: -13px;
          }
        }
      `}</style>
    </>
  );
};

ToolTip.defaultProps = {};

interface PopOverArrowProps {
  placement?: ToolTipProps['placement'];
}

const PopOverArrow = forwardRef<HTMLDivElement, PopOverArrowProps>(
  (props, ref) => {
    const arrowRotation: { [key in ToolTipProps['placement']]: number } = {
      top: 3,
      right: 0,
      left: 2,
      bottom: 1,
    };

    return (
      <>
        <div className={`arrow placement--${props.placement}`} ref={ref}>
          <Icon
            icon={'codicon:triangle-left'}
            color="var(--color-blackish-hover)"
            width={20}
            height={20}
            rotate={arrowRotation[props.placement]}
          />
        </div>

        <style jsx>
          {`
            .arrow {
              position: absolute;
              display: flex;
              justify-content: center;
              align-items: center;
            }

            .placement {
              &--right {
                left: -13px;
              }

              &--top {
                bottom: -13px;
              }

              &--left {
                right: -13px;
              }

              &--bottom {
                top: -13px;
              }
            }
          `}
        </style>
      </>
    );
  }
);

PopOverArrow.displayName = PopOverArrow.name;

export default ToolTip;
