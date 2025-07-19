"use client"

import React, { useEffect, useRef } from 'react'
import styles from './../meal/list/Meallist.module.css'
import { useReservation } from '@/context/reservationContext'
import { useMealContext } from '@/context/mealContext'
export default function AdminReservationpage() {
    const { fetchllReservations, reservations, isLoading } = useReservation()
    useEffect(() => {
        fetchllReservations()


    }, [])

    if (isLoading) return <div>Loading....</div>
    return (
        <div className={styles.container}>
            <div>
                <header className={styles.header}>
                    <h2>Reservations List</h2>
                </header>

                <div>
                    <div>
                        <table className={styles.table}>
                            <thead>
                                <tr className={styles.tableHead}>
                                    <th>Customer Name</th>
                                    <th>Phone Number</th>
                                    <th>Reservation Date</th>
                                    <th>Guest Number</th>
                                    <th>Meal Selected</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    reservations && reservations.length && reservations.length > 0 ? reservations.map(reservation => (<tr key={reservation.id} className={styles.tableHead}>
                                        <td>{reservation.contact_name}
                                            <br />
                                            <span>
                                                {reservation.contact_email}
                                            </span>
                                        </td>

                                        <td>{reservation.contact_number}</td>
                                        <td>{new Date(reservation.createdAt).toLocaleDateString()}</td>
                                        <td>{reservation.no_of_guests}</td>
                                        <td>{reservation.meal_id}</td>

                                    </tr>)) : (
                                        <tr>
                                            <td>No Reser vations So Far</td>
                                        </tr>
                                    )
                                }

                            </tbody>
                        </table>

                    </div>
                </div>
            </div>


        </div >
    )
}
