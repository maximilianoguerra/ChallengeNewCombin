import React from "react";
import { createContext, useContext, useMemo } from "react";
import { getUsers } from "../service/service";

interface ContextState {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  rows: any[];
  setRows: React.Dispatch<React.SetStateAction<any[]>>;
}
const StatePageContext = createContext({} as ContextState);

export const useStatePage = () => {
  const useStatePageHook = useContext(StatePageContext);
  return useStatePageHook;
};
export const StatePageProvider = ({ children }: any) => {
  const [rows, setRows] = React.useState<any[]>([]);
  const [token, setToken] = React.useState("");
  React.useEffect(() => {
    token !== "" && getRows();
  }, [token]);
  const getRows = async () => {
    const resp = await getUsers(token);
    setRows(resp);
  };
  const value = useMemo(
    () => ({
      token,
      rows,
      setRows,
      setToken,
    }),
    [token, rows, setRows, setToken]
  );
  return (
    <StatePageContext.Provider value={value}>
      {children}
    </StatePageContext.Provider>
  );
};
