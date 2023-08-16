const express = require('express');
const router = express.Router();
const ClimbingRoute = require('../models/ClimbingRoute.model');
const User = require('../models/User.model');
const Review = require('../models/Review.model');
const fileUploader = require('../config/cloudinary.config');
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");


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

router.get('/list/:id', async(req,res)=>{
  try{
    const {id} = req.params;
    let chosenRoute = await ClimbingRoute.findById(id);
    const users = await User.find();
    await chosenRoute.populate('reviews user');
    await chosenRoute.populate({
      path:'reviews',
      populate:{
        path: 'user',
        model: 'User'
      }
    });
    res.render('climbing/info', {route: chosenRoute, users});
  }
  catch(error){
    console.log(error);
  }
});

router.post('/favorites/:id', isLoggedIn, async(req,res)=>{
  try {
    const {id} = req.params;
    let chosenRoute = await ClimbingRoute.findById(id);
    const user = await User.findById(req.session.currentUser._id);
    if(!user.favorites.includes(chosenRoute._id)){
      user.favorites.push(chosenRoute);
      await user.save();
    }
    res.redirect(`/list/${id}`);
  } 
  catch(error){
    console.log(error);
  }
});

router.post('/favorites/:id/remove', isLoggedIn, async(req,res)=>{
  try{
    const {id} = req.params;
    let chosenRoute = await ClimbingRoute.findById(id);
    const user = await User.findById(req.session.currentUser._id);
    const routeIndex = user.favorites.indexOf(chosenRoute._id);
    if(routeIndex !== -1){
      user.favorites.splice(routeIndex, 1);
      await user.save();
    }
    res.redirect(`/list/${id}`);
  } catch(error){
    console.log(error);
  }
})

router.get('/list/:id/edit', async(req,res)=>{ 
    try{
        const {id} = req.params;
        let chosenRoute = await ClimbingRoute.findById(id);
        const equipmentArray = ['rope', 'harness', 'crashpad']
        res.render('climbing/edit', {route: chosenRoute, allEquipments: equipmentArray});
    }
    catch(error){
        console.log(error);
    }
})
  
router.post('/list/:id/edit', fileUploader.array('climbing-route-pictures'), async (req, res) => {
  const { id } = req.params;
  let { name, grade, description, equipment } = req.body;

  if(!equipment){
    equipment = [];
  }

  try {
    await ClimbingRoute.findByIdAndUpdate(id, { name, grade, description, equipment }, { new: true });
      
    if (req.files && req.files.length > 0) {
      await ClimbingRoute.findByIdAndUpdate(id, {
        $push: {pictures: req.files.map(file => file.path)}
      })
    }
    res.redirect(`/list/${id}`);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error updating climbing route');
    }
});


router.get('/edit/pictures/:id', async (req, res) =>{
  try {
    const {id} = req.params
    const climbing = await ClimbingRoute.findById(id)
    res.render('climbing/pictures', climbing)
  } catch (error) {
    console.log(error)
  }
})


router.post('/deletePicture/:id', async (req, res) => {
  try {
    const {id} = req.params
    const {imgUrl} = req.body
    await ClimbingRoute.findByIdAndUpdate(id, {
      $pull: {pictures: imgUrl}
    })
    res.redirect(`/list/${id}/edit`);
  } catch (error) {
    console.log(error)
  }
})

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

router.post('/review/create/:routeId', async(req,res)=>{
try {
  const {routeId} = req.params;
  const {content, picture, user} = req.body;
  const newReview = await Review.create({content, picture, user});
  const routeUpdate = await ClimbingRoute.findByIdAndUpdate(routeId, {$push: {reviews: newReview._id}});
  const userUpdate = await User.findByIdAndUpdate(user, {$push: {reviews: newReview._id}});
  res.redirect(`/list/${routeId}`);
} 
catch(error){
  console.log(error);
}
});

router.post('/review/delete/:reviewId', async(req,res)=>{
  const {reviewId} = req.params;
  try {
    const removedReview = await Review.findByIdAndUpdate(reviewId);
    await User.findByIdAndUpdate(removedReview.user,{$pull: {reviews: removedReview._id}});
    await Review.findByIdAndDelete(removedReview._id);
    res.redirect('/list');
  } 
  catch(error){
    console.log(error);
  }
});

module.exports = router;