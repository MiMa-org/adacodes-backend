const router = require("express").Router();
const mongoose = require('mongoose');
 
const Service = require('../models/Service.model');
const fileUploader = require("../config/cloudinary.config");
const cors = require('cors');



//  POST /api/services  - creates a new service 
router.post('/services', (req, res, next) => {
  const { name, category, street, streetNr, complement, zip, website, email, phone, description, imageUrl, isApproved, latitude, longitude, date, time } = req.body;
 console.log(req.body)
  Service.create( req.body )
    .then(response => res.json(response))
    .catch(err => res.json(err));
});


//  GET /api/services -  Retrieves all of the services
router.get("/services", (req, res, next) => {
  Service.find()
    .then((allServices) => res.json(allServices))
    .catch((err) => res.json(err));
});

// POST "/api/upload" => Route that receives the image, sends it to Cloudinary via the fileUploader and returns the image URL
router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
  // console.log("file is: ", req.file)
 
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  
  // Get the URL of the uploaded file and send it as a response.
  // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend
  
  res.json({ fileUrl: req.file.path });
});

//  GET /api/services/:serviceId -  Retrieves a specific service by id
router.get("/services/:serviceId", (req, res, next) => {
  const { serviceId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(serviceId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Service.findById(serviceId)
  .then((oneService) => res.json(oneService))
  .catch((error) => res.json(error));
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