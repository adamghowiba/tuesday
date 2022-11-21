import { Icon } from '@iconify/react';
import React, { FC, PropsWithChildren, useEffect, useRef, useState } from 'react';
import Button, { ButtonProps } from './Button';
import moreHorizontal16Filled from '@iconify/icons-fluent/more-horizontal-16-filled';
import { useClickOutside } from '../../hooks/useClickOutside';
import MenuV2, { MenuV2Props } from '../menu/MenuV2';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface OverFlowButtonProps extends PropsWithChildren {
  menuProps?: Partial<MenuV2Props>;
  onClose: MenuV2Props['onClose'];
  buttonProps?: Partial<ButtonProps>;
}

const OverFlowButton: FC<OverFlowButtonProps> = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleCloseMenu = () => {
    if (props.onClose) props.onClose();
    setIsMenuOpen(false);
  };


  return (
    <>
      <div className="button-wrap">
        <Button
          ref={buttonRef}
          size="xs"
          buttonStyle="ghost"
          active={props.menuProps?.isOpen}
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
          {...props.buttonProps}
        >
          <Icon icon={moreHorizontal16Filled} width={25} height={25} />
        </Button>

        <MenuV2
          {...props.menuProps}
          isOpen={isMenuOpen}
          onClose={handleCloseMenu}
          anchorEl={buttonRef.current}
        >
          {props.children}
        </MenuV2>
      </div>
      <style jsx>{`
        .button-wrap {
          position: relative;
          height: min-content;
          display: flex;
          align-items: center;
        }
      `}</style>
    </>
  );
};

OverFlowButton.defaultProps = {};

export default OverFlowButton;
