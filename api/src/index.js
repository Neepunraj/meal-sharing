import dotenv from 'dotenv'
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { mealRouter } from './routers/meals.js';
import { reservationsRouter } from './routers/reservations.js';
import { reviewRouter } from './routers/reviews.js';
import { userRouter } from './routers/userRoutes.js';
import job from './config/cron.js';

dotenv.config()
const app = express();
app.use(bodyParser.json());
if (process.env.NODE_ENV === "production") job.start();
const allowedOrigins = ['http://localhost:3000', 'https://meal-sharing-frontend-2kd3.onrender.com/'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use('/api/meals', mealRouter)
app.use('/api/reservations', reservationsRouter)
app.use(reviewRouter)
app.use('/api/auth', userRouter)
/* response with hello */
app.get('/', (req, res) => {
  res.send('Hello Again')
})

app.listen(process.env.PORT, () => {
  console.log(`API listening on port ${process.env.PORT}`);
});
