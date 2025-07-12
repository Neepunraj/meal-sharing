import express from 'express'
import { createUser, login, logOut } from '../controllers/userController.js'

export const userRouter = express.Router()

userRouter.post('/register', createUser)
userRouter.post('/login', login)
userRouter.post('/logout', logOut)
