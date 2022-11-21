import {
  FC,
  Key,
  PropsWithChildren,
  useContext
} from 'react';
import { TabContext } from './TabContext';

export interface TabPanelProps extends PropsWithChildren {
  value: Key;
}

const TabPanel: FC<TabPanelProps> = (props) => {
  const [value] = useContext(TabContext);

  return (
    <>
      {value === props.value && (
        <div className="panel">{props.children}</div>
      )}
      <style jsx>{``}</style>
    </>
  );
};

export default TabPanel;
