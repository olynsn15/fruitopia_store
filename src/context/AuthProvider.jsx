import React, { useState, useEffect } from "react";
import supabase from "../utils/supabase";
import { AuthContext } from "./AuthContextSetup";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authReady, setAuthReady] = useState(false);

  const formatUser = (u) => {
    if (!u) return null;
    return {
      id: u.id,
      uid: u.id,
      email: u.email,
      name: u.user_metadata?.fullName || u.email.split("@")[0],
    };
  };

  useEffect(() => {
    const loadInitial = async () => {
      const { data } = await supabase.auth.getSession();
      const sessionUser = data?.session?.user;
      if (sessionUser) {
        setUser(formatUser(sessionUser));
        setIsAuthenticated(true);
      }
      setAuthReady(true);
    };

    loadInitial();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setUser(formatUser(session.user));
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    setUser(formatUser(data.user));
    setIsAuthenticated(true);
    return data;
  };

  const register = async (email, password, metadata = {}) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: metadata },
    });
    if (error) throw error;
    setUser(formatUser(data.user));
    setIsAuthenticated(true);
    return data;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        logout,
        setUser,
        authReady,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
