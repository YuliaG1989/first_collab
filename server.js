const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Moneky = require('./models/monkeys.js')

const app = express();

app.use(express.json());
app.use(cors());
