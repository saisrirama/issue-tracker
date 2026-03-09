import { createContext, useEffect, useState } from "react"
import { loginUser, registerUser } from "../api/authApi"

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("auth_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = async (username, password) => {
    const loggedInUser = await loginUser({ username, password })
    setUser(loggedInUser)
    localStorage.setItem("auth_user", JSON.stringify(loggedInUser))
    return loggedInUser
  }

  const register = async (username, password) => {
    const createdUser = await registerUser({ username, password })
    setUser(createdUser)
    localStorage.setItem("auth_user", JSON.stringify(createdUser))
    return createdUser
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("auth_user")
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
