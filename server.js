require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const path = require('path');
const { append } = require('express/lib/response');
const Fruit = require('./models/freshfruit');

const app = express();
app.engine('jsx', require('express-react-views').createEngine());
app.set('view engine', 'jsx');

const MONGO_URI = process.env.MONGO_URI;
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connect(MONGO_URI, CONFIG);

mongoose.connection
    .on('open', () => console.log('Connected to Mongoose'))
    .on('close', () => console.log('Disconnected from Mongoose'))
    .on('error', (error) => console.log(error));

app.use(morgan('tiny'));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static('public'));

app.get('/', (req,res) => {
    res.send('your server is running');
})

// index

app.get('/fruits', (req,res) => {
    Fruit.find({})
        .then((fruits) => {
            res.render("fruits/Index", {fruits});
        })
        .catch((error) => {
            res.status(400).json({error});
        })
})

// seed

app.get('/fruits/seed', (req,res) => {
    // array of starter fruits
    const startFruits = [
        { name: "Orange", color: "orange", readyToEat: true },
        { name: "Grape", color: "purple", readyToEat: false },
        { name: "Banana", color: "yellow", readyToEat: true },
        { name: "Strawberry", color: "red", readyToEat: true },
        { name: "Coconut", color: "brown", readyToEat: false }
    ];

    // Delete all fruits
    Fruit.deleteMany({}).then((data) => {
        // Seed starter fruits
        Fruit.create(startFruits).then((data) => {
            res.json(data);
        })
    })
})

// new

app.get('/fruits/new', (req,res) => {
    res.render('fruits/New')
})

// delete

app.delete('/fruits/:id', (req,res) => {
    Fruit.findByIdAndRemove(req.params.id, (err, deletedFruit) => {
        if(err){
            res.status(400).send(err)
        } else {
            res.redirect('/fruits')
        }
    })
})

// create

app.post('/fruits', (req,res) => {
    Fruit.create(req.body, (err, createdFruit) => {
        if(err){
            res.status(400).send(err)
        } else {
            res.redirect('/fruits')
        }
    })
})


//update

app.put('/fruits/:id', (req,res) => {
    Fruit.findByIdAndUpdate(req.params.id, req.body, (err, updatedFruit) => {
        if(err){
            res.status(400).send(err)
        } else {
            res.redirect(`/fruits/${req.params.id}`)
        }
    })
})

// edit

app.get('/fruits/:id/edit', (req,res) => {
    Fruit.findById(req.params.id, (err, foundFruit) => {
        if(err){
            res.status(400).send(err)
        } else {
            res.render('fruits/Edit', {fruit: foundFruit})
        }
    })
})

// show

app.get('/fruits/:id', (req,res) => {
    Fruit.findById(req.params.id, (err, foundFruit) => {
        if(err){
            res.status(400).send(err);
        } else {
            res.render('fruits/Show', {fruit: foundFruit});
        }
    })
})

app.listen(process.env.PORT, () => console.log('I am alive'))