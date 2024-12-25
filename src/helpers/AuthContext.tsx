import React, { createContext, useContext, useState } from 'react';

interface AuthContextProps {
  role: string | null;
  setRole: (role: string | null) => void;
  cart: boolean;
  setCart: (cart: boolean) => void;
}

const AuthContext = createContext<AuthContextProps>({
  role: null,
  setRole: () => {},
  cart: false,
  setCart: () => {}
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<string | null>(sessionStorage.getItem('role'));
  const [cart, setCart] = useState<boolean>(false);
  return (
    <AuthContext.Provider value={{ role, setRole, cart, setCart }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
