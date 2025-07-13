"use client"

import React, { useEffect, useRef } from 'react'
import styles from './Meallist.module.css'
import { useRouter } from 'next/navigation'
import { useMealContext } from '@/context/mealContext'
import Button from '@/components/ui/Button/Button'
export default function AdminMealListpage() {
    const router = useRouter()
    const { fetchMealsAdmin, meals, isLoading, deleteMeal } = useMealContext()
    useEffect(() => {

        fetchMealsAdmin()

    }, [])
    const handleDeleteMeal = async (id) => {
        const result = await deleteMeal(id)
        if (result) {
            fetchMealsAdmin()
        }

    }
    if (isLoading) return <div>Loading....</div>

    return (
        <div className={styles.container}>
            <div>
                <header className={styles.header}>
                    <h2>All Meals List</h2>
                    <Button onClick={() => router.push('/admin/meal/add')} className={styles.button} name={'Add a New Meal'} variant={'Primary'} />

                </header>

                <div>
                    <div>
                        <table className={styles.table}>
                            <thead >
                                <tr className={styles.tableHead}>
                                    <th>Image</th>
                                    <th>Title</th>
                                    <th>Description</th>

                                    <th>When</th>
                                    <th className={styles.endText}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    meals && meals.length && meals.length > 0 ? meals.map(meal => (<tr key={meal.id} className={styles.tableHead}>
                                        <td className={styles.imageContainer}>
                                            <img src={meal.imgUrl} className={styles.imageBanner} />
                                        </td>
                                        <td>{meal.title}
                                            <br />
                                            <span>{meal.price} Dkk</span><br />
                                            <span>{meal.location}</span><br />
                                            <span>Max Res: {meal.max_reservations}</span>

                                        </td>
                                        <td>{meal.description}</td>
                                        <td>{new Date(meal.when).toDateString()}</td>
                                        <td className={styles.actions}>
                                            <Button onClick={() => router.push(`/admin/meal/add?id=${meal.id}`)} name={'Edit'} variant={'Primary'} />
                                            <Button onClick={() => handleDeleteMeal(meal.id)} name={'Delete'} />
                                        </td>


                                    </tr>)) : (
                                        <tr>
                                            <td>No Meals Found</td>
                                        </tr>
                                    )
                                }

                            </tbody>
                        </table>

                    </div>
                </div>
            </div>


        </div>
    )
}
