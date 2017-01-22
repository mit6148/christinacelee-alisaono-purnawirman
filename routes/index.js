var express = require('express');
var router = express.Router();

// additional package
var cloudinary = require('cloudinary');
var formidable = require('formidable');
var chalk = require('chalk');

var session = require('express-session');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

router.use(session({ secret: 'my super secret secret', resave: 'false', saveUninitialized: 'true' }));
router.use(passport.initialize());
router.use(passport.session());

// get the User, trip, and destination model
var User = require('../schemas/user');
var Trip = require('../schemas/trip');
var Destination = require('../schemas/destination');

// including the location data
var City = require('../schemas/locationCity');
var StateModel = require('../schemas/locationState');
var Country = require('../schemas/locationCountry');

cloudinary.config({ 
  cloud_name: 'tabibuddy', 
  api_key: '455418426168721', 
  api_secret: '0SjT0iYEFY7l_1aLBdWnqVCaS9Q' 
});

passport.use(new FacebookStrategy({
  clientID: "1299283770133466",
  clientSecret: "02c286e89257fbd0a9d180a6c6cbb09d",
  callbackURL: "https://tabibuddy.azurewebsites.net/login/facebook/callback"
}, function(accessToken, refreshToken, profile, done) {
  var user = new User();
  console.log(profile.id);
  // user.fb.id = profile.id;               
  // user.fb.access_token = access_token;
  // returning empty user for now
  return done(null, user);
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


router.get('/mongo_test', function(req, res, next) {
  var testUser = new User();
  testUser.userID = "12345";
  testUser.userName = "testUser";
  testUser.save();
  res.send('saved'+testUser.userID+','+testUser.userName);
});

router.get('/check_login', function (req, res, next) {
  if(req.isAuthenticated()) {
    res.redirect('/');
  } else {
    res.redirect('/login');
  }
});

router.get('/login', function (req, res, next) {
  res.send('<form action="/login/facebook" method="get"> <div> <input type="submit" value="Log In"/> </div> </form>');
});

router.get('/login/facebook', passport.authenticate('facebook'));

router.get('/login/facebook/callback', 
  passport.authenticate('facebook', { 
    failureRedirect: '/login',
    successRedirect: '/' 
  })
);

router.get('/your_user_name',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.send('user:'+req.user);
});

// GET requests

/* GET home page. */
router.get('/', function(req, res, next) {
  // Rendering the index view with the title 'Sign Up'
  res.render('home');
});

/* GET buddy search page */
router.get('/buddy_search', function(req, res, next) {
  // Rendering the index view with the title 'Sign Up'

  // fake buddy data for front end testing
  var fakeBuddyData = {users:[{userID: "123", username: "user1", userImageURL: 'http://placekitten.com/g/150/150',
  tripImages: [{tripImageURL:'http://placekitten.com/g/150/150'},{tripImageURL:'http://placekitten.com/g/150/150'},{tripImageURL:'http://placekitten.com/g/150/150'},{tripImageURL:'http://placekitten.com/g/150/150'}]},
  {userID: "124", username: "user2", userImageURL: 'http://placekitten.com/g/150/150', 
  tripImages: [{tripImageURL:'http://placekitten.com/g/150/150'},{tripImageURL:'http://placekitten.com/g/150/150'},{tripImageURL:'http://placekitten.com/g/150/150'},{tripImageURL:'http://placekitten.com/g/150/150'}]},
  {userID: "125", username: "user3", userImageURL: 'http://placekitten.com/g/150/150',
  tripImages: [{tripImageURL:'http://placekitten.com/g/150/150'},{tripImageURL:'http://placekitten.com/g/150/150'},{tripImageURL:'http://placekitten.com/g/150/150'},{tripImageURL:'http://placekitten.com/g/150/150'}]},
  {userID: "126", username: "user4", userImageURL: 'http://placekitten.com/g/150/150',
  tripImages: [{tripImageURL:'http://placekitten.com/g/150/150'},{tripImageURL:'http://placekitten.com/g/150/150'},{tripImageURL:'http://placekitten.com/g/150/150'},{tripImageURL:'http://placekitten.com/g/150/150'}]},
  {userID: "127", username: "user5", userImageURL: 'http://placekitten.com/g/150/150',
  tripImages: [{tripImageURL:'http://placekitten.com/g/150/150'},{tripImageURL:'http://placekitten.com/g/150/150'},{tripImageURL:'http://placekitten.com/g/150/150'},{tripImageURL:'http://placekitten.com/g/150/150'}]},
  ]};
  res.render('buddy_search', fakeBuddyData);
});

router.get('/buddy_search_filter', function(req, res, next) {
  // Rendering the index view with the title 'Sign Up'

  // fake buddy data for front end testing
  var fakeBuddyData = {users:[{userID: "123", username: "filter success!", userImageURL: 'http://placekitten.com/g/150/150',
  tripImages: [{tripImageURL:'http://placekitten.com/g/150/150'},{tripImageURL:'http://placekitten.com/g/150/150'},{tripImageURL:'http://placekitten.com/g/150/150'},{tripImageURL:'http://placekitten.com/g/150/150'}]},
  {userID: "124", username: "user2", userImageURL: 'http://placekitten.com/g/150/150', 
  tripImages: [{tripImageURL:'http://placekitten.com/g/150/150'},{tripImageURL:'http://placekitten.com/g/150/150'},{tripImageURL:'http://placekitten.com/g/150/150'},{tripImageURL:'http://placekitten.com/g/150/150'}]},
  {userID: "125", username: "user3", userImageURL: 'http://placekitten.com/g/150/150',
  tripImages: [{tripImageURL:'http://placekitten.com/g/150/150'},{tripImageURL:'http://placekitten.com/g/150/150'},{tripImageURL:'http://placekitten.com/g/150/150'},{tripImageURL:'http://placekitten.com/g/150/150'}]},
  {userID: "126", username: "user4", userImageURL: 'http://placekitten.com/g/150/150',
  tripImages: [{tripImageURL:'http://placekitten.com/g/150/150'},{tripImageURL:'http://placekitten.com/g/150/150'},{tripImageURL:'http://placekitten.com/g/150/150'},{tripImageURL:'http://placekitten.com/g/150/150'}]},
  {userID: "127", username: "user5", userImageURL: 'http://placekitten.com/g/150/150',
  tripImages: [{tripImageURL:'http://placekitten.com/g/150/150'},{tripImageURL:'http://placekitten.com/g/150/150'},{tripImageURL:'http://placekitten.com/g/150/150'},{tripImageURL:'http://placekitten.com/g/150/150'}]},
  ]};
  res.render('buddy_search_result', fakeBuddyData);
});

/* GET tabi search page */
router.get('/tabi_search', function(req, res, next) {
  // Rendering the index view with the title 'Sign Up'

  // fake trip data for front end testing
  var fakeTripData = {trips:[{tripID: "12345", userID: "123", tripTitle: "test1", username: "user1", description: "this is test description1", liked: true, imageURL:'http://placekitten.com/g/150/150'},
  {tripID: "12346", userID: "124", tripTitle: "test2", username: "user2", description: "this is test description2", liked:false, imageURL:'http://placekitten.com/g/150/150'},
  {tripID: "12347", userID: "125", tripTitle: "test3", username: "user3", description: "this is test description3", liked:false, imageURL:'http://placekitten.com/g/150/150'},
  {tripID: "12348", userID: "126", tripTitle: "test4", username: "user4", description: "this is test description4", liked:true, imageURL:'http://placekitten.com/g/150/150'},
  {tripID: "12349", userID: "127", tripTitle: "test5", username: "user5", description: "this is test description5", liked:true, imageURL:'http://placekitten.com/g/150/150'},]};
  console.log(req);
  console.log("BBBB");
  res.render('tabi_search', fakeTripData);
});

/* GET tabi search page */
router.get('/tabi_search_filter', function(req, res, next) {
  // Rendering the index view with the title 'Sign Up'

  // fake trip data for front end testing
  var fakeTripData = {trips:[{tripID: "12345", userID: "123", tripTitle: "test1", username: "user1", description: "Filter success!", liked: true, imageURL:'http://placekitten.com/g/150/150'},
  {tripID: "12346", userID: "124", tripTitle: "test2", username: "user2", description: "this is test description2", liked:false, imageURL:'http://placekitten.com/g/150/150'},
  {tripID: "12347", userID: "125", tripTitle: "test3", username: "user3", description: "this is test description3", liked:false, imageURL:'http://placekitten.com/g/150/150'},
  {tripID: "12348", userID: "126", tripTitle: "test4", username: "user4", description: "this is test description4", liked:true, imageURL:'http://placekitten.com/g/150/150'},
  {tripID: "12349", userID: "127", tripTitle: "test5", username: "user5", description: "this is test description5", liked:true, imageURL:'http://placekitten.com/g/150/150'},]};
  console.log(req);
  console.log("BBBB");
  res.render('tabi_search_result', fakeTripData);
});

/* GET view_user page */
router.get('/view_user/:user_id', function(req, res, next) {

  var userID = req.params.user_id

  // userImageURL should have been saved in the database
  // userImageURL should include version number so that pictures are concurrently updated
  var userImageURL = 'https://res.cloudinary.com/tabibuddy/image/upload/'+userID+'.png';

  // fake user profile data for front end testing ~~~~
  var userTripsList = [{tripID: "12345", userID: "123", tripTitle: "test1", username: "user1", description: "this is test description1", liked: true, imageURL:'http://placekitten.com/g/150/150'},
  {tripID: "12346", userID: "124", tripTitle: "test2", username: "user2", description: "this is test description2", liked:false, imageURL:'http://placekitten.com/g/150/150'},
  {tripID: "12347", userID: "125", tripTitle: "test3", username: "user3", description: "this is test description3", liked:false, imageURL:'http://placekitten.com/g/150/150'},
  {tripID: "12348", userID: "126", tripTitle: "test4", username: "user4", description: "this is test description4", liked:true, imageURL:'http://placekitten.com/g/150/150'},
  {tripID: "12349", userID: "127", tripTitle: "test5", username: "user5", description: "this is test description5", liked:true, imageURL:'http://placekitten.com/g/150/150'},
  {tripID: "12350", userID: "128", tripTitle: "test6", username: "user6", description: "this is test description6", liked: true, imageURL:'http://placekitten.com/g/150/150'},
  {tripID: "12351", userID: "129", tripTitle: "test7", username: "user7", description: "this is test description7", liked:false, imageURL:'http://placekitten.com/g/150/150'},
  {tripID: "12352", userID: "130", tripTitle: "test8", username: "user8", description: "this is test description8", liked:false, imageURL:'http://placekitten.com/g/150/150'},
  {tripID: "12353", userID: "131", tripTitle: "test9", username: "user9", description: "this is test description9", liked:true, imageURL:'http://placekitten.com/g/150/150'},];

  var wishlistTripsList = [{tripID: "12345", userID: "123", tripTitle: "test1", username: "user1", description: "this is test description1", liked: true, imageURL:'http://placekitten.com/g/150/150'},
  {tripID: "12346", userID: "124", tripTitle: "test2", username: "user2", description: "this is test description2", liked:false, imageURL:'http://placekitten.com/g/150/150'},
  {tripID: "12347", userID: "125", tripTitle: "test3", username: "user3", description: "this is test description3", liked:false, imageURL:'http://placekitten.com/g/150/150'},
  {tripID: "12348", userID: "126", tripTitle: "test4", username: "user4", description: "this is test description4", liked:true, imageURL:'http://placekitten.com/g/150/150'},
  {tripID: "12349", userID: "127", tripTitle: "test5", username: "user5", description: "this is test description5", liked:true, imageURL:'http://placekitten.com/g/150/150'},
  {tripID: "12350", userID: "128", tripTitle: "test6", username: "user6", description: "this is test description6", liked: true, imageURL:'http://placekitten.com/g/150/150'},
  {tripID: "12351", userID: "129", tripTitle: "test7", username: "user7", description: "this is test description7", liked:false, imageURL:'http://placekitten.com/g/150/150'},
  {tripID: "12352", userID: "130", tripTitle: "test8", username: "user8", description: "this is test description8", liked:false, imageURL:'http://placekitten.com/g/150/150'},
  {tripID: "12353", userID: "131", tripTitle: "test9", username: "user9", description: "this is test description9", liked:true, imageURL:'http://placekitten.com/g/150/150'},
  {tripID: "12354", userID: "132", tripTitle: "test10", username: "user10", description: "this is test description10", liked:true, imageURL:'http://placekitten.com/g/150/150'},];

  // userIsOwner = true -> edit/delete options should appear
  var fakeProfileDataOwner = {userIsOwner: true,
  userImageURL: userImageURL, sername: "Cat Meow", userID: userID, userDescription: "this user's ID is "+req.params.user_id, 
  userContact: 'test@gmail.com', wishlistTrips: wishlistTripsList, userTrips: userTripsList};

  // userIsOwner = false -> only like/unlike option should appear
  var fakeProfileData = {userIsOwner: false,
  userImageURL: userImageURL, username: "Cat Meow", userID: userID, userDescription: "this user's ID is "+req.params.user_id, 
  userContact: 'test@gmail.com', wishlistTrips: wishlistTripsList, userTrips: userTripsList};

  // ~~~~ fake data ends

  res.render('user_profile', fakeProfileDataOwner);
});

/* GET add_trip_page */;
router.get('/add_trip_page', function(req, res, next) {

  res.render('add_trip');
});

/* GET edit_trip_page */
router.get('/edit_trip_page/:trip_id', function(req, res, next) {
  
  var trip_id = req.params.trip_id;

  res.render('edit_trip');
});

/* POST like_trip*/
router.post('/like_trip', function(req, res, next) {
  var likedUser = req.body.user_id;
  var likedTrip = req.body.trip_id;
  console.log(chalk.red("Hit on like trip!"));

  // update the database 

  // if no error, send empty string message
  res.send('');
});

/* POST like_trip*/
router.post('/unlike_trip', function(req, res, next) {
  var unlikedUser = req.body.user_id;
  var unlikedTrip = req.body.trip_id;
  console.log(chalk.red("Hit on unlike trip!"));

  // update the database 

  // if no error, send empty string message
  res.send('');
});

/* POST edit_profile_photo*/
router.post('/edit_profile_photo/:user_id', function(req, res, next) {

  var userID = req.params.user_id;

  var form = new formidable.IncomingForm();

  form.on('file', function(field, file) {
    cloudinary.uploader.upload(
      file.path, 
      function(result) {
        console.log(result);
        // Update the db with URL ~~~
        //  var newImageURL = result.eager[0].secure_url OR result.eager[0].url
        // Then redirect to the user's own profile page
        res.redirect('/view_user/'+userID); },
        // Show some message on top to let the user know the update was successful?
      {
        public_id: userID, 
        quality: "auto:good",
        width: 400, height: 400, crop: "limit",
        eager: [{ width: 300, height: 300, crop: 'thumb', gravity: 'face', format: 'jpg'}],                                   
      // tags: [] 
      }
    );
  });

  form.parse(req);
});

/* POST edit_profile_text*/
router.post('/edit_profile_info/:user_id', function(req, res, next) {
  var user_id = req.params.user_id;
  var new_text = req.body.new_profile_text;
  var new_contact = req.body.new_profile_contact;
  console.log(chalk.red('User '+user_id+' updated with text:'+new_text+', contact:'+new_contact));

  // redirect to the user's own profile page
  res.redirect('/view_user/'+user_id);
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

  // redirect to the user's own profile page
  res.redirect('/view_user/logged-in-user-id');
});

// var passport = require("passport");
// // var 
// /* Auth part */
// router.get('/login', function(req, res, next){
//   // res.send("<form method='post' action='/login'> <div> Username: <input type="text" placeholder="Enter Username" name="uname" required> </div>")
//   res.send("<form method='post' action='/login'> \
//           <div> Username: <input type='text' placeholder='Enter Username' name='uname' required> </div>\
//           <div> Password: <input type='text' placeholder='Enter Password' name='password' required> </div>");
// });

// router.post('/login', function(req, res, next){
//   // passport.authenticate('local', { successRedirect: '/',
//   //                                  failureRedirect: '/login',
//   //                                  failureFlash: true })
//   res.end();
// });

// router.get('/signup', function(req, res, next){
//   // res.send("<form method='post' action='/login'> <div> Username: <input type="text" placeholder="Enter Username" name="uname" required> </div>")
//   res.send("<form method='post' action='/signup'> \
//           <div> Username: <input type='text' placeholder='Enter Username' name='uname' required> </div>\
//           <div> Password: <input type='text' placeholder='Enter Password' name='password' required> </div>");
// });

// router.post('/signup',function(req, res, next){
//   // User.register(...);
//   res.end();
// });

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
