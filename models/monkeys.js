const mongoose = require('mongoose');

const monkeysSchema = new mongoose.Schema({
    name: String,
    species: String,
    image: String,
    
})

const Monkey = mongoose.model('Monkey', monkeysSchema);

module.exports = Monkey;
