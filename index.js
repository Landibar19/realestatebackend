const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const dbCred= require('./cred.js');
const propertyRouter = require('./routes/property-routes.js');

const connectionString= `mongodb+srv://${dbCred.dbUser}:${dbCred.dbPassword}@cluster0.o7mda2q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`


const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect(connectionString)
        .then(() =>console.log('databaza u lidh'))
        .catch(err => console.log('nUk u lidh databaza', err));

app.use('/properties',propertyRouter);

app.listen(3001, () => {
    console.log('Serveri eshte i gatshem ne portin 3001')});