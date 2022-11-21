import React, { FC, PropsWithChildren, ReactNode } from 'react';
import Avatar from '../avatar/Avatar';
import Stack from '../layout/stack/Stack';
import { DateTime } from 'luxon';
import Button from '../button';
export interface NotificationProps extends PropsWithChildren {
  fromName: string;
  notifcationOrigin?: string;
  date: string;
}

const Notification: FC<NotificationProps> = ({
  fromName,
  date,
  notifcationOrigin,
  ...props
}) => {
  return (
    <>
      <div className="notifcation">
        <Button buttonStyle="ghost" size="large" fullWidth textAlign="left">
          <Stack align="center" gap="var(--space-medium)">
            <Avatar size={55} />

            <Stack direction="column" gap="var(--space-small)">
              <h5 className="title">{fromName}</h5>

              <span className="content">{props.children}</span>

              <Stack
                direction="row"
                gap="var(--space-small)"
                sx={{
                  fontSize: 'var(--font-size-subtext)',
                  color: 'var(--secondary-text-color)',
                }}
              >
                <div>
                  <span>{DateTime.fromISO(date).toFormat('MMM d')}</span>
                  {notifcationOrigin && <span>{notifcationOrigin}</span>}
                </div>
              </Stack>
            </Stack>
          </Stack>
        </Button>
      </div>
      <style jsx>{`
        .title {
          font-weight: 600;
          font-size: var(--font-size-general-label);
          line-height: 1em;
        }

        .content {
          font-weight: 400;
        }
      `}</style>
    </>
  );
};

Notification.defaultProps = {};

export default Notification;
