var express = require('express');
var router = express.Router();

// additional package
var chalk = require('chalk');

// get the User, trip, and destination model
var User = require('../schemas/user');
var Trip = require('../schemas/trip');
var Destination = require('../schemas/destination');


// GET requests

/* GET home page. */
router.get('/', function(req, res, next) {
  // Rendering the index view with the title 'Sign Up'
  res.render('home');
});

/* GET buddy search page */
router.get('/buddy_search', function(req, res, next) {
  // Rendering the index view with the title 'Sign Up'
  res.render('buddy_search');
});

/* GET tabi search page */
router.get('/tabi_search', function(req, res, next) {
  // Rendering the index view with the title 'Sign Up'
  res.render('tabi_search');
});

/* GET view_user page */
router.get('/view_user', function(req, res, next) {
  // Rendering the index view with the title 'Sign Up'
  res.render('user_profile');
});

/* GET add_trip_page */;
router.get('/add_trip_page', function(req, res, next) {
  // Rendering the  index view with the title 'Sign Up'
  res.render('add_trip');
});

/* GET edit_trip_page */
router.get('/edit_trip_page', function(req, res, next) {
  // Rendering the index view with the title 'Sign Up'
  res.render('edit_trip');
});


/* POST like_trip*/
router.post('/like_trip', function(req, res, next) {
  var likedUser = req.body.user_id;
  var likedTrip = req.body.trip_id;
  console.log(chalk.red("Hit on like trip!"));

  // TODO: need to redirect to the current page!
  // Redirecting back to the root
  res.redirect('/tabi_search')
});

/* POST edit_profile_photo*/
router.post('/edit_profile_photo', function(req, res, next) {
  // var user_id = req.body.user_id;
  // TODO: get photo

  // TODO: need to redirect to the current page!
  // Redirecting back to the root
  res.redirect('/view_user');
});

/* POST edit_profile_text*/
router.post('/edit_profile_text', function(req, res, next) {
  // var user_id = req.body.user_id;
  var new_text = req.body.new_profile_text;

  // TODO: need to redirect to the current page!
  // Redirecting back to the root
  res.redirect('/view_user');
});

/* POST add_trip*/
router.post('/add_trip', function(req, res, next) {
  // var user_id = req.body.user_id;
  var user_id = req.body.user_id;
  var title = req.body.title;
  var description = req.body.description;
  // TODO: photo

  res.redirect('/add_trip');
});

/* POST edit_trip*/
router.post('/edit_trip', function(req, res, next) {
  // var user_id = req.body.user_id;
  var trip_id = req.body.trip_id;
  var title = req.body.title;
  var description = req.body.description;
  // TODO: photo

  res.redirect('/user_profile');
});

/* POST delete_trip*/
router.post('/delete_trip', function(req, res, next) {
  // var user_id = req.body.user_id;
  var trip_id = req.body.trip_id;
  // TODO: photo

  res.redirect('/user_profile');
});


// Example to add, edit and delete in mongoose
// /* POST to adduser */
// router.post('/adduser', function(req, res, next) {
//   var username = req.body.username;
//   var userFruit = req.body.userfruit;

//   // TODO: Create a new document with the given username and favorite fruit.
//   // If the username already exists, then do nothing.
//   var newUser = new User({
//     'username': username,
//     'favoriteFruit': userFruit
//   });
//   newUser.save();

//   // Redirecting back to the root
//   res.redirect('/');
// });

// /* POST to deleteuser */
// router.post('/deleteuser', function(req, res, next) {
//   var username = req.body.username;

//   // TODO: Remove the document from the collection, if it exists.
//   // Otherwise, let the client know that the user does not exist.
//   //
//   // Hint: How can you tell whether User.remove() was successful?
//   // Look at the second parameter of the callback function passed
//   // User.remove(). You can get the number of documents deleted
//   // by the operation.
//   User.remove({'username': username}, function(err, result) {
//     if (err) {
//       res.send('An error occurred!');
//     } else {
//       if (result.result.n === 0) {
//         res.send(username + ' is not in the database!');
//       } else {
//         res.send(username + ' was successfully removed!');
//       }
//     }
//   });
// });

// router.get('/findfruit', function(req, res, next) {
//   var username = req.query.username;

//   // TODO: Check if the user exists. If the user exists, send back
//   // their favorite fruit. Otherwise, let the client know that the
//   // username is not in the database.
//   User.findOne({'username': username}, function(err, user) {
//     if (err) {
//       res.send('An error occurred!');
//     } else {
//       if (user) {
//         res.send(username + '\'s favorite fruit is ' + user.favoriteFruit);
//       } else {
//         // If the user does not exist, use this line of code below.
//         res.send(username + ' is not in the database!');
//       }
//     }
//   });
// });

module.exports = router;
