/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FC, MouseEvent, ReactElement,
  SyntheticEvent
} from 'react';
import { TabProps } from './Tab';

export interface TabsProps {
  onChange: (event: SyntheticEvent, value: any) => void;
  children: ReactElement<TabProps> | ReactElement<TabProps>[];
}

const Tabs: FC<TabsProps> = (props) => {
  return (
    <>
      <div className="tabs-container">
        <div className="tabs">
          <InternalTab tabs={props.children} />
        </div>

        <div className="tabs-line">
          <div className="tab-line__inner"></div>
        </div>
      </div>

      <style jsx>{`
        .tabs-container {
          width: 100%;
        }

        .tabs {
          display: flex;
        }

        .tabs-line {
          width: 100%;
          height: 1px;
          background-color: var(--primary-background-hover-color);
        }
      `}</style>
    </>
  );
};

interface InternalTabProps {
  tabs: TabsProps['children'];
  onTabClick?: (event: MouseEvent, value: any) => void;
}

const InternalTab: FC<InternalTabProps> = (props) => {
  const handleTabClick = (event: MouseEvent, value: any) => {
    if (props?.onTabClick) props.onTabClick(event, value);
  };

  if (Array.isArray(props.tabs))
    return (
      <>
        {props.tabs.map((child) => (
          <div
            className="tab"
            key={child.props.value}
            onClick={(event) => handleTabClick(event, child.props.value)}
          >
            {child}
          </div>
        ))}
      </>
    );

  return (
    <div
      className="tab"
      onClick={(event) =>
        handleTabClick(
          event,
          (props.tabs as ReactElement<TabProps>).props.value
        )
      }
    >
      {props.tabs}
    </div>
  );
};

export default Tabs;
