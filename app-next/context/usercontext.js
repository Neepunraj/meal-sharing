import { API_ROUTES } from "@/utils/api"
import axios from "axios"
import { createContext, useContext, useState } from "react"

const Usercontext = createContext()

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)
        try {
            const response = await axios.post(`${API_ROUTES.AUTH}/login`, { email, password }, { withCredentials: true })
            setUser(response.data.user)
            setIsLoading(false)
            return true
        } catch (error) {
            setIsLoading(false)
            setError("Error Login")

        }

    }
    const register = async (name, email, password) => {
        setIsLoading(true)
        setError(null)
        try {
            const response = await axios.post(`${API_ROUTES.AUTH}/register`, { name, email, password }, { withCredentials: true })
            setIsLoading(false)
            return response.data

        } catch (error) {
            setIsLoading(false)
            setError('Error Registering account')

        }

    }
    const logout = async () => {
        setIsLoading(true)
        setError(null)
        try {
            await axios.post(`${API_ROUTES.AUTH}/logout`, { withCredentials: true })
            setIsLoading(false)
            return response.data.success

        } catch (error) {
            setIsLoading(false)
            setError('Error Logging account')

        }
    }
    return < Usercontext.Provider value={{ user, setUser, login, error, isLoading, register, logout }
    } >
        {children}
    </Usercontext.Provider >
}

export const useUserContext = () => useContext(Usercontext)