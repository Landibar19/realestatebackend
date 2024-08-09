const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/property-controller.js'); // Ensure this path is correct

router.get('/get-properties/:id', propertyController.getPropertyById);
router.get('/get-all-property', propertyController.getAllProperties);
router.get('/properties-by-name/:name', propertyController.getPropertiesByName);
router.get('/property-by-keyword/:q', propertyController.getPropertyByKeyword);
router.put('/update-property/:id', propertyController.updateProperty);
router.post('/add-property', propertyController.addProperty);
router.delete('/delete-property/:id', propertyController.deleteProperty);

module.exports = router;