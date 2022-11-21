import dismiss24Regular from '@iconify/icons-fluent/dismiss-24-regular';
import { Icon } from '@iconify/react';
import {
  Box,
  Button,
  Drawer,
  Menu,
  MenuV2,
  Notification,
  Stack,
  Tab,
  TabContextProvider,
  TabPanel,
  Tabs,
} from '@tuesday/ui';
import OverFlowButton from 'libs/ui/src/lib/componenets/button/OverflowButton';
import { DateTime } from 'luxon';
import { FC, useState } from 'react';

interface NotifcationDrawerProps {
  isOpen?: boolean;
  onClose: () => void;
}

const NotifcationDrawer: FC<NotifcationDrawerProps> = ({
  isOpen = false,
  ...props
}) => {
  const [tab, setTab] = useState<string>('all');

  return (
    <>
      <Drawer isOpen={isOpen} width={550} backgroundColor="var(--color-snow_white)">
        <header>
          <Stack
            direction="row"
            justify="between"
            p="var(--space-medium)"
            pb={0}
            align="center"
          >
            <h2 className="title">Notifcations</h2>

            <Stack direction="row">
              <OverFlowButton
                menuProps={{ width: 200, placement: 'left-start' }}
              >
                <MenuV2.Group>
                  <Button>Mark all as read</Button>
                  <Button>Delete all</Button>
                  <Button>Settings</Button>
                </MenuV2.Group>
              </OverFlowButton>
              <Button buttonStyle="ghost" onClick={props.onClose}>
                <Icon icon={dismiss24Regular} width={17} height={17} />
              </Button>
            </Stack>
          </Stack>
        </header>

        <Box p="var(--space-medium)">
          <TabContextProvider value={tab}>
            <Tabs onChange={(event, value) => setTab(value)}>
              <Tab value="all">All</Tab>
              <Tab value="unread">Unread</Tab>
              <Tab value="mentioned">I was mentioned</Tab>
            </Tabs>

            <TabPanel value="all">
              <Stack direction="column" gap={1} my="var(--space-medium)">
                <div className="notifcation-group">
                  <h6 className="notifcation-group__title">Yesterday</h6>
                  <Notification
                    fromName="Adam Ghowiba"
                    date={DateTime.now().toISO()}
                  >
                    Subscribed you to the board Work App
                  </Notification>
                  <Notification
                    fromName="Adam Ghowiba"
                    date={DateTime.now().toISO()}
                  >
                    Subscribed you to the board Work App
                  </Notification>
                  <Notification
                    fromName="Adam Ghowiba"
                    date={DateTime.now().toISO()}
                  >
                    Subscribed you to the board Work App
                  </Notification>
                </div>
              </Stack>
            </TabPanel>
            <TabPanel value="unread"></TabPanel>
            <TabPanel value="mentioned"></TabPanel>
          </TabContextProvider>
        </Box>
      </Drawer>

      <style jsx>{`
        .title {
          font-weight: 700;
        }

        .notifcation-group {
          display: flex;
          flex-direction: column;
          gap: var(--space-medium);
          width: 100%;

          &__title {
            padding-left: var(--space-small);
            font-weight: 700;
          }
        }
      `}</style>
    </>
  );
};

export default NotifcationDrawer;
