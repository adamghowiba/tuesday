import React, {
  FC,
  forwardRef,
  MutableRefObject,
  PropsWithChildren,
} from 'react';

/* UNDER CONSTRUCTION */
interface ToolTipProps extends PropsWithChildren {
  ref: any;
}

const ToolTip: FC<ToolTipProps> = (props, ref) => {
  return (
    <>
      <div className="tooltip" ref={ref}>
        {props.children}
      </div>

      <style jsx>{`
        .tooltip {
        }
      `}</style>
    </>
  );
};
ToolTip.displayName = ToolTip.name;

ToolTip.defaultProps = {};

export default ToolTip;
