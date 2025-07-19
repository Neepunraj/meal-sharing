
import cloudinary from '../config/cloudinary.js'
import knex from '../database_client.js'

/* slugify */
const slugify = (text, maxLength = 70) => {
    const slug = text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/--+/g, '-')
        .slice(0, maxLength)
        .replace(/-+$/, '');

    return slug;
};

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
        // Extract query params
        const {
            title,
            maxPrice,
            dateAfter,
            dateBefore,
            availableReservations,
            page = 1,
            limit = 10,
            sortKey = 'createdAt',
            sortDir = 'desc',
        } = req.query;

        const skip = (Number(page) - 1) * Number(limit);
        const validSortKeys = ['price', 'when', 'max_reservations', 'createdAt'];
        const sortBy = validSortKeys.includes(sortKey) ? sortKey : 'createdAt';
        const sortOrder = sortDir === 'asc' ? 'asc' : 'desc';


        const query = knex('meal').select('*');


        if (title) {
            query.whereILike('title', `%${title}%`);
        }

        if (maxPrice) {
            query.andWhere('price', '<=', Number(maxPrice));
        }

        if (dateAfter) {
            query.andWhere('when', '>', dateAfter);
        }

        if (dateBefore) {
            query.andWhere('when', '<', dateBefore);
        }

        if (availableReservations === 'true') {
            query.andWhereRaw(`
        max_reservations > (
          SELECT COUNT(*) FROM reservation WHERE reservation.meal_id = meal.id
        )
      `);
        } else if (availableReservations === 'false') {
            query.andWhereRaw(`
        (
          SELECT COUNT(*) FROM reservation WHERE reservation.meal_id = meal.id
        ) >= meal.max_reservations
      `);
        }

        const countQuery = query.clone().clearSelect().count('* as count');

        query.limit(Number(limit)).offset(skip).orderBy(sortBy, sortOrder);

        const [meals, [{ count }]] = await Promise.all([
            query,
            countQuery
        ]);
        res.status(200).json({
            success: true,
            meals,
            page,
            limit,
            totalMeals: count,
            totalPages: Math.ceil(count / limit),

        });

    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}
export async function addMeals(req, res) {

    try {
        const { title, description,
            location, when, max_reservations, price,
        } = req.body
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
            createdAt: fn.now(), imgUrl: imgSrcs, slug: slugify(title)
        })
        res.status(200).json({
            success: true,
            message: 'meal added successfully'
        })


    } catch (error) {
        res.status(500).json({ success: false, error: error || 'error Occred' })
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
                success: false,
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
        res.status(400).json({ success: false, error: error || 'error Occred' })
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
            error: error || "Error Occured "
        })
    }

}