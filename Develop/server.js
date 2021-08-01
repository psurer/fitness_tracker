const path = require('path');
const express = require('express');
const { static } = require('express');
const workoutCollection = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));

//Routes

app.use('/api/workouts', (req, res) => {
    //We need to get data from the database using Workout collection
    //The Workout collection is defined in the models.js
    workoutCollection.find({},(err, result)=>{
        if (err){
            console.log('Errors' + err);
            res.send('Error');
        } else {
            console.log(result);
            res.send(result);
        }
    });
});


app.listen(PORT, () => {
    console.log(`server app listening at http://localhost:${PORT}`)
});