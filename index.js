const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/category');
const subjectRoutes = require('./routes/subject');
const lessonRoutes = require('./routes/lesson');
const tutorRoutes = require('./routes/tutor');

//registering middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.send("Welcome to the API for Tutors Connect");
})

// registering route middlewares
app.use('/api/v1', authRoutes);
app.use('/api/v1', categoryRoutes);
app.use('/api/v1', subjectRoutes);
app.use('/api/v1', lessonRoutes);
app.use('/api/v1', tutorRoutes);

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
