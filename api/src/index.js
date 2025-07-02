import dotenv from 'dotenv'
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { mealRouter } from './routers/meals.js';
import { reservationsRouter } from './routers/reservations.js';
import { reviewRouter } from './routers/reviews.js';

dotenv.config()
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(mealRouter)
app.use(reservationsRouter)
app.use(reviewRouter)
/* response with hello */
app.get('/', (req, res) => {
  res.send('Hello Again')
})

app.listen(process.env.PORT, () => {
  console.log(`API listening on port ${process.env.PORT}`);
});
