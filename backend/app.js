const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce')
const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);


//connection to the Mongodb database
mongoose.connect("mongodb://adri:hottakes2610@cluster0-shard-00-00.iimn8.mongodb.net:27017,cluster0-shard-00-01.iimn8.mongodb.net:27017,cluster0-shard-00-02.iimn8.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-82n6tr-shard-0&authSource=admin&retryWrites=true&w=majority",
{ useNewUrlParser: true,
    useUnifiedTopology: true })
    .then(()=> console.log('successfuly connected to Mongodb'))
    .catch(err => console.log('fail to connect to mongodb'))

module.exports = app;