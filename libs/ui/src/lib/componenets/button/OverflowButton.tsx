import { Icon } from '@iconify/react';
import React, { FC, PropsWithChildren, useRef, useState } from 'react';
import Button from './Button';
import moreHorizontal16Filled from '@iconify/icons-fluent/more-horizontal-16-filled';
import { useClickOutside } from '../../hooks/useClickOutside';
import MenuV2, { MenuV2Props } from '../menu/MenuV2';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface OverFlowButtonProps extends PropsWithChildren {
  menuProps?: Partial<MenuV2Props>;
}

const OverFlowButton: FC<OverFlowButtonProps> = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const ref = useClickOutside(() => setIsMenuOpen(false));
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  return (
    <>
      <div className="button-wrap" ref={ref}>
        <Button
          ref={buttonRef}
          size="xs"
          buttonStyle="ghost"
          active={isMenuOpen}
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
        >
          <Icon icon={moreHorizontal16Filled} width={25} height={25} />
        </Button>

        {isMenuOpen && (
          <MenuV2 {...props.menuProps} anchorEl={buttonRef.current}>
            {props.children}
          </MenuV2>
        )}
      </div>
      <style jsx>{`
        .button-wrap {
          position: relative;
          color: red;
        }
      `}</style>
    </>
  );
};

OverFlowButton.defaultProps = {};

export default OverFlowButton;
