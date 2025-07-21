'use client'
import { Star } from 'lucide-react';
import { useState } from 'react';

export default function StarRating({ onRate }) {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);

    const handleClick = (value) => {
        setRating(value);
        if (onRate) {
            onRate(value)
        }
    };

    return (
        <div style={{ display: 'flex', gap: 4, cursor: 'pointer' }}>
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    onClick={() => handleClick(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(null)}
                    color={star <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                    size={24}
                    style={{ cursor: 'pointer' }}
                />
            ))}
        </div>
    );
}