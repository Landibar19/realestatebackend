const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
    image:{type : String, required: true},
    title: {type: String, required: true},
    description : {type: String, required: true},
    address: {type: String, required: true},
    price: {type: Number, required: true},
    status: {type: String, required: true},
    beds: {type: Number, required: true},
    baths: {type: Number, required: true},
    sqft: {type: Number, required: true},
})

const propertyModel = mongoose.model('properties', PropertySchema);

module.exports = {propertyModel}