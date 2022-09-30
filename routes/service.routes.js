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

//  GET /api/services -  Retrieves all of the services
router.get("/services", (req, res, next) => {
  Service.find()
    .populate("tasks")
    .then((allServices) => res.json(allServices))
    .catch((err) => res.json(err));
});

//  GET /api/services/:serviceId -  Retrieves a specific service by id
router.get("/services/:serviceId", (req, res, next) => {
  const { serviceId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(serviceId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
});

// PUT  /api/services/:serviceId  -  Updates a specific service by id
router.put("/services/:serviceId", (req, res, next) => {
  const { serviceId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(serviceId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Service.findByIdAndUpdate(serviceId, req.body, { new: true })
    .then((updatedService) => res.json(updatedService))
    .catch((error) => res.json(error));
});

// DELETE  /api/services/:serviceId  -  Deletes a specific service by id
router.delete("/services/:serviceId", (req, res, next) => {
  const { serviceId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(serviceId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Service.findByIdAndRemove(serviceId)
    .then(() =>
      res.json({
        message: `Service with ${serviceId} is removed successfully.`,
      })
    )
    .catch((error) => res.json(error));
});


module.exports = router;