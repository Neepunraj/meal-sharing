
import knex from '../database_client.js'


export async function getallReservation(req, res) {

    const reservations = await knex('reservations')

    if (!reservations) {
        res.status(404).json({
            success: false,
            error: 'Reservations not Found'
        })
        return
    } else {
        res.status(200).json({
            success: 'true',
            reservations: reservations
        })
    }

}

export async function addReservations(req, res) {

    try {
        const { no_of_guests,
            contact_number,
            contact_name,
            contact_email,
            meal_id } = req.body


        const meal = await knex('meal').where({ id: meal_id }).first()
        if (!meal) {
            res.status(404).json({ success: false, error: 'meal Not found' })
            return
        }
        const maxReservation = meal.max_reservations
        /* checking revervation */
        const result = await knex('reservations').where({ id: meal_id }).sum('no_of_guests as total_reserved').first()
        const totalReserved = result.total_reserved || 0
        /* check if you can add reservation */

        if (totalReserved + no_of_guests > maxReservation) {
            res.status(400).json({
                success: false,
                error: 'Not Enough Spot Availbale'
            })
            return
        }

        await knex('reservations').insert({
            no_of_guests,
            contact_number,
            contact_name,
            contact_email,
            createdAt: knex.fn.now(),
            meal_id
        })
        /* also need to decreace reservation spot in meals */
        await knex('meal').where({ id: meal_id }).update({
            max_reservations: maxReservation - no_of_guests
        })
        res.status(200).json({
            success: true,
            message: 'Reservations added successfully'
        })


    } catch (error) {
        res.status(500).json({ success: false, error: 'error Occred' })
    }

}
export async function getReservationById(req, res) {
    const id = req.params.id

    const reservations = await knex('reservations').where('id', id).first()
    if (!reservations) {
        res.status(404).json({
            success: false,
            error: 'Reservations not Found'
        })
        return
    } else {
        res.status(200).json({
            success: 'true',
            reservations: reservations
        })
    }

}
export async function updateReservation(req, res) {

    try {
        const id = req.params.id
        if (!id) {
            res.status(401).json({
                success: fasle,
                error: 'Id is required'
            })
            return
        }
        const { no_of_guests,
            contact_number,
            contact_name,
            contact_email,
            meal_id } = req.body
        const existingData = await knex('reservations').where('id', id).first()

        if (!existingData) {
            res.status(401).json({
                sucess: false,
                error: 'Reservations with id could not be found'
            })
            return
        }
        await knex('reservations').where("id", id).update({
            no_of_guests,
            contact_number,
            contact_name,
            contact_email,
            createdAt: knex.fn.now(),
            meal_id
        })
        res.status(200).json({
            success: true,
            message: 'Reservation updated successfully',

        })

    } catch (error) {
        res.status(400).json({ success: false, error: 'error Occred' })
    }

}
export async function deleteReservationByID(req, res) {
    try {
        const id = req.params.id
        const itemExists = await knex('reservations').where('id', id).first()

        if (!id || !itemExists) {
            res.status(401).json({
                success: false,
                error: 'Id required to delete and item could not be found'
            })
            return
        }
        await knex('reservations').where('id', id).del()
        res.status(200).json({
            success: true,
            message: 'Deleted Successfully'
        })


    } catch {
        res.status(500).json({
            success: 'false',
            error: "Error Occured "
        })
    }

}