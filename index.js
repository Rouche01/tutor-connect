const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
const authRoutes = require('./routes/auth');

//registering middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// registering route middlewares
app.use(authRoutes);

const PORT = 3000 || process.env.PORT;

// connecting to the database and starting the server
const startApp = async () => {
    try {
        await mongoose.connect( process.env.DB_CONNECT, {
            useNewUrlParser: true, useUnifiedTopology: true
        })

        console.log(`Successfully connected with the database`)

        app.listen(PORT, 
            () => console.log(`Server is listening on ${PORT}...`))
        
    } catch(err) {
        console.log(err);
        startApp();
    }
}

startApp();