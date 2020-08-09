import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import * as auth from '../services/auth';
import api from '../services/api';

interface User {
  name: string;
  email: string;
}

interface AuthContextData {
  signed: boolean;
  user: User | null;
  loading: boolean;
  signIn(): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStorageData = async () => {
      const storageUser = await AsyncStorage.getItem('@RNAuth:user');
      const storageToken = await AsyncStorage.getItem('@RNAuth:token');

      if (storageToken && storageUser) {
        api.defaults.headers['Authorization'] = `Bearer ${storageToken}`;
        setUser(JSON.parse(storageUser));
        setLoading(false);
      }
    };

    loadStorageData();
  }, []);

  const signIn = async () => {
    const { token, user } = await auth.signIn();

    setUser(user);
    api.defaults.headers['Authorization'] = `Bearer ${token}`;

    await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(user));
    await AsyncStorage.setItem('@RNAuth:token', token);
  };

  const signOut = () => {
    AsyncStorage.clear().then(() => setUser(null));
  };

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, loading, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export default AuthContext;
