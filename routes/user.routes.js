const express = require('express');
const router = express.Router();
const ClimbingRoute = require('../models/ClimbingRoute.model');
const User = require('../models/User.model');
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


router.get("/profile", isLoggedIn, async(req, res) => {
    try{
        let user = await User.findById(req.session.currentUser._id);
        await user.populate('favorites reviews');
        await user.populate({
            path:'reviews',
            populate:{
              path: 'route',
              model: 'ClimbingRoute'
            }
        });
        await user.populate({
            path:'reviews',
            populate:{
              path: 'user',
              model: 'User'
            }
        });
        let profileUser = user
        res.render("user/profile", {user, profileUser});
    } 
    catch(error){
        console.log(error);
    }
});


router.get("/profile/edit", isLoggedIn, async(req,res)=>{
    try {
        let user = await User.findById(req.session.currentUser._id);
        await user.populate('favorites reviews');
        await user.populate({
            path:'reviews',
            populate:{
              path: 'route',
              model: 'ClimbingRoute'
            }
        });
        res.render('user/edit', {user: user});
    } 
    catch(error){
        console.log(error);
    }
})

router.post("/profile/edit", isLoggedIn, fileUploader.single('profile-picture'), async(req,res)=>{
    try {
        let {username, picture} = req.body;
        let user = await User.findById(req.session.currentUser._id);
        await User.findByIdAndUpdate(user._id, {username, picture});
        res.redirect('/profile');
    } 
    catch(error){
        console.log(error);
    }
})

router.get("/profile/:id", async(req, res) => {
    try{
        let {id} = req.params;
        let user = null;
        if (req.session.currentUser){
        user = await User.findById(req.session.currentUser._id);
        }
        let profileUser = await User.findById(id);
        await profileUser.populate('favorites reviews');
        await profileUser.populate({
            path:'reviews',
            populate:{
              path: 'route',
              model: 'ClimbingRoute'
            }
        });
        await profileUser.populate({
            path:'reviews',
            populate:{
              path: 'user',
              model: 'User'
            }
        });
        res.render("user/profile", {user, profileUser});
    } 
    catch(error){
        console.log(error);
    }
});

module.exports = router;