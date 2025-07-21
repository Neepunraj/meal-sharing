"use client"
/* homeworks this week july 2 */
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import styles from "./MealList.module.css"
import { useMealContext } from '@/context/mealContext'
import Button from '../ui/Button/Button'
import StarRating from '../starRating/starRating'
import { useReservation } from '@/context/reservationContext'
const initialFormdata = {
    contact_number: "",
    contact_name: "",
    contact_email: "",
    no_of_guests: ""
}
const initialReviewForm = {
    title: "",
    description: "",
    stars: ""
}
export default function MealDetail({ id }) {
    const [mealbyId, setMealbyId] = useState([])
    const [formData, setFormData] = useState(initialFormdata)
    const [reviewForm, setReviewForm] = useState(initialReviewForm)
    const [reviews, setReviews] = useState([])
    const [isloading, setIsLoading] = useState(false)
    const [showReviewForm, setShowReviewForm] = useState(false)
    const { fetchMealbyId } = useMealContext()
    const { addReservation, error } = useReservation()
    const [showReserveForm, setShowReserveForm] = useState(false)
    const router = useRouter()
    const fetchReviewsByMealID = async () => {
        setIsLoading(true)
        try {
            const response = await fetch(`http://localhost:8000/api/review/${id}`)
            const data = await response.json()
            setReviews(data.reviews)
            setIsLoading(false)

        } catch (error) {
            console.log(error)/* for testing only error will be ahdnled later*/
            setIsLoading(false)
        }

    }
    useEffect(() => {


        const fetchProduct = async () => {
            const mealDeatails = await fetchMealbyId(id)
            if (mealDeatails) {
                setMealbyId(mealDeatails)
            } else {
                router.push('/404')
            }

        }
        fetchProduct()
        fetchReviewsByMealID()


    }, [id])
    if (isloading) return <div>isloading....</div>

    async function handleSubmitReserVation(event) {
        event.preventDefault()
        const success = await addReservation(formData.contact_email, formData.contact_name, formData.contact_number, formData.no_of_guests, id)
        console.log(success)
        if (success) {
            alert("Reservation Done")
            setFormData(initialFormdata)
        } else {
            alert("Unable to reserve seat")
        }
    }
    async function handleSubmitReview(event) {
        event.preventDefault()
        const response = await fetch('http://localhost:8000/api/addreview', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                ...reviewForm,
                meal_id: mealbyId.id
            })
        })
        const data = await response.json()
        if (data.success) {
            alert(`${data.message}`)
            setReviewForm(initialReviewForm)
            setShowReviewForm(false)
            fetchReviewsByMealID()

        } else {
            alert(`Error: ${data.error}`)
        }
    }
    function handleFormChange(event) {
        setFormData(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }
    function handleReviewFormChange(event) {
        setReviewForm(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }
    function handleRatingChange(value) {
        setReviewForm(prev => ({ ...prev, stars: value }))

    }
    return (
        <div className={styles.mealContainer}>
            <h1 className={styles.mealTitle}>
                {mealbyId.title}
            </h1>
            <div className={styles.imgWrapper}>
                <img src={mealbyId.imgUrl} alt={mealbyId.title} className={styles.images} />
            </div>
            <p className={styles.MealDescription}>
                {mealbyId.description}
            </p>

            <div className={styles.mealDetailsGrid}>
                <div className="">
                    <span className={styles.label}>
                        {mealbyId.location}
                    </span>
                </div>
                <div className="">
                    Price: <span className={styles.label}>
                        {mealbyId.price}DKK
                    </span>
                </div>
                <div className="">
                    <span className={styles.label}>
                        {mealbyId.max_reservations > 0 ? (
                            <p>Available Reservations :{mealbyId.max_reservations
                            }</p>
                        ) : (
                            <p>No Spot Availbale Please Try next time</p>
                        )}
                    </span>
                </div>
                <div className="">
                    Booking Availbale: <span className={styles.label}>
                        {new Date(mealbyId.when).toLocaleDateString()}
                    </span>
                </div>
                <div className="">
                    Created Date: <span className={styles.label}>
                        {new Date(mealbyId.createdAt).toLocaleDateString()}
                    </span>
                </div>

            </div>
            <div className={styles.mealDetailsGrid}>
                {reviews && reviews.length > 0 ? reviews.map(review => <div className={styles.reviewContainer} key={review.title}>
                    <p className={styles.label}>{review.title}</p>
                    <p className={styles.label}>{review.description}</p>
                    <p className={styles.label}>Rating : {review.stars} Stars</p>
                    <p className={styles.label}>Published: {new Date(review.createdAt).toLocaleDateString()}</p>
                </div>) : <p>No Reviews So Far</p>}
            </div>
            <Button variant={'Primary'} name={'Add a Review'} onClick={() => {
                setShowReviewForm(!showReviewForm)
                if (showReserveForm) {
                    setShowReserveForm(!showReserveForm)
                }
            }} />
            <Button name={'Book a Table now'} onClick={() => {
                setShowReserveForm(!showReserveForm)
                if (showReviewForm) {
                    setShowReviewForm(!showReviewForm)
                }
            }} />

            {/* tile,
            description,
            stars, */}    {
                showReviewForm && <form className={styles.form} onSubmit={handleSubmitReview}>
                    <div className={styles.formGroup}>
                        <label htmlFor="title">Title</label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            value={reviewForm.title}
                            onChange={handleReviewFormChange}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="contact_name">Description</label>
                        <input
                            id="description"
                            name="description"
                            type="text"
                            value={reviewForm.description}
                            onChange={handleReviewFormChange}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="contact_email">Meal Ratings</label>
                        <StarRating onRate={handleRatingChange} />

                    </div>


                    <Button name={'Add Review Now'} variant={'Primary'} type='submit' />
                </form>

            }
            {
                showReserveForm && mealbyId.max_reservations > 0 && <form className={styles.form} onSubmit={handleSubmitReserVation}>
                    <div className={styles.formGroup}>
                        <label htmlFor="contact_number">Phone Number</label>
                        <input
                            id="contact_number"
                            name="contact_number"
                            type="text"
                            value={formData.contact_number}
                            onChange={handleFormChange}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="contact_name">Name</label>
                        <input
                            id="contact_name"
                            name="contact_name"
                            type="text"
                            value={formData.contact_name}
                            onChange={handleFormChange}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="contact_email">Email</label>
                        <input
                            id="contact_email"
                            name="contact_email"
                            type="email"
                            value={formData.contact_email}
                            onChange={handleFormChange}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="no_of_guests">Number of Guests</label>
                        <input
                            id="no_of_guests"
                            name="no_of_guests"
                            type="number"
                            min={0}
                            value={formData.no_of_guests}
                            onChange={handleFormChange}
                            required
                        />
                    </div>
                    <Button name={'Reserve Now'} variant={'Primary'} type='submit' />
                </form>

            }


        </div>
    )
}
