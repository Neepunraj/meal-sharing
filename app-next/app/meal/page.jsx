"use client"
import FeatureBanner from '@/components/HomePage/FeatureBanner'
import React, { useEffect, useMemo, useState } from 'react'
import styles from "./meal.module.css"
import { useMealContext } from '@/context/mealContext'
import MealCard from '@/components/MealList/MealCard'
import { useRouter } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { debounce } from 'lodash'

export default function MealsPage() {
    const [sortKey, setSortKey] = useState("createdAt");
    const [sortDir, setSortDir] = useState("desc");
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);
    const [showLoading, setShowLoading] = useState(false);
    const router = useRouter()
    const { meals, currentPage, totalPages, setCurrentPage, fetchMealForClient, isLoading, error,
    } = useMealContext()

    const debounceSearch = useMemo(() =>
        debounce(value => {
            setDebouncedSearch(value)
        }, 500), [])

    const handleSearchChange = (value) => {
        setSearchQuery(value)
        debounceSearch(value)
    }
    const handleSortChange = (value) => {
        const [newsortKey, newsortDir] = value.split("-")
        setSortKey(newsortKey)
        setSortDir(newsortDir)

    }

    useEffect(() => {
        fetchMealForClient({
            page: currentPage,
            sortKey,
            sortDir,
            limit: 4,
            title: debouncedSearch
        });
    }, [debouncedSearch, currentPage, sortKey, sortDir]);
    /* prevents too many loadings */
    useEffect(() => {
        const timer = setTimeout(() => setShowLoading(isLoading), 200);
        return () => clearTimeout(timer);
    }, [isLoading]);

    /* clearing debounce */
    useEffect(() => {
        return () => debounceSearch.cancel();
    }, [debounceSearch]);
    function handlePageChange(page) {
        setCurrentPage(page)

    }


    return (
        <>
            <FeatureBanner />
            <div>
                <div className={styles.filterSection}>
                    <h2>All Meals </h2>
                    <input
                        type="text"
                        name="search"
                        value={searchQuery}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        placeholder="Search meals..."
                        className={styles.searchInput}
                    />
                    <select
                        className={styles.select}
                        name="sort"
                        value={`${sortKey}-${sortDir}`}
                        onChange={(e) => handleSortChange(e.target.value)}

                    >
                        <option value="createdAt-asc">Sort by: CreatedAt</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="createdAt-desc">Sort by: Newest First</option>
                    </select>


                </div>
            </div>

            <div className={styles.fullWidthContainer}>

                {
                    showLoading ? (
                        <div>Loading...</div>
                    ) : error ? <div>Error Occured</div> : <div className={styles.mealList}>
                        {
                            meals && meals.length && meals.map(meal =>
                                <MealCard key={meal.id} handleClick={() => router.push(`/meal/${meal.id}-${meal.slug}`)} meal={meal} />
                            )
                        }
                    </div>
                }
            </div>
            <div className={styles.paginationContainer}>
                <button disabled={currentPage === 1}
                    className={`${styles.button} ${currentPage === 1 ? styles.inactiveBtn : styles.activeBtn}`}
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}>
                    <ChevronLeft />
                </button>
                {
                    Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button key={page} className={`${styles.button} ${currentPage === page ? styles.activeBtn : styles.inactiveBtn}`}
                            onClick={() => handlePageChange(page)}
                        >
                            {page}
                        </button>
                    ))
                }
                <button disabled={currentPage === totalPages}
                    className={`${styles.button} ${currentPage === totalPages ? styles.activeBtn : styles.inactiveBtn}`}
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}>
                    <ChevronRight />
                </button>
            </div>

        </>
    )
}
