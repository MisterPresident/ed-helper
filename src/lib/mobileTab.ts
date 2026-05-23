import { createContext, useContext } from 'react';

export type MobileTab = 'patients' | 'workflow' | 'algorithm';

export const MobileTabContext = createContext<{
  tab: MobileTab;
  setTab: (t: MobileTab) => void;
}>({
  tab: 'workflow',
  setTab: () => {},
});

export const useMobileTab = () => useContext(MobileTabContext);
