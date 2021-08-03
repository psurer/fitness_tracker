const path = require('path');
const express = require('express');
const { static } = require('express');
const workoutModel = require('./models');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());


//Routes
app.get('/stats', (req,res)=>{
    res.sendFile(path.join(__dirname, 'public','stats.html'));
});
app.get('/exercise', (req,res)=>{
    res.sendFile(path.join(__dirname, 'public','exercise.html'));
});
app.post('/api/workouts', (req, res) => {
    //We need to create a new workout item in the db
    const newItem = new workoutModel();
    newItem.save((err,result)=>{
        if ( err) {
            res.sendStatus(500, err);
        } else {
            res.send(result);
        }
    });
});

app.get('/api/workouts', (req, res) => {
    //We need to get data from the database using Workout collection
    //The Workout collection is defined in the models.js
    workoutModel.find({},(err, result)=>{
        if (err){
            res.send('Error');
        } else {
            res.send(result);
        }
    });
});

app.put('/api/workouts/:id', (req, res) => {
    workoutModel.findById(req.params.id, (err, item) =>{
        if (err){
            res.sendStatus(500, err);
        } else {
            const exercises = [...item.exercises, {...req.body}]
            workoutModel.findOneAndUpdate(req.params.id,{day: new Date(Date.now()),exercises},{new:true},(err, result)=>{
                if (err){
                    res.send('Error');
                } else {
                    res.send(result);
                }
            });
        }
    });
});

app.get('/api/workouts/range', (req, res) => {
    workoutModel.find({},(err, result)=>{
        if (err){
            console.log('Errors' + err);
            res.send('Error');
        } else {
            console.log(result);
            res.send(result);
        }
    });
});


//Open connection to the database.
mongoose.connect('mongodb://localhost/workout', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});


app.listen(PORT, () => {
    console.log(`server app listening at http://localhost:${PORT}`)
});