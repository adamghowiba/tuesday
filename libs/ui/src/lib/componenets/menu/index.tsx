import { default as MenuInternal, MenuV2Props } from './MenuV2';
import MenuGroup from './Menu-Group';
import { FC } from 'react';

interface CompoundedComponent extends FC<MenuV2Props> {
  Group: typeof MenuGroup;
}

const Menu = MenuInternal as CompoundedComponent;
Menu.Group = MenuGroup;

export default Menu;
