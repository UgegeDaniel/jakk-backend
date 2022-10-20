const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const studentRoutes = require('./routes/studentRoutes')
require('dotenv').config()
//CONSTANTS
const PORT = process.env.PORT
const CONNECTION_STRING = process.env.MONGO_DB_CONNECTION_URI
const app = express();
//ALLOW CROSS ORIGIN REQUEST 
app.use(cors())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});
//NOTIFICATION FOR REQUESTS TO ROUTES
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next();
})
//ROUTES
app.use(express.json());
app.use('/student', studentRoutes)
app.get('/', (req, res) => {
  res.send('Hello World!')
})
//CONNECT TO DB
mongoose.connect(CONNECTION_STRING, { useUnifiedTopology: true, useNewUrlParser: true }).then(() => {
  app.listen(PORT, () => { console.log(`connected to the db successfully and sever running on port ${PORT}`) })
}).catch((error) => {
  console.log(error)
}) 
