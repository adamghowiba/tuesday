import classNames from 'classnames';
import { FC, Key, MouseEvent, PropsWithChildren, useContext } from 'react';
import Button from '../button';
import { TabContext } from './TabContext';

export interface TabProps extends PropsWithChildren {
  value: Key;
  onClick?: (event: MouseEvent, value: any) => void;
}

const Tab: FC<TabProps> = (props) => {
  const [tabValue, setTabValue] = useContext(TabContext);

  const handleTabClick = () => {
    if (setTabValue) setTabValue(props.value);
  };

  return (
    <>
      <div
        className={classNames('tab', tabValue === props.value && 'active')}
        onClick={handleTabClick}
      >
        <Button buttonStyle="ghost" sx={{fontWeight: 300, padding: 'var(--space-small) var(--space-medium)'}} >{props.children}</Button>
      </div>
      <style jsx>{`
        .tab {
          &.active {
            border-bottom: 1px solid var(--primary-color);
          }
        }
      `}</style>
    </>
  );
};

export default Tab;
