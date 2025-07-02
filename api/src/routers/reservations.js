import express from 'express'
import { addReservations, deleteReservationByID, getallReservation, getReservationById, updateReservation } from '../controllers/reservationContoller.js'


export const reservationsRouter = express.Router()
reservationsRouter.get('/api/reservations', getallReservation)
reservationsRouter.get('/api/reservations/:id', getReservationById)
reservationsRouter.post('/api/addreservations', addReservations)
reservationsRouter.put('/api/reservations/:id', updateReservation)
reservationsRouter.delete('/api/reservations/:id', deleteReservationByID)