import React, { FC, PropsWithChildren } from 'react';

interface LabelProps extends PropsWithChildren {
  htmlFor: string;
}

const Label: FC<LabelProps> = ({ htmlFor, ...props }) => {
  return (
    <>
      <label htmlFor={htmlFor}>{props.children}</label>

      <style jsx>{`
        label {
          font-size: var(--font-size-20);
          line-height: var(--font-line-height-20);
          font-weight: var(--font-weight-normal);
          display: flex;
          align-items: center;
          gap: var(--space-xs);
          font-weight: 400;
        }
      `}</style>
    </>
  );
};

Label.defaultProps = {};

export default Label;
