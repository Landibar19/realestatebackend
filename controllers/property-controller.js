const { PropertyModel } = require('../models/property.js');

const getPropertyById = async (req, res) => {
    const properties = await PropertyModel.findOne({ _id: req.params.id });
    if (!properties) {
        res.status(404).send('No properties found');
        return;
    }

    res.status(200).json({
        message: 'Properties found',
        properties: properties
    });
};

const getAllProperties = async (req, res) => {
    const properties = await PropertyModel.find();

    if (!properties) {
        res.status(404).send("No properties found");
        return;
    }

    if (properties.length === 0) {
        res.status(404).send('No properties on database');
        return;
    }
    res.status(200).json({
        properties: properties
    });
};

const getPropertiesByName = async (req, res) => {
    const properties = await PropertyModel.find({ title: req.params.name});
    
    if (!properties) {
        res.status(404).send('No properties found with this name');
        return;
    }
    res.status(200).json({
        message: 'Properties found',
        properties: properties
    });

};

const getPropertyByKeyword = async (req, res) => {
    const properties = await PropertyModel.find({title:{'$regex': req.params.q, "$options": "i"}});
    
    if (!properties) {
        res.status(404).send('No properties found on database');
        return;
    }
    if (properties.length === 0) {
        res.status(404).send('No properties found with this keyword');
        return;
    }
    res.status(200).json({
        message: 'Properties found',
        properties: properties
    });
};

const updateProperty = async (req, res) => {
    const updatedProperty = await PropertyModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    console.log(updatedProperty)
    if (!updatedProperty) {
        res.status(404).send('No properties found');
        return;
    }

    res.status(200).json({
        message: 'Property updated successfully',
        property: updatedProperty
    });
};

const addProperty = async (req, res) => {
    const { image, title, description, address, price, status, beds, baths, sqft } = req.body;

    if (!image) {
        res.status(400).send('Image is required');
        return;
    }
    if (!title) {
        res.status(400).send('Title is required');
        return;
    }
    if (!description) {
        res.status(400).send('Description is required');
        return;
    }
    if (!address) {
        res.status(400).send('Address is required');
        return;
    }
    if (!price) {
        res.status(400).send('Price is required');
        return;
    }
    if (!status) {
        res.status(400).send('Status is required');
        return;
    }
    if (!beds) {
        res.status(400).send('Beds is required');
        return;
    }
    if (!baths) {
        res.status(400).send('Baths is required');
        return;
    }
    if (!sqft) {
        res.status(400).send('Sqft is required');
        return;
    }

    const newProperty = new PropertyModel({ image, title, description, address, price, status, beds, baths, sqft });

    try {
        const savedProperty = await newProperty.save();
        res.status(201).json({
            message: 'Property added successfully',
            property: savedProperty,
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error adding property',
            error: error.message,
        });
    }
};

const deleteProperty = async (req, res) => {
    const deleteProperty = await PropertyModel.findByIdAndDelete(req.params.id);
    if (!deleteProperty) {
        res.status(404).send('No properties found');
        return;
    }

    res.status(200).json({
        message: 'Property deleted successfully',
        property: deleteProperty
    });
};

module.exports = {
    getPropertyById,
    getAllProperties,
    getPropertiesByName,
    getPropertyByKeyword,
    updateProperty,
    addProperty,
    deleteProperty
};