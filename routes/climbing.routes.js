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
    try{
        await ClimbingRoute.create({name, grade, description, pictures: req.files.map(file => file.path), equipment});
        res.redirect('/list');
    }
    catch(error){
        console.log(error);
    }
});

module.exports = router;