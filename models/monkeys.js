const mongoose = require('mongoose');

const monkeysSchema = new mongoose.Schema({
    name: String,
    species: String,
    order: String,
    family: String,
    description: String,
    image: String

})

const Monkey = mongoose.model('Monkey', monkeysSchema);

module.exports = Monkey;
