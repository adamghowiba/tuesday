import { default as MenuInternal, MenuV2Props } from './MenuV2';
import MenuGroup from './Menu-Group';
import { FC } from 'react';
import MenuButton from './MenuButton';

interface CompoundedComponent extends FC<MenuV2Props> {
  Group: typeof MenuGroup;
  Button: typeof MenuButton;
}

const Menu = MenuInternal as CompoundedComponent;
Menu.Group = MenuGroup;
Menu.Button = MenuButton;

export default Menu;
