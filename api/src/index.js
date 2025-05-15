import dotenv from 'dotenv'
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import knex from './database_client.js';

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

app.use("/api", apiRouter);
const getFutureMeals = async (req, res) => {
  const query = `
 select * from meal 
  where \`when\`> now();
  `;
  const meals = await knex.raw(query);
  res.json({
    message: 'All meals in the future where and when',
    data: meals[0]
  })
}
const getPastMeals = async (req, res) => {
  const query = `
   select * from meal 
  where \`when\`> now();
  `;
  const meals = await knex.raw(query);
  res.json({
    message: "Past meals when datetime",
    data: meals[0]
  })
}
const getAllMeals = async (req, res) => {
  const query = `
  select * from meal ;
  `;
  const meals = await knex.raw(query);
  res.json({
    message: "Past meals when datetime",
    data: meals[0]
  })
}
const getFirstMealbyID = async (req, res) => {
  const query = `
  select * from meal  limit 1 ;
  `;
  /* asumming id is number starting from 1  */

  const meals = await knex.raw(query);

  res.json({
    message: 'first meal with id',
    data: meals[0]
  })
}
const getLastMealByID = async (req, res) => {
  const { id } = req.query
  /* query id from client and get from id in qury  in server*/
  /*  */
  const query = `
  select * from meal order by id desc limit 1 ;
  `;
  const meals = await knex.raw(query);

  res.send({
    message: "Gettign Last Meal",
    data: meals[0]
  })
}

apiRouter.get('/future-meals', getFutureMeals)
apiRouter.get('/all-meals', getAllMeals)
apiRouter.get('/past-meals', getPastMeals)
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
