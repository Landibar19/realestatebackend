require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const dbCred = require('./cred.js');
const propertyRouter = require('./routes/property-routes.js');


const connectionString = `mongodb+srv://${dbCred.dbUser}:${dbCred.dbPassword}@cluster0.o7mda2q.mongodb.net/realestate?retryWrites=true&w=majority&appName=Cluster0`;

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev')); 

mongoose.connect(connectionString)
    .then(() => console.log('Database u lidh me suksess'))
    .catch(err => console.log('Lidhja me database deshtoi', err));

app.use('/properties', propertyRouter);

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});