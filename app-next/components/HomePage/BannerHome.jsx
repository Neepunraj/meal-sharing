"use client"
import { useMealContext } from '@/context/mealContext'
import React, { useEffect, useRef, useState } from 'react'

import styles from "./BannerHome.module.css";
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function BannerHome() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const router = useRouter()
    const { fetchMealsAdmin, bannerImages } = useMealContext()
    const mealadminRef = useRef(false)
    useEffect(() => {
        if (!mealadminRef.current) {
            fetchMealsAdmin()
            mealadminRef.current = true
        }


    }, [])
    useEffect(() => {
        if (bannerImages.length > 0) {
            const bannerTimer = setInterval(() => {
                setCurrentSlide(prev => (prev + 1) % bannerImages.length)

            }, 4000)
            return () => clearInterval(bannerTimer)
        }

    }, [bannerImages.length])
    return (
        <div>
            <section className={styles.relativeSection}>
                {
                    bannerImages && bannerImages.length > 0 && bannerImages.map((banner, index) =>
                        <div key={index} className={`${styles.imgDisplay} ${currentSlide === index ? styles.activeImg : styles.inactiveImg}`}>
                            <div className={styles.absolutediv}>
                                <Image src={banner} alt={`Banner ${index + 1}`} fill className={styles.imageBanner} />
                            </div>
                            <div className={styles.blackOpacity} />
                            <div className={styles.titleContainer}>
                                <div className={styles.textBox}>
                                    <span>
                                        Book Online Now
                                    </span>
                                    <h1 className={styles.largerText}>Your Hygge Resturant</h1>
                                    <p>A Cozy Hub Station</p>
                                    <button className={styles.bookButton} onClick={() => router.push('/meal')}> See Collections and Reserve a seat</button>
                                </div>
                            </div>

                        </div>)
                }
                <div className={styles.buttons}>
                    {
                        bannerImages && bannerImages.length > 0 && bannerImages.map((_, index) =>
                            <button key={index} className={`${styles.dotButton} ${currentSlide === index ? styles.activeButton : styles.inactiveButton}`} />
                        )
                    }
                </div>
            </section>

        </div>
    )
}
