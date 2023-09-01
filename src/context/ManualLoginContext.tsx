/* eslint-disable react/prop-types */
import { FC, useState, useEffect, useContext, createContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export interface ManualLoginContextProps {
  manualLoginRequired: boolean;
  setManualLoginRequired: any;
}

export const ManualLoginContext = createContext<ManualLoginContextProps>(
  {} as ManualLoginContextProps,
);

const ManualLoginProvider: FC = ({ children }) => {
  const history = useHistory();
  const { logOutToken } = useContext(AuthContext);
  const [manualLoginRequired, setManualLoginRequired] = useState(false);

  useEffect(() => {
    const unlisten = history.listen(() => {
      if (history.action === "POP") {
        setManualLoginRequired(true);
        logOutToken();
        history.replace("/UserLogin");
      }
    });
    return () => {
      if (unlisten) {
        unlisten();
      }
    };
  }, [history]);

  return (
    <ManualLoginContext.Provider
      value={{
        manualLoginRequired,
        setManualLoginRequired,
      }}
    >
      {children}
    </ManualLoginContext.Provider>
  );
};

export default ManualLoginProvider;
