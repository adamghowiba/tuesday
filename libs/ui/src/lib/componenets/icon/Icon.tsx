import { IconifyIconProps } from '@iconify/react';
import React, { FC } from 'react';

export type IconProps = IconifyIconProps;

const Icon: FC<IconProps> = ({ ...props }) => {
  return (
    <>
      <div className="icon-wrap">
      </div>
      <style jsx>{``}</style>
    </>
  );
};

Icon.defaultProps = {};

export default Icon;
