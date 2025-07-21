"use client"
import AdminSidebar from '@/components/admin/Sidebar'
import React, { Suspense, useState } from 'react'
import styles from './AdminLayout.module.css'
export default function Adminlayout({ children }) {
    const [isSideBarOpen, setIsSideBarOPen] = useState(true);

    return (
        <div className={styles.main}>
            <AdminSidebar isOpen={isSideBarOpen}
                toggle={() => setIsSideBarOPen(!isSideBarOpen)} />
            <div className={`${styles.mainContent} ${isSideBarOpen ? styles.closedSidebar : styles.openSidebar
                }`}>

                <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
            </div>

        </div>
    )
}
