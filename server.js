const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Monkey = require('./models/monkeys.js')

const app = express();

app.use(express.json());
app.use(cors());

app.post('/monkey', (req, res) => {
    Monkey.create(req.body, (err, createdMonkey) => {
        res.json(createdMonkey)
        res.json('Hello')
    })
})

app.get('/monkey', (req,res) => {
    Monkey.find({}, (err, monkeyHome) => {
        res.json(monkeyHome)
    })
})


app.listen(3000, () => {
    console.log('listening...');
})

mongoose.connect('mongodb://localhost:27017/merncrud')
mongoose.connection.once('open', () => {
    console.log('connected to mongod...');
})
