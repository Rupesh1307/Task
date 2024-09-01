import React, {createContext, useContext, useState, FC} from 'react';

const AppContext = createContext<any>(null);

interface ThemeProps {
  children?: React.ReactNode;
}

const AppProvider: FC<ThemeProps> = ({children}) => {
  const [userInfo, setUserInfo] = useState<any>();

  return (
    <AppContext.Provider value={{userInfo, setUserInfo}}>
      {children}
    </AppContext.Provider>
  );
};

export {AppProvider};

const useApp = () => {
  return useContext(AppContext);
};

export default useApp;
