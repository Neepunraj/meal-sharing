import { API_ROUTES } from "@/utils/api"
import axios from "axios"
import { createContext, useContext, useState } from "react"

const ReservationContext = createContext()

export function ReservationContextProvider({ children }) {
    const [reservations, setreservations] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const fetchllReservations = async () => {
        setIsLoading(true)
        try {
            const response = await axios.get(`${API_ROUTES.RESERVATIONS}/getallreservations`)
            setreservations(response.data.reservations)
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            setError(error)
        }
    }
    const addReservation = async (
        contact_email,
        contact_name,
        contact_number,
        no_of_guests,
        meal_id,
    ) => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await axios.post(`${API_ROUTES.RESERVATIONS}/addreservation`, {
                contact_email,
                contact_name,
                contact_number,
                no_of_guests,
                meal_id
            }, {
                withCredentials: true
            })
            if (!response.ok) {
                return response.data.success
            } else {
                return true
            }

        } catch (error) {
            console.log(error)
        }
    }

    return < ReservationContext.Provider value={{ reservations, setreservations, error, isLoading, fetchllReservations, addReservation }
    } >
        {children}
    </ReservationContext.Provider >
}

export const useReservation = () => useContext(ReservationContext)