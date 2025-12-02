// PART 1: express (framework)
// import express framework

const express = require('express')

// declare an express instance (web app)
const app = express()

//PART 2: MONGOOSE (database)
//import mongoose library
const mongoose = require('mongoose')

// declare database connection string(URI)
const DATABASE_URI = "mongodb://localhost:27017/vocab-builder"

//connect to database
mongoose.connect(DATABASE_URI)
//1: connect succeed
.then(() => console.log('Connect to DB succeed !'))

//2: connect failed
.catch((err) => console.error('Connect to DB failed !' + err))

//3. parser (input) - get the input from client's request
app.use(express.json())

//4. cors ( without cors frontend can't call API)
const cors = require('cors')


//option1: enable cors for all clients 
//app.use(cors())

//option 2: enable cors for specific client

const corsOption = {
    // //A: only 1 origin (url)
     origin: 'http://localhost:8080', // Allow only this origin

    //B: many origins 
    optionSuccessStatus: 200  // for legacy browser support
};

app.use(cors(corsOption));

//5.  route
// impport router
const route = require('./api/routes/vocabRoute')
//register router
route(app)

//6. start server
//declare server port  ( 3000 is default port in Express/node)
const PORT = 3000
//listen to port to start server
app.listen(PORT, () => {
    console.log('Server is running at port ' + PORT)
})