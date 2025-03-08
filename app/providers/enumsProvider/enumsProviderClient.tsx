'use client';

import { PropsWithChildren, createContext, useContext } from 'react';

export const EnumsContext = createContext<{ [key: string]: string[] }>({});
export const useEnumsContext = () => useContext(EnumsContext);

export const Client = ({
  enums,
  children,
}: PropsWithChildren<{ enums: any[] }>) => {
  const enumsJson: { [key: string]: string[] } = {};
  enums.forEach((enumObj: { name: string; values: string[] }) => {
    enumsJson[enumObj.name] = enumObj.values;
  });
  return (
    <EnumsContext.Provider value={enumsJson}>{children}</EnumsContext.Provider>
  );
};
