import dotenv from 'dotenv'
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import getFutureMealsTry from './database_client';

dotenv.config()
const app = express();
app.use(cors());
app.use(bodyParser.json());

const apiRouter = express.Router();

// You can delete this route once you add your own routes
/* apiRouter.get("/", async (req, res) => {
  const SHOW_TABLES_QUERY =
    process.env.DB_CLIENT === "pg"
      ? "SELECT * FROM pg_catalog.pg_tables;"
      : "SHOW TABLES;";
  const tables = await knex.raw(SHOW_TABLES_QUERY);
  res.json({ tables });
}); */


// This nested router example can also be replaced with your own sub-router
/* apiRouter.use("/nested", nestedRouter); */
const data = getFutureMealsTry()
console.log(data)
app.use("/api", apiRouter);
const getFutureMeals = async (req, res) => {

  res.json({
    message: 'All meals in the future where and when'
  })
}
const getPastMeals = (req, res) => {
  return res.json({
    message: "Past meals when datetime"
  })
}
const getFirstMealbyID = (req, res) => {
  return res.json({
    message: 'first meal with id'
  })
}
const getLastMealByID = (req, res) => {
  res.send("hello")
}
apiRouter.get('/future-meals', getFutureMeals)
apiRouter.get('past-meals', getPastMeals)
apiRouter.get('/first-meal', getFirstMealbyID)
apiRouter.get('/last-meal', getLastMealByID)
/* response with hello */
apiRouter.get('/', (req, res) => {
  res.send('Hello Again')
})
app.use('/api', apiRouter)
app.listen(process.env.PORT, () => {
  console.log(`API listening on port ${process.env.PORT}`);
});
