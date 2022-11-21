import { Icon } from '@iconify/react';
import { Button, Menu, MenuV2, Stack } from '@tuesday/ui';
import React, { FC, useRef } from 'react';
import moreHorizontal16Filled from '@iconify/icons-fluent/more-horizontal-16-filled';
import OverFlowButton from 'libs/ui/src/lib/componenets/button/OverflowButton';
import edit28Regular from '@iconify/icons-fluent/edit-28-regular';
import arrowSwap20Filled from '@iconify/icons-fluent/arrow-swap-20-filled';
import settings24Regular from '@iconify/icons-fluent/settings-24-regular';
import delete20Regular from '@iconify/icons-fluent/delete-20-regular';
import add16Filled from '@iconify/icons-fluent/add-16-filled';
import grid20Regular from '@iconify/icons-fluent/grid-20-regular';
import arrowFitIn20Regular from '@iconify/icons-fluent/arrow-fit-in-20-regular';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BoardPaneHeaderProps {}

const BoardPaneHeader: FC<BoardPaneHeaderProps> = (props) => {
  const buttonRef = useRef();
  const DEFAULT_ICON_SIZE = 17;

  return (
    <>
      <header>
        <div className="workspace">
          <span className="workspace__title">Workspace</span>

          <OverFlowButton menuProps={{ width: 260 }}>
            <MenuV2.Group>
              <Button>work management overview</Button>
            </MenuV2.Group>

            <MenuV2.Group>
              <Button>
                <Icon
                  icon={edit28Regular}
                  width={DEFAULT_ICON_SIZE}
                  height={DEFAULT_ICON_SIZE}
                />
                <span>Rename workspace</span>
              </Button>
              <Button>
                <Icon
                  icon={arrowSwap20Filled}
                  width={DEFAULT_ICON_SIZE}
                  height={DEFAULT_ICON_SIZE}
                />
                Change icon
              </Button>
              <Button>
                <Icon
                  icon={settings24Regular}
                  width={DEFAULT_ICON_SIZE}
                  height={DEFAULT_ICON_SIZE}
                />
                Manage workspace
              </Button>
              <Button>
                <Icon
                  icon={delete20Regular}
                  width={DEFAULT_ICON_SIZE}
                  height={DEFAULT_ICON_SIZE}
                />
                Delete workspace
              </Button>
            </MenuV2.Group>

            <MenuV2.Group>
              <Button>
                <Icon
                  icon={add16Filled}
                  width={DEFAULT_ICON_SIZE}
                  height={DEFAULT_ICON_SIZE}
                />
                Add new workspace
              </Button>
              <Button>
                <Icon
                  icon={grid20Regular}
                  width={DEFAULT_ICON_SIZE}
                  height={DEFAULT_ICON_SIZE}
                />
                Browse all workspaces
              </Button>
              <Button>
                <Icon
                  icon={arrowFitIn20Regular}
                  rotate={1}
                  width={DEFAULT_ICON_SIZE}
                  height={DEFAULT_ICON_SIZE}
                />
                Collapse all folders
              </Button>
            </MenuV2.Group>
          </OverFlowButton>
        </div>
      </header>

      <style jsx>{`
        header {
          display: flex;
          flex-direction: column;
          gap: var(--space-small);
          margin-bottom: var(--space-medium);
        }

        .workspace {
          display: flex;
          justify-content: space-between;
          align-items: center;

          &__title {
            font-size: var(--font-size-20);
          }
        }
      `}</style>
    </>
  );
};

export default BoardPaneHeader;
