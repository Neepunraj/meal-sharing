
import knex from '../database_client.js'


export async function getMeals(req, res) {

    const meals = await knex('meal')

    if (!meals) {
        res.status(404).json({
            success: false,
            error: 'Meals not Found'
        })
        return
    } else {
        res.status(200).json({
            success: 'true',
            meals: meals
        })
    }

}

export async function addMeals(req, res) {

    try {
        const { title, description,
            location, when, max_reservations, price,
            createdAt } = req.body
        const existingData = await knex('meal').where('title', title)

        if (existingData && existingData.length > 0) {
            res.status(401).json({
                sucess: false,
                error: 'Meal already exists Please avoid dublication'
            })
            return
        }
        await knex('meal').insert({
            title, description,
            location, when, max_reservations, price,
            createdAt
        })
        res.status(200).json({
            success: true,
            message: 'meal added successfully'
        })


    } catch (error) {
        res.status(500).json({ success: false, error: 'error Occred' })
    }

}
export async function getMealsbyId(req, res) {
    const id = req.params.id

    const meals = await knex('meal').where('id', id).first()
    if (!meals) {
        res.status(404).json({
            success: false,
            error: 'Meals not Found'
        })
        return
    } else {
        res.status(200).json({
            success: 'true',
            meals: meals
        })
    }

}
export async function updateMeals(req, res) {

    try {
        const id = req.params.id


        if (!id) {
            res.status(401).json({
                success: fasle,
                error: 'Id is required'
            })
            return
        }
        const { title, description,
            location, when, max_reservations, price,
            createdAt } = req.body
        const existingData = await knex('meal').where('id', id).first()

        if (!existingData) {
            res.status(401).json({
                sucess: false,
                error: 'Meal with id could not be found'
            })
            return
        }
        await knex('meal').where("id", id).update({
            title, description,
            location, when, max_reservations, price,
            createdAt
        })
        res.status(200).json({
            success: true,
            message: 'meal updated successfully',

        })

    } catch (error) {
        res.status(400).json({ success: false, error: 'error Occred' })
    }

}
export async function deletMealById(req, res) {
    try {
        const id = req.params.id
        const itemExists = await knex('meal').where('id', id).first()

        if (!id || !itemExists) {
            res.status(401).json({
                success: false,
                error: 'Id required to delete and item could not be found'
            })
            return
        }
        await knex('meal').where('id', id).del()
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