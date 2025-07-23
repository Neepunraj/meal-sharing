import React from 'react'
import styles from "./BannerHome.module.css"
import Image from 'next/image'


export default function FeatureBanner() {
    return (
        <section className={styles.relativeSection}>
            <div className={`${styles.imgDisplay} ${styles.activeImg}`}>
                <div className={styles.absolutediv}>
                    <Image src={'https://res.cloudinary.com/dtm7wbzin/image/upload/v1752348159/mealphoto/szkdq0tqsf7kxzenatme.webp'} alt={`Banner raya`} className={styles.imageBanner} />
                </div>
                <div className={styles.blackOpacity} />
                <div className={styles.titleContainer}>
                    <div className={styles.textBox}>
                        <span>
                            Book Online Nw
                        </span>
                        <h1 className={styles.largerText}>Your Hygge Resturant</h1>
                        <p>A Cozy Hub Station</p>
                        <button className={styles.bookButton}>Reserve Now</button>
                    </div>
                </div>
            </div>
        </section>
    )
}
