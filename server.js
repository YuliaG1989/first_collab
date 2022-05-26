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

    })
})

app.get('/monkey', (req, res) => {
    Monkey.find({}, (err, monkeyHome) => {
        res.json(monkeyHome)
    })
})

app.delete('/monkey/:id', (req, res)=>{
    Monkey.findByIdAndRemove(req.params.id, (err, deletedMonkey)=>{
        res.json(deletedMonkey)
    })
})

app.put('/monkey/:id', (req,res)=>{
    Monkey.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedMonkey)=>{
        res.json(updatedMonkey)
    })

   })

app.listen(3000, () => {
    console.log('listening...');
})

mongoose.connect('mongodb://localhost:27017/merncrud')
mongoose.connection.once('open', () => {
    console.log('connected to mongod...');
})
