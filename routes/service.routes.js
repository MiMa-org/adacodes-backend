const router = require("express").Router();
 
const mongoose = require('mongoose');
 
const Service = require('../models/Service.model');
 
//  POST /api/services  - creates a new service 
router.post('/services', (req, res, next) => {
  const { name, category, street, streetNr, complement, zip, website, email, phone, description, picture } = req.body;
 
  Service.create({ name, category, street, streetNr, complement, zip, website, email, phone, description, picture })
    .then(response => res.json(response))
    .catch(err => res.json(err));
});
 
module.exports = router;