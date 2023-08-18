const express = require('express');
const router = express.Router();

function setLayout(req, res, next) {
  if (req.session.currentUser) {
      res.locals.layout = 'layoutWithUser'; // Layout for logged-in users
  } else {
      res.locals.layout = 'layoutWithoutUser'; // Layout for non-logged-in users
  }
  next();
}

router.use(setLayout);

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router;