import { FC, PropsWithChildren } from 'react';
import Stack from '../layout/stack/Stack';

export interface MenuGroupProps extends PropsWithChildren {
  divider?: boolean;
}

const MenuGroup: FC<MenuGroupProps> = ({divider = true, ...props}) => {
  return (
    <>
      <Stack
        gap={0}
        direction="column"
        borderBottom={divider ? '1px solid #E6E9EF' : 'none'}
        padding="var(--space-small)"
      >
        {props.children}
      </Stack>

      <style></style>
    </>
  );
};

export default MenuGroup;
