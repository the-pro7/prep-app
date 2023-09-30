import React, { useState, useContext, useEffect } from 'react'
import { auth } from '../../firbase/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

const AuthContext = React.createContext()

export const useAuth = () => useContext(AuthContext)

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup (email, password) {
    createUserWithEmailAndPassword(auth, email, password)
  }

  function login (email, password) {
     signInWithEmailAndPassword(auth, email, password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
        setCurrentUser(user)
        setLoading(false)
    })

    return unsubscribe;
  }, [])

  // An object of the needed values needed for the authentication
  const authValues = {
    currentUser,
    signup,
    login
  }

  return (
    <AuthContext.Provider value={authValues}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
