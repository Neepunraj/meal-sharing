import { API_ROUTES } from "@/utils/api"
import axios from "axios"
import { createContext, useContext, useState } from "react"

const MealContext = createContext()

export function MealContextProvider({ children }) {
    const [meals, setMeals] = useState(null)
    const [bannerImages, setBannerImages] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const fetchMealsAdmin = async () => {
        setIsLoading(true)
        try {
            const response = await axios.get(`${API_ROUTES.MEAL}/allmeals`)
            setMeals(response.data.meals)
            setBannerImages(response.data.meals.map(meal => meal.imgUrl))
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            setError(error)
        }
    }

    const deleteMeal = async (id) => {
        setError(null)
        setIsLoading(true)
        try {
            const response = await axios.delete(`${API_ROUTES.MEAL}/${id}`, {
                withCredentials: true
            })
            setIsLoading(false)
            return response.data.success
        } catch (error) {
            setIsLoading(false)
            setError(error)


        }
    }
    const createMeal = async (formData) => {
        setIsLoading(true)
        setError(null)
        try {
            const response = await axios.post(`${API_ROUTES.MEAL}/addmeal`, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            setIsLoading(false)
            return response.data


        } catch (error) {
            setIsLoading(false)
            setError(error)

        }
    }
    const updateMeal = async (id, formData) => {

        setIsLoading(true)
        setError(error)
        try {
            const response = await axios.put(`${API_ROUTES.MEAL}/${id}`, formData, {
                withCredentials: true, headers: {
                    'Content-Type': 'application/json'
                }
            })
            setIsLoading(false)
            return response.data


        } catch (error) {
            setIsLoading(false)
            setError(error)

        }
    }
    const fetchMealbyId = async (id) => {
        setIsLoading(true)
        setError(error)
        try {
            const response = await axios.get(`${API_ROUTES.MEAL}/${id}`, { withCredentials: true })
            setIsLoading(false)
            return response.data.meal


        } catch (error) {
            setIsLoading(false)
            setError(error)

        }
    }
    return < MealContext.Provider value={{ meals, setMeals, error, isLoading, fetchMealsAdmin, deleteMeal, fetchMealbyId, createMeal, updateMeal, bannerImages }
    } >
        {children}
    </MealContext.Provider >
}

export const useMealContext = () => useContext(MealContext)