import express from 'express'
import { addReservations, deleteReservationByID, getallReservation, getReservationById, updateReservation } from '../controllers/reservationContoller.js'


export const reservationsRouter = express.Router()
reservationsRouter.get('/getallreservations', getallReservation)
reservationsRouter.get('/:id', getReservationById)
reservationsRouter.post('/addreservation', addReservations)
reservationsRouter.put('/:id', updateReservation)
reservationsRouter.delete('/:id', deleteReservationByID)