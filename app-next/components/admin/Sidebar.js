"use client"
import React from 'react'
import styles from "./Sidebar.module.css";
import {
    CalendarHeart,
    ChevronLeft,
    ChevronRight,

    LogOut,

    Notebook,

    Soup,
    Users,
} from "lucide-react";
import { useRouter } from 'next/navigation';
import { useUserContext } from '@/context/usercontext';
const menuItems = [
    {
        name: "Meals",
        icon: Soup,
        href: "/admin/meal/list",
    },
    {
        name: "Add New Meals",
        icon: Notebook,
        href: "/admin/meal/add",
    },


    {
        name: "Reservations",
        icon: CalendarHeart,
        href: "/admin/reservation",
    },

    {
        name: "Customers",
        icon: Users,
        href: "/admin/customers",
    },

    {
        name: "logout",
        icon: LogOut,
        href: "",
    },
];

export default function AdminSidebar({ isOpen, toggle }) {
    const router = useRouter()
    const { logout } = useUserContext()
    const handleLogout = async () => {
        const success = await logout()
        if (success) {
            router.push('/auth/login')
        }
    }
    return (
        <div className={`${isOpen ? styles.wrapper : styles.closedWrapper}`}>
            <div className={styles.header}>
                <h1 className={`${isOpen ? styles.bigTitle : styles.smallTitle}`}>Admin Panel</h1>
                <button
                    type="button"
                    onClick={toggle}
                >
                    {isOpen ? <ChevronLeft /> : <ChevronRight />}
                </button>
            </div>

            <div className={styles.menu}>
                {menuItems.map((item) => (
                    <div
                        key={item.name}
                        className={styles.menuItem}
                        onClick={
                            item.name === "logout"
                                ? handleLogout
                                : () => router.push(item.href)
                        }
                    >
                        <item.icon className="h-4 w-4" />
                        <span className={`${isOpen ? styles.menuText : styles.menuTextOff}`}>{item.name}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
