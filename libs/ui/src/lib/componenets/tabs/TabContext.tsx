/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';

export const TabContext = createContext<[any, Dispatch<any> | undefined]>([
  '',
  undefined,
]);

export interface TabContextProviderProps extends PropsWithChildren {
  value: any;
}

const TabContextProvider: FC<TabContextProviderProps> = ({
  value,
  ...props
}) => {
  const [contextValue, setContextValue] = useState<any>();

  useEffect(() => {
    setContextValue(value);
  }, [value]);

  return (
    <>
      <TabContext.Provider value={[contextValue, setContextValue]}>
        {props.children}
      </TabContext.Provider>

      <style jsx>{``}</style>
    </>
  );
};

TabContextProvider.defaultProps = {};

export default TabContextProvider;
