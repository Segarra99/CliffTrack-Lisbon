const express = require('express');
const router = express.Router();
const ClimbingRoute = require('../models/ClimbingRoute.model');
const fileUploader = require('../config/cloudinary.config');

router.get("/list", async(req, res, next) => {
    try{
        let routesDb = await ClimbingRoute.find()
        res.render("climbing/list", {routes: routesDb});
    }
    catch(error){
        console.log(error);
    }
});

router.get('/list/create', (req,res)=>{
    res.render('climbing/create');
});

router.post('/list/create', fileUploader.array('climbing-route-pictures'), async(req,res)=>{
    const {name, grade, description, equipment} = req.body;
    console.log(req.body);
    try{
        await ClimbingRoute.create({name, grade, description, pictures: req.files.map(file => file.path), equipment});
        res.redirect('/list');
    }
    catch(error){
        console.log(error);
    }
});

router.get('/list/:id', async(req,res)=>{
  try{
    const {id} = req.params;
    let chosenRoute = await ClimbingRoute.findById(id);
    res.render('climbing/info', {route: chosenRoute});
  }
  catch(error){
    console.log(error);
  }
});

router.get('/list/:id/edit', async(req,res)=>{ 
    try{
        const {id} = req.params;
        let chosenRoute = await ClimbingRoute.findById(id);
        res.render('climbing/edit', {route: chosenRoute});
    }
    catch(error){
        console.log(error);
    }
})

router.post('/list/:id/edit', fileUploader.array('climbing-route-pictures'), async (req, res) => {
    const { id } = req.params;
    const { name, grade, description, existingPictures, equipment, deletePictures } = req.body;
  
    // If there are new uploaded pictures, add them to the 'pictures' array
    let pictures = existingPictures || [];
    if (req.files) {
      pictures = pictures.concat(req.files.map(file => file.path));
    }
  
    // Remove selected pictures marked for deletion
    if (deletePictures) {
      for (const pictureUrl of deletePictures) {
        // Remove the picture URL from the 'pictures' array
        pictures = pictures.filter(picture => picture !== pictureUrl);
  
        // You might also want to delete the actual file from your storage here
        // Use the 'fs' module to delete the file associated with 'pictureUrl'
      }
    }
  
    try {
      await ClimbingRoute.findByIdAndUpdate(id, { name, grade, description, pictures, equipment }, { new: true });
      res.redirect('/list');
    } catch (error) {
      console.log(error);
      res.status(500).send('Error updating climbing route');
    }
  });
  
router.post('/list/:id/delete', async(req,res)=>{
  try{
    const {id} = req.params;
    await ClimbingRoute.findByIdAndDelete(id);
    res.redirect('/list');
    }
    catch(error){
        console.log(error);
    }
});

module.exports = router;