
import knex from '../database_client.js'


export async function getallReviews(req, res) {

    const reviews = await knex('reviews')

    if (!reviews) {
        res.status(404).json({
            success: false,
            error: 'Reviews not Found'
        })
        return
    } else {
        res.status(200).json({
            success: 'true',
            reviews
        })
    }

}

export async function getReviewsbyMealId(req, res) {
    const meal_id = req.params.meal_id


    try {
        const reviews = await knex('reviews').where({ meal_id: parseInt(meal_id) }).select('title', 'description', 'stars', 'createdAt')
        res.status(200).json({
            success: true, reviews
        })

    } catch (error) {

        res.status(500).json({ success: false, error: error || 'Failed to fetch reviews' });
    }
}
export async function addReview(req, res) {

    try {
        const { title,
            description,
            stars,
            meal_id } = req.body



        const meal = await knex('meal').where({ id: meal_id }).first()
        if (!meal) {
            res.status(404).json({ success: false, error: 'meal Not found' })
            return
        }



        await knex('reviews').insert({
            title,
            description,
            stars,
            createdAt: knex.fn.now(),
            meal_id
        })

        res.status(200).json({
            success: true,
            message: 'Review added successfully'
        })


    } catch (error) {

        res.status(500).json({ success: false, error: error || 'error Occred' })
    }

}
