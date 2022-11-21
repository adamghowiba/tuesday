import React, { FC } from 'react';

interface OverlayProps {
  blur?: boolean;
  zIndex?: number;
}

const Overlay: FC<OverlayProps> = ({
  blur = false,
  zIndex = 100,
  ...props
}) => {
  return (
    <>
      <div className="overlay"></div>

      <style jsx>{`
        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: ${zIndex};
          background-color: rgba(41, 47, 76, 0.7);
        }
      `}</style>
    </>
  );
};

Overlay.defaultProps = {};

export default Overlay;
