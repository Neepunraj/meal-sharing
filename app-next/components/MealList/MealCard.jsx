import React from 'react'
import styles from "./MealList.module.css"
import Image from 'next/image'

export default function MealCard({ handleClick, meal }) {
    return (
        <div className={styles.mealCard} key={meal.id} onClick={handleClick}>
            <div>
                <Image src={meal.imgUrl} width={300} height={150} style={{ objectFit: 'cover' }} alt={meal.title} />
            </div>
            <h3>{meal.title?.toUpperCase()}</h3>
            <p>{meal.description}</p>
            <p>Price: ${meal.price}</p>
            <p>Max Reservation: {meal.max_reservations}
            </p>
            <p>Location: {meal.location}</p>
            <p>Available on: {new Date(meal.when).toLocaleString()}</p>

        </div>
    )
}
