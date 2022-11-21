import React, {
  FC,
  Key,
  MouseEvent,
  PropsWithChildren,
  useContext,
} from 'react';
import Button from '../button';
import { ButtonProps } from '../button/Button';
import { MenuButtonContext } from './MenuV2';

export interface MenuButtonProps extends PropsWithChildren, ButtonProps {
  key: Key;
}

const MenuButton: FC<MenuButtonProps> = ({ ...props }) => {
  const menuButtonContext = useContext(MenuButtonContext);

  const handleMouseEnter = () => {
    if (!menuButtonContext) return;
    menuButtonContext.onMouseEnterButton();
  };

  const handleMenuButtonClick = (event: MouseEvent) => {
    if (props.onClick) props.onClick(event);
    if (menuButtonContext) menuButtonContext.onClickMenuButton();
  };

  return (
    <>
      <Button
        {...props}
        onMouseEnter={handleMouseEnter}
        onClick={(event) => handleMenuButtonClick(event)}
      >
        {props.children}
      </Button>
      <style jsx>{``}</style>
    </>
  );
};

MenuButton.defaultProps = {};

export default MenuButton;
