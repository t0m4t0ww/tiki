const express = require('express');
const router = express.Router();

const ControllerWebsite = require('../controller/controllerWebsite');

router.get('/api/data', ControllerWebsite.GetData);
router.get('/api/getproduct', ControllerWebsite.GetOneProduct);
router.get('/api/search', ControllerWebsite.SearchProduct);
router.post('/api/addproduct', ControllerWebsite.AddProduct);
router.post('/api/deleteproduct', ControllerWebsite.DeleteProduct);
module.exports = router;
