'use client'
import HackyoutfutureLogo from '@/components/hyfcomponenent/HackyoutfutureLogo'
import React, { useState } from 'react'
import styles from './page.module.css'
import Link from 'next/link'
import { useUserContext } from '@/context/usercontext'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button/Button'
const initalformData = {
    email: '',
    password: ''
}
export default function LoginPage() {
    const [formdata, setFormData] = useState(initalformData)
    const { login, isLoading, error, user } = useUserContext()
    const router = useRouter()
    function handleChange(event) {
        setFormData(prev => ({ ...prev, [event.target.name]: event.target.value }))
    }
    const handleLogin = async (event) => {
        event.preventDefault()
        const success = await login(formdata.email, formdata.password)

        if (success) {
            alert("login Successfule")
            if (user?.role === "ADMIN") {
                router.push('/admin')
            } else {
                router.push('/meal')
            }
        } else {
            alert("Unable to login")
        }
    }
    return (
        <div className={styles.fullWidth}>
            <div className="bg-red-500">
                <h1>Welcome to meal Mearing App <br />Powered By</h1>
                <HackyoutfutureLogo />

                <div>
                    <form action="submit" className={styles.formContainer} onSubmit={handleLogin}>
                        <div className={styles.inputDiv}>
                            <label htmlFor='email'>Email</label>
                            <input id='email' type='email' name='email'
                                value={formdata.email}
                                required
                                placeholder='Please Entnter Email' onChange={handleChange} />
                        </div>
                        <div className={styles.inputDiv}>
                            <label htmlFor='password'>Password</label>
                            <input id='password' type='password'
                                required
                                value={formdata.password} name='password' placeholder='Please Entnter password' onChange={handleChange} />
                        </div>
                        <Button type='submit' variant={'Primary'} name={isLoading ? "Logging" : "Login"} fullWidth />
                        <p>Don't have a account {" "}
                            <Link href={'/auth/signup'}>Sign Up</Link>
                        </p>
                    </form>

                </div>
            </div>

        </div >
    )
}
