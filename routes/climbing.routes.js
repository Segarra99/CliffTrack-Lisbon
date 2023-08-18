const express = require('express');
const router = express.Router();
const ClimbingRoute = require('../models/ClimbingRoute.model');
const User = require('../models/User.model');
const Review = require('../models/Review.model');
const fileUploader = require('../config/cloudinary.config');
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
function setLayout(req, res, next) {
  if (req.session.currentUser) {
      res.locals.layout = 'layoutWithUser'; // Layout for logged-in users
  } else {
      res.locals.layout = 'layoutWithoutUser'; // Layout for non-logged-in users
  }
  next();
}

router.use(setLayout);

// This is the route for the home page ("/")
router.get("/", async (req, res) => {
  res.render("home", { title: "Welcome to My App" });
});
router.get("/list", async(req, res, next) => {
    try{
        let routesDb = await ClimbingRoute.find()
        let user = null;
        if (req.session.currentUser){
          user = await User.findById(req.session.currentUser._id);
        }
        res.render("climbing/list", {routes: routesDb, user});
    }
    catch(error){
        console.log(error);
    }
});

router.get('/list/create', isLoggedIn, (req,res)=>{
    res.render('climbing/create');
});

router.post('/list/create', isLoggedIn, fileUploader.array('climbing-route-pictures'), async(req,res)=>{
    const {name, grade, description, equipment} = req.body;
    const user = req.session.currentUser;
    try{
        await ClimbingRoute.create({name, grade, description, pictures: req.files.map(file => file.path), equipment, user});
        res.redirect('/list');
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
    if(!user.favorites.includes(chosenRoute)){
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

router.get('/list/:id/edit', isLoggedIn, async(req,res)=>{ 
    try{
        const {id} = req.params;
        let chosenRoute = await ClimbingRoute.findById(id);
        const equipmentArray = ['Rope', 'Harness', 'Crashpad']
        res.render('climbing/edit', {route: chosenRoute, allEquipments: equipmentArray});
    }
    catch(error){
        console.log(error);
    }
})
  
router.post('/list/:id/edit', isLoggedIn, fileUploader.array('climbing-route-pictures'), async (req, res) => {
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


router.get('/edit/pictures/:id', isLoggedIn, async (req, res) =>{
  try {
    const {id} = req.params
    const climbing = await ClimbingRoute.findById(id)
    res.render('climbing/pictures', climbing)
  } catch (error) {
    console.log(error)
  }
})

router.get('/deletePictures/:id', isLoggedIn, async (req, res) => {
  try {
      const { id } = req.params;
      let { imgUrl } = req.query;
      
      if (!Array.isArray(imgUrl)) {
          // If only one image is selected, convert it to an array for consistency
          imgUrl = [imgUrl];
      }

      await ClimbingRoute.findByIdAndUpdate(id, {
          $pull: { pictures: { $in: imgUrl } }
      });
      
      res.redirect(`/list/${id}/edit`);
  } catch (error) {
      console.log(error);
  }
});

router.post('/deletePicture/:id', isLoggedIn, async (req, res) => {
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

router.post('/list/:id/delete', isLoggedIn, async(req,res)=>{
  try{
    const {id} = req.params;
    await ClimbingRoute.findByIdAndDelete(id);
    res.redirect('/list');
    }
    catch(error){
        console.log(error);
    }
});

router.post('/review/create/:routeId', isLoggedIn, fileUploader.single('review-picture'), async(req,res)=>{
try {
  const {routeId} = req.params;
  const {content, user} = req.body;
  const route = await ClimbingRoute.findById(routeId);
  const newReview = await Review.create({content, picture: req.file.path, user, route});
  const reviewUser = await User.findById(req.session.currentUser._id);
  const userId = reviewUser._id;
  await ClimbingRoute.findByIdAndUpdate(routeId, {$push: {reviews: newReview}});
  await User.findByIdAndUpdate(userId, {$push: {reviews: newReview}});
  res.redirect(`/list/${routeId}`);
} 
catch(error){
  console.log(error);
}
});

router.post('/review/delete/:reviewId', isLoggedIn, async(req,res)=>{
  const {reviewId} = req.params;
  try {
    const removedReview = await Review.findById(reviewId);
    await removedReview.populate('route');
    const currentRoute = removedReview.route[0]._id;
    await User.findByIdAndUpdate(removedReview.user._id,{$pull: {reviews: removedReview._id}});
    await Review.findByIdAndDelete(removedReview._id);
    res.redirect(`/list/${currentRoute}`);
  } 
  catch(error){
    console.log(error);
  }
});

router.post('/review/delete/:reviewId/profile', isLoggedIn, async(req,res)=>{
  const {reviewId} = req.params;
  try {
    const removedReview = await Review.findById(reviewId);
    await removedReview.populate('route');
    await User.findByIdAndUpdate(removedReview.user._id,{$pull: {reviews: removedReview._id}});
    let user = await User.findById(removedReview.user._id);
    let userId = user._id;
    await Review.findByIdAndDelete(removedReview._id);
    res.redirect(`/profile/${userId}`);
  } 
  catch(error){
    console.log(error);
  }
});

router.get('/list/:id', async(req,res)=>{
  try{
    const {id} = req.params;
    let chosenRoute = await ClimbingRoute.findById(id);
    let isFavorite = false;
    let user = null;
    if (req.session.currentUser){
      user = await User.findById(req.session.currentUser._id);
      isFavorite = user.favorites.includes(chosenRoute._id);
    }
    await chosenRoute.populate('reviews user');
    await chosenRoute.populate({
      path:'reviews',
      populate:{
        path: 'user',
        model: 'User'
      }
    });
    let isUserEqual = false;  // Initialize as false by default

        if (user && chosenRoute.user) {
            isUserEqual = user._id.toString() === chosenRoute.user._id.toString();
        }
    res.render('climbing/info', {route: chosenRoute, user, isFavorite, isUserEqual});
  }
  catch(error){
    console.log(error);
  }
});

module.exports = router;