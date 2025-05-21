import express from 'express'
import { addMeals, deletMealById, getMeals, getMealsbyId, updateMeals } from '../controllers/mealController.js'

export const mealRouter = express.Router()
mealRouter.get('/api/meals', getMeals)
mealRouter.get('/api/meals/:id', getMealsbyId)
mealRouter.post('/api/meals', addMeals)
mealRouter.put('/api/meals/:id', updateMeals)
mealRouter.delete('/api/meals/:id', deletMealById)