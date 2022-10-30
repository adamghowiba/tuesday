import { Button } from '@tuesday/ui';
import React, { FC } from 'react';
import { Icon } from '@iconify/react';
import dataTrending24Regular from '@iconify/icons-fluent/data-trending-24-regular';
import Image from 'next/image';
import personAdd28Regular from '@iconify/icons-fluent/person-add-28-regular';

interface BoardHeaderSettingsProps {}

const BoardHeaderSettings: FC<BoardHeaderSettingsProps> = (props) => {
  return (
    <>
      <div className="settings">
        <Button buttonStyle="ghost">
          <Icon icon={dataTrending24Regular} width={18} height={18} />
        </Button>

        <Button buttonStyle="ghost" gap="var(--space-small)">
          <span>Last Seen</span>
          <Image
            src="/images/default_avatar.png"
            width={24}
            height={24}
            alt="Profile image"
          />
        </Button>

        <Button buttonStyle="ghost" gap="var(--space-small)">
          <Icon icon={personAdd28Regular} width={20} height={20} />
          <span>Invite / 1</span>
        </Button>

        <Button>Power-Ups</Button>
      </div>

      <style jsx>{`
        .settings {
          display: flex;
          align-items: center;
          gap: var(--space-small);
        }
      `}</style>
    </>
  );
};

BoardHeaderSettings.defaultProps = {};

export default BoardHeaderSettings;
