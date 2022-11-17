import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from './supabase';
import axios from 'axios';
import { useRouter } from 'next/router';
import Router from 'next/router';
import { useCookies } from "react-cookie"

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(supabase.auth.session());
  const [user, setUser] = useState(supabase.auth.user());
  const [loading, setLoading] = useState(false)
  const router  = useRouter()
  const [cookie, setCookie, removeCookie] = useCookies(["user"])
  const [welcome, setWelcome] = useState(true)

  useEffect(() => {
    const getUserProfile = async () => {
      const sessionUser = supabase.auth.user()

      if(sessionUser){
        const {data: profile} = await supabase.from('profiles').select('*')
        .eq('id', sessionUser.id)
        .single()


        setUser({
          ...sessionUser,
          ...profile
        })
      }
    }
    getUserProfile()

    const activeSession = supabase.auth.session();
    setSession(activeSession);
    setUser(activeSession?.user ?? null);
  
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user);
        getUserProfile()
      }
    );
  
    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    axios.post("/api/set-supabase-cookie", {
      event: user? "SIGNED_IN" : "SIGNED_OUT",
      session: supabase.auth.session(),
    })
  }, [])

  const values = {
    session,
    setSession,
    user,
    loading,
    setLoading,
    welcome,
    setWelcome,
    signOut: () => {
      removeCookie("user")
      const {data, error } = supabase.auth.signOut()
      removeCookie("user")
    },
    signIn: (data) => {
      supabase.auth.signIn(data)
    },
    signUp: (data) => supabase.auth.signUp(data)
  }

  return (
    <AuthContext.Provider value={values} >
      {children}
    </AuthContext.Provider>
    
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
