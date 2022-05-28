require('dotenv').config();

const express = require('express')
const app = express();

const morgan = require('morgan') // use morgan for logging
const cors = require('cors')

// routes
const restaurantRouter = require('./routes/restaurantRoutes')

// to make sure we can get json in req.body
app.use(express.json())
app.use(cors())
app.use(morgan('dev')) // use morgan for logging

app.use('/api/v1/restaurants', restaurantRouter);

const port = process.env.PORT || 3001;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
