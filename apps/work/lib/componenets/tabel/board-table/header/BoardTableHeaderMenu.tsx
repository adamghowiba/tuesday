import { Button, MenuV2 } from '@tuesday/ui';
import OverFlowButton from 'libs/ui/src/lib/componenets/button/OverflowButton';
import React, { FC, MouseEventHandler, useRef, useState } from 'react';

export interface BoardTableMenuHeaderProps {
  onDelete: MouseEventHandler;
}

const BoardTableHeaderMenu: FC<BoardTableMenuHeaderProps> = (props) => {
  const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState(false);
  const settingsMenuButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <OverFlowButton
        onClose={() => {
          setIsSettingsMenuOpen(false);
        }}
        menuProps={{
          width: 250,
          onMouseEnterButton: () => setIsSettingsMenuOpen(false),
        }}
      >
        <MenuV2.Group>
          <Button
            ref={settingsMenuButtonRef}
            onMouseEnter={() => setIsSettingsMenuOpen(true)}
          >
            Settings
          </Button>

          <MenuV2
            isOpen={isSettingsMenuOpen}
            anchorEl={settingsMenuButtonRef.current}
            placement="right-start"
            width={150}
            distance={10}
          >
            <MenuV2.Button key="sub-1">Other</MenuV2.Button>
            <MenuV2.Button key="sub-2">Other</MenuV2.Button>
            <MenuV2.Button key="sub-3">Other</MenuV2.Button>
          </MenuV2>
        </MenuV2.Group>

        <MenuV2.Group>
          <MenuV2.Button
            key="filter"
            onClick={() => console.log('Clicked filter')}
          >
            Filter
          </MenuV2.Button>
          <MenuV2.Button key="sort">Sort</MenuV2.Button>
          <MenuV2.Button key="collapse">Collapse</MenuV2.Button>
        </MenuV2.Group>

        <MenuV2.Group>
          <MenuV2.Button key="duplicate">Duplicate</MenuV2.Button>
          <MenuV2.Button key="add">Add column to the right</MenuV2.Button>
          <MenuV2.Button key="change">Change column type</MenuV2.Button>
        </MenuV2.Group>

        <MenuV2.Group>
          <MenuV2.Button key="rename">Rename</MenuV2.Button>
          <MenuV2.Button key="delete" onClick={props.onDelete}>
            Delete
          </MenuV2.Button>
        </MenuV2.Group>
      </OverFlowButton>
      <style jsx>{``}</style>
    </>
  );
};

BoardTableHeaderMenu.defaultProps = {};

export default BoardTableHeaderMenu;
