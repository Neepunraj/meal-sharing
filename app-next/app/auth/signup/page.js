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
    password: '',
    name: '',

}
export default function SingUpPage() {
    const [formdata, setFormData] = useState(initalformData)
    function handleChange(event) {
        setFormData(prev => ({ ...prev, [event.target.name]: event.target.value }))
    }
    const { register, isLoading, } = useUserContext()
    const router = useRouter()
    const handleSignup = async (event) => {
        event.preventDefault()
        const data = await register(formdata.name, formdata.email, formdata.password)
        if (data.success) {
            alert("Login Successful")
            setFormData(initalformData)
            router.push('/auth/login')
        }
    }
    return (
        <div className={styles.fullWidth}>
            <div className="bg-red-500">
                <h1>Welcome to meal Mearing App <br />Powered By</h1>
                <HackyoutfutureLogo />

                <div>
                    <form action="submit" onSubmit={handleSignup} className={styles.formContainer}>
                        <div className={styles.inputDiv}>
                            <label htmlFor='name'>Name</label>
                            <input id='name' type='text' name='name'
                                value={formdata.name}
                                required
                                placeholder='Please Entnter Name' onChange={handleChange} />
                        </div>
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

                        <Button type='submit' name={isLoading ? "Registering .... " : "Register"} variant={'Primary'} fullWidth />

                    </form>
                    <p>Already have a account {" "}
                        <Link href={'/auth/login'}>Login</Link>
                    </p>

                </div>
            </div>

        </div>
    )
}
