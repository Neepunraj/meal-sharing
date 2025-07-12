import express from 'express'
import { addReview, getallReviews, getReviewsbyMealId } from '../controllers/reviewController.js'


export const reviewRouter = express.Router()
reviewRouter.get('/api/allreviews', getallReviews)
reviewRouter.get('/api/review/:meal_id', getReviewsbyMealId)
reviewRouter.post('/api/addreview', addReview)
