'use client'
import React, { useEffect, useReducer, useState } from 'react'
import styles from "./MealList.module.css"
import { useRouter } from 'next/navigation'
export default function MealList() {
    const [meals, setMeals] = useState([])
    const [error, setError] = useState(null)
    const [isLoading, setIsloading] = useState(false)
    const router = useRouter()
    const fetchMeals = async () => {
        setIsloading(true)
        try {
            const response = await fetch(`http://localhost:8000/api/meals`, {
                method: "GET"
            })
            const data = await response.json()
            if (!response.ok || !data.success) {
                setError("unable to get data please try agin")
                return
            }

            setIsloading(false)
            setMeals(data.meals)
            setError(null)
        } catch (error) {
            setIsloading(false)
            setError("unable to fecth meal")
        }
    }
    useEffect(() => {
        fetchMeals()


    }, [])
    console.log(meals)
    if (isLoading) return <div className={styles.container}>
        <p>Loading...</p>
    </div>
    if (error) return <div className={styles.container}>
        <p className={styles.redZone}>Error occured {error}</p>
    </div>
    return (
        <div className={styles.fullWidthContainer} >
            <h1>Meal List</h1>
            <div className={styles.mealLists}>
                {
                    meals && meals.length > 0 ?

                        meals.map(meal =>
                            <div className={styles.mealCard} key={meal.id} onClick={() => router.push(`/meal/${meal.id}`)}>
                                <h3>{meal.title?.toUpperCase()}</h3>
                                <p>{meal.description}</p>
                                <p>Price: ${meal.price}</p>
                                <p>Max Reservation: {meal.max_reservations}
                                </p>
                                <p>Location: {meal.location}</p>
                                <p>Date: {new Date(meal.when).toLocaleString()}</p>
                                <p>createdAt: {new Date(meal.createdAt).toLocaleString()}</p>

                            </div>
                        )

                        : <div className={styles.container}><p>No meals found</p></div>
                }


            </div>


        </div>
    )
}
