import React from 'react'
import styles from './ButtonItem.module.css'

export default function Button({ name, variant, onClick, type = 'button', disabled = false, fullWidth = false }) {
    return (
        <button
            disabled={disabled}
            type={type}
            onClick={onClick}
            className={`${styles.button} ${variant === 'Primary' ? styles.primary : styles.darkBtn} ${fullWidth && styles.fullWidth}`}>
            {name}

        </button>
    )
}
