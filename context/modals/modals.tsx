import { createContext, useState } from "react";

interface Modals {
  register: boolean;
  login: boolean;
}

type PropsModalsContext = {
  modals: Modals;
  setModals: (data: Modals) => void;
};

const DEFAULT_VALUE: PropsModalsContext = {
  modals: {
    login: false,
    register: false,
  },
  setModals: (data) => {},
};

const ModalsContext = createContext<PropsModalsContext>(DEFAULT_VALUE);

const ModalsContextProvider = ({ children }: any) => {
  const [modals, setModals] = useState(DEFAULT_VALUE.modals);

  return (
    <ModalsContext.Provider value={{ modals, setModals }}>
      {children}
    </ModalsContext.Provider>
  );
};

export { ModalsContextProvider };

export default ModalsContext;
