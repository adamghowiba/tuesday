import { parseUnit } from '@tuesday/utils';
import React, { FC } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DividerProps {
  margin?: number | string;
}

const Divider: FC<DividerProps> = ({ margin = 0 }) => {
  return (
    <>
      <hr />
      <style jsx>{`
        hr {
          border: none;
          width: 100%;
          border-top: 1px solid var(--color-asphalt);
          margin: ${parseUnit(margin)};
          padding: 0;
        }
      `}</style>
    </>
  );
};

Divider.defaultProps = {};

export default Divider;
