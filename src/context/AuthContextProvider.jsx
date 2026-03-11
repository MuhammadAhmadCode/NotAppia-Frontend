import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { AuthContext } from './AuthContext'

const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);

  const checkUser = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/auth/me", {
        withCredentials: true
      })

      setUser(res.data);
    } catch (error) {
        if (error.response?.status === 401) {
          setUser(null);
        } else {
          console.error(error);
        }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <AuthContext.Provider value={{user,setUser,loading}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider