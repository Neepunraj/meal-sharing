"use client"

import React, { useEffect, useRef } from 'react'
import styles from './../meal/list/Meallist.module.css'
import { useRouter } from 'next/navigation'
import { useReservation } from '@/context/reservationContext'
/* for now retrived customers from reservation for log run plan is to have users to send emails */
export default function AdminReservationpage() {
    const router = useRouter()
    const { fetchllReservations, reservations, isLoading } = useReservation()
    const fetchReservationRef = useRef(false)
    useEffect(() => {
        if (!fetchReservationRef.current) {

            fetchllReservations()
            fetchReservationRef.current = true
        }

    }, [fetchllReservations])

    if (isLoading) return <div>Loading....</div>
    return (
        <div className={styles.container}>
            <div >
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
                                    <th>Email Address </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    reservations && reservations.length && reservations.length > 0 ? reservations.map(reservation => (<tr key={reservation.id} className={styles.tableHead}>
                                        <td>{reservation.contact_name}
                                        </td>

                                        <td>{reservation.contact_number}</td>
                                        <td>
                                            {reservation.contact_email}
                                        </td>
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
