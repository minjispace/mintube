import React, {useContext, useState} from 'react';

const AppContext = React.createContext();

const AppProvider = ({children}) => {
  const [user, setUser] = useState(null);

  const saveUser = (user) => {
    setUser(user);
  };

  const removeUser = () => {
    setUser(null);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        saveUser,
        removeUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export default AppProvider;
