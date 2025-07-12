import express from 'express'
import { addMeals, deletMealById, getMeals, getMealsbyId, getMEalsByQuery, updateMeals } from '../controllers/mealController.js'
import { upload } from '../middleware/uploadMiddleWare.js'

export const mealRouter = express.Router()
mealRouter.get('/getmeals', getMEalsByQuery)
mealRouter.get('/allmeals', getMeals)
mealRouter.get('/:id', getMealsbyId)
mealRouter.post('/addmeal', upload.array("images", 5), addMeals)
mealRouter.put('/:id', updateMeals)
mealRouter.delete('/:id', deletMealById)