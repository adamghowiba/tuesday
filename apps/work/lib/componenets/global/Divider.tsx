import { parseUnit } from '@tuesday/utils';
import classNames from 'classnames';
import React, { FC } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DividerProps {
  margin?: number | string;
  color?: 'light' | 'dark';
}

const Divider: FC<DividerProps> = ({ margin = 0, color = "light", ...props }) => {
  return (
    <>
      <hr className={classNames('divider', `color--${color}`)} />
      <style jsx>{`
        hr {
          border: none;
          width: 100%;
          border-top: 1px solid var(--color-asphalt);
          margin: ${parseUnit(margin)};
          padding: 0;
        }

        .color--light {
          border-top: 1px solid #D0D4E4;
        }
      `}</style>
    </>
  );
};

Divider.defaultProps = {};

export default Divider;
