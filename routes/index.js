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
var helperFunction = require('../bin/fillDB.js');

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
  User.findOne({"userID": profile.id}, function(err, user){
      if (err) {
        console.log(err);
        return done(null, null);
      } else if (user === null) {
        var newUserInfo = new User();
        newUserInfo.userID = profile.id;
        newUserInfo.userName = profile.displayName;
        newUserInfo.userPhoto = "http://res.cloudinary.com/tabibuddy/image/upload/c_thumb,g_face,h_200,w_200/v1485053998/125.jpg";
      // user.fb.access_token = access_token;
        newUserInfo.save()              
        return done(null, newUserInfo);
      } else {
        return done(null, user);
      }
    });
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


// router.get('/mongo_test_add', function(req, res, next) {
//   var testUser = new User();
//   testUser.userID = "12345";
//   testUser.userName = "testUser";
//   testUser.save();
//   res.send('saved'+testUser.userID+','+testUser.userName);
// });

// router.get('/mongo_test_show', function(req, res, next) {
//   User.find({},function(err,record){
//     if (err) {
//       res.send('error:'+error);
//     } else {
//       res.send('success:'+record);
//     }
//   });
// })

// router.get('/check_login', function (req, res, next) {
//   if(req.isAuthenticated()) {
//     res.send('user id:'+req.user.userID);
//   } else {
//     res.send('not isAuthenticated');
//   }
// });

// router.get('/add_trip_test', function (req, res, next) {
//   var tripInfo = {
//     'tripID' : '123456',
//     'tripName' : 'Test Trip',
//     'tripCreator' : req.user.userID,
//     'tripDestinationID' : '123',
//     'tripDestinationName' : 'UK',
//     'tripType' : 'adventure',
//   };
//   var success = helperFunction.addTrip(User, Trip, tripInfo);
//   res.send(success);
// });

router.get('/login', function (req, res, next) {
  res.render('login');
});

router.get('/login/facebook', passport.authenticate('facebook'));

router.get('/login/facebook/callback', 
  passport.authenticate('facebook', { 
    failureRedirect: '/login',
    successRedirect: '/' 
  })
);

router.get('/my_user_name',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.send('user id:'+req.user.userID+' user name:'+req.user.userName+' user photo:'+req.user.userPhoto+' user email'+req.user.userEmail);
});

// GET requests

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home_temp');
});

