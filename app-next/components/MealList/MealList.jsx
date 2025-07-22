'use client'
import React, { useEffect, useReducer, useState } from 'react'
import styles from "./MealList.module.css"
import { useRouter } from 'next/navigation'
import MealCard from './MealCard'
import { useMealContext } from '@/context/mealContext'
import sampleMeals from '@/data/sampleMeals'
export default function MealList() {

    const { fetchMealsAdmin, isLoading, error, meals } = useMealContext()
    const router = useRouter()

    useEffect(() => {
        fetchMealsAdmin()
    }, [])
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
                            <MealCard key={meal.id} handleClick={() => router.push(`/meal/${meal.id}-${meal.slug}`)} meal={meal} />


                        )

                        : sampleMeals.map(meal =>
                            <MealCard key={meal.id} handleClick={() => router.push(`/meal/${meal.id}-${meal.slug}`)} meal={meal} />

                        )
                }


            </div>


        </div>
    )
}
