
import cloudinary from '../config/cloudinary.js'
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
export async function getMEalsByQuery(req, res) {
    try {
        const { maxPrice,
            availableReservations,
            title,
            dateAfter,
            dateBefore,
            limit,
            sortKey,
            sortDir, } = req.query
        let query = knex('meal').select('*')

        /* filetering Methods */
        if (maxPrice) {
            query.where('price', '<=', Number(maxPrice))
        }
        if (title) {
            query.where('title', 'like', `%${title}%`)

        }
        if (dateAfter) {
            query.where('when', '>', dateAfter)

        }
        if (dateBefore) {
            query.where('when', '>', dateBefore)

        }
        if (availableReservations === 'true') {
            query.whereRaw(
                'max_reservations > (SELECT COUNT(*) FROM reservation WHERE reservation.meal_id = meal.id)'
            );
        } else if (availableReservations === 'false') {
            query.whereRaw(
                `(
       SELECT COUNT(*)
       FROM reservation
       WHERE reservation.meal_id = meal.id
     ) >= meal.max_reservations`
            );
        }
        const validSortKeys = ['price', 'when', 'max_reservations'];
        if (sortKey && validSortKeys.includes(sortKey)) {
            const direction = sortDir === 'desc' ? 'desc' : 'asc';
            query.orderBy(sortKey, direction);
        }
        if (limit) {
            query.limit(Number(limit));
        }

        const meals = await query;
        if (meals.length === 0) {
            return res.status(200).json({ message: 'No meals found', data: [] });
        }
        res.json(meals);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" })
    }
}
export async function addMeals(req, res) {

    try {
        const { title, description,
            location, when, max_reservations, price,
            createdAt } = req.body
        const existingData = await knex('meal').where('title', title)
        const files = req.files
        const uploadPromises = files.map(file => cloudinary.uploader.upload(file.path, { folder: 'mealphoto' }))
        const uploadResults = await Promise.all(uploadPromises)
        const imgSrcs = uploadResults.map(result => result.secure_url)
        if (existingData && existingData.length > 0) {
            res.status(401).json({
                success: false,
                error: 'Meal already exists Please avoid dublication'
            })
            return
        }
        await knex('meal').insert({
            title, description,
            location, when, max_reservations, price,
            createdAt, imgUrl: imgSrcs
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
    const meal = await knex('meal').where('id', id).first()
    if (!meal) {
        res.status(404).json({
            success: false,
            error: 'Meals not Found'
        })
        return
    } else {
        res.status(200).json({
            success: 'true',
            meal: meal
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
        } = req.body
        const existingData = await knex('meal').where('id', id).first()
        const formatedDate = new Date(when)
        if (!existingData) {
            res.status(401).json({
                sucess: false,
                error: 'Meal with id could not be found'
            })
            return
        }
        const data = await knex('meal').where("id", id).update({
            title, description,
            location, when: formatedDate, max_reservations, price,

        })
        res.status(200).json({
            success: true,
            message: 'meal updated successfully',
            data

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


    } catch (error) {
        res.status(500).json({
            success: 'false',
            error: "Error Occured "
        })
    }

}