/* GET buddy search result */
// This GET req should return ALL buddies of the same location 
router.get('/buddy_search', function(req, res, next) {

  var placeID = req.body.buddy_destination_id;
  var placeName = req.body.buddy_destination_name;

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

/* GET buddy search result (filtered) */
// This GET req should return FILTERED buddies of the same location 
router.get('/buddy_search_filter', function(req, res, next) {


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

/* GET tabi search result */
// This GET req should return ALL trips of the same location 
router.get('/tabi_search', function(req, res, next) {

  var placeID = req.body.tabi_destination_id;
  var placeName = req.body.tabi_destination_name;

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

/* GET tabi search result (filtered) */
// This GET req should return FILTERED trips of the same location
router.get('/tabi_search_filter', function(req, res, next) {

  // front end will send req.body should include location, filter object
  // {
  //   placeID: '12345',
  //   category: ['food', 'art'],
  //   duration: ['short'],
  // }

  // fake trip data for front end testing
  // you return something like below to the front end 
  var fakeTripData = {trips:[{tripID: "12345", userID: "123", tripTitle: "test1", username: "user1", description: "Filter success!", liked: true, imageURL:'http://placekitten.com/g/150/150'},
  {tripID: "12346", userID: "124", tripTitle: "test2", username: "user2", description: "this is test description2", liked:false, imageURL:'http://placekitten.com/g/150/150'},
  {tripID: "12347", userID: "125", tripTitle: "test3", username: "user3", description: "this is test description3", liked:false, imageURL:'http://placekitten.com/g/150/150'},
  {tripID: "12348", userID: "126", tripTitle: "test4", username: "user4", description: "this is test description4", liked:true, imageURL:'http://placekitten.com/g/150/150'},
  {tripID: "12349", userID: "127", tripTitle: "test5", username: "user5", description: "this is test description5", liked:true, imageURL:'http://placekitten.com/g/150/150'},]};

  res.render('tabi_search_result', fakeTripData);
});


router.get('/view_own_profile', function(req, res, next) {
  res.redirect('/view_user/'+req.user.userID);
})

/* GET user profile page by user ID */
router.get('/view_user/:user_id', function(req, res, next) {

  // userID is user ID of the profile we are accessing
  var userID = req.params.user_id;

  // req.user.userID is user ID of the person who is viewing the profile
  // set userIsOwner to true, if the person is viewing his/her own profile
  var userIsOwner = false;
  if (userID === req.user.userID) {
    userIsOwner = true;
  }

  // userImageURL should have been saved in the database
  // userImageURL should include version number so that pictures are concurrently updated
  var userImageURL = "https://res.cloudinary.com/tabibuddy/image/upload/c_thumb,g_face,h_200,w_200/v1485053998/125.jpg";

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

  // userIsOwner = true -> edit/delete options should appear, false -> only like option
  var fakeProfileData = {userIsOwner: userIsOwner,
  userImageURL: userImageURL, username: "Cat Meow", userID: userID, userDescription: "this user's ID is "+userID, 
  userContact: 'test@gmail.com', wishlistTrips: wishlistTripsList, userTrips: userTripsList};

  // ~~~~ fake data ends

  res.render('user_profile', fakeProfileData);
});

/* GET add trip page */;
router.get('/add_trip_page', function(req, res, next) {

  res.render('add_trip_temp');
});

/* GET edit trip page by trip ID */
router.get('/edit_trip_page/:trip_id', function(req, res, next) {
  
  var userID = req.user.userID;
  var tripID = req.params.trip_id;  

  // check userID matches the creator ID of the trip

  // get the current data about the trip 

  var fakeTripData = {
    tripID: tripID, title: 'test title', description: 'test description', category: 'food', season: 'summer',
    duration: 3, budget: 200
  }
  // send empty string if season has no input, 

  res.render('edit_trip_temp',fakeTripData);
});

/* POST like_trip*/
router.post('/like_trip', function(req, res, next) {
  var likedUser = req.user.userID;
  var likedTrip = req.body.trip_id;
  console.log(chalk.red("Hit on like trip!"));

  // update the database 

  // if no error, send empty string message
  res.send('');
  // else redirect to error screen
});

/* POST like_trip*/
router.post('/unlike_trip', function(req, res, next) {
  var unlikedUser = req.user.userID;
  var unlikedTrip = req.body.trip_id;
  console.log(chalk.red("Hit on unlike trip!"));

  // update the database 

  // if no error, send empty string message
  res.send('');
  // else redirect to error screen
});

/* POST edit_profile_photo*/
router.post('/edit_profile_photo/:user_id', function(req, res, next) {

  var userID = req.params.user_id;

  // check userID matches req.user.userID

  var form = new formidable.IncomingForm();

  form.on('file', function(field, file) {
    cloudinary.uploader.upload(
      file.path, 
      function(result) {
        // then update the db with new image URL ~~~
        var newImageURL = result.eager[0].secure_url 
        // then redirect to the user's own profile page
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
  var userID = req.params.user_id;
  var newText = req.body.new_profile_text;
  var newContact = req.body.new_profile_contact;

  // make sure userID matches req.user.userID
  // update the db

  // redirect to the user's own profile page
  res.redirect('/view_user/'+userID);
});

/* POST add_trip*/
router.post('/add_trip', function(req, res, next) {

  var userID = req.user.userID;
  var title = req.body.title;
  var description = req.body.description;
  var placeID = req.body.destination_id;
  var placeName = req.body.destination_name;
  // ... and so on 

  var tripID = '????' //how do we come up with trip IDs? auto-increment?

  var form = new formidable.IncomingForm();

  form.on('file', function(field, file) {
    cloudinary.uploader.upload(
      file.path, 
      function(result) {
        var tripPhotoURL = result.eager[0].secure_url;
        // Save the trip to database.
      },
      {
        public_id: tripID, 
        quality: "auto:good",
        width: 600, height: 600, crop: "limit",
        eager: [{ width: 500, height: 500, crop: 'thumb', gravity: 'face', format: 'jpg'}],                                   
      // tags: [] 
      }
    );
  });

  form.parse(req);  

  // Show some message on top to let the user know the update was successful?
  res.redirect('/view_user/'+userID);
});

/* POST edit_trip*/
router.post('/edit_trip', function(req, res, next) {

  var userID = req.user.userID;
  var tripID = req.body.tripID; 
  var title = req.body.title;
  var description = req.body.description;
  // ... and so on. Photo & location shouldn't be changed

  // If userID matches creatorID of the trip, update database
  // then redirect them to their own profile.
  // (Show some message on top to let the user know the update was successful?)
  res.redirect('/view_user/'+userID);

  // else redirect them to error page
});

/* POST delete_trip*/
router.post('/delete_trip', function(req, res, next) {

  var userID = req.user.userID;
  var tripID = req.body.tripID;

  // If userID matches creatorID of the trip, update database
  // then redirect them to their own profile.
  // (Show some message on top to let the user know the update was successful?)
  res.redirect('/view_user/'+userID);

  // else redirect them to error page
});


module.exports = router;

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
