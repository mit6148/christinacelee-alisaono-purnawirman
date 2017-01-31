var express = require('express');
var router = express.Router();

/////////////////////////////////////////////////////////////////////////////////////////////////////
//// Additional Packages

var chalk = require('chalk');

var cloudinary = require('cloudinary');
var formidable = require('formidable');

var mongoose = require('mongoose');

/* Authentication Packages */
var session = require('express-session');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

/////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////
//// Import Models & Functions

var ObjectId = mongoose.Schema.Types.ObjectId;
var User = require('../schemas/user');
var Trip = require('../schemas/trip');
var Destination = require('../schemas/destination');
var helperFunction = require('../bin/fillDB.js');

/////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////
//// Configurations

/* Config for Cloudinary */
cloudinary.config({ 
  cloud_name: 'tabibuddy', 
  api_key: '455418426168721', 
  api_secret: '0SjT0iYEFY7l_1aLBdWnqVCaS9Q' 
});


/* Config for Passport with Facebook */
router.use(session({ secret: 'abhdf2134jkbdu4083n7k4bskk0as8j4nf63kng', resave: 'false', saveUninitialized: 'true' }));
router.use(passport.initialize());
router.use(passport.session());

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

/////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////
//// For Testing

/* this is to populate database with fake users and trips, using fakeUsersAndTrips.js file */
router.get('/__addFakeUsersAndTrips', function(req, res, next){
  var fake = require("../routes/fakeUsersAndTrips.js");

  User.collection.insertMany(fake.users, function(err, docs){
    if(err){
      res.send("Error in inserting user for fake data");
      return;
    }
  });
  Trip.collection.insertMany(fake.trips, function(err, docs){
    if(err){
      res.send("Error in inserting trip for fake data");
      return;
    }
  });
  Destination.collection.insertMany(fake.destinations, function(err, docs){
    if(err){
      res.send("Error in inserting destination for fake data");
      return;
    }
  });
  res.send('Success');
});

/* WARNING!! This is to clear ALL database */
router.get('/__removeAll', function(req, res, next){
  User.remove({}, function(err, docs){
    if(err){
      res.send("Error in deleting user for fake data");
      return;
    }
  });
  Trip.remove({}, function(err, docs){
    if(err){
      res.send("Error in deleting trip for fake data");
      return;
    }
  });
  Destination.remove({}, function(err, docs){
    if(err){
      res.send("Error in deleting destination for fake data");
      return;
    }
  });
  res.send('Success');
});

/* view all database status now */
router.get('/__database', function(req, res, next){
  User.find({}, function(err, users){
    if(err) {
      res.send("Error in user database");
      return;
    }
    Trip.find({}, function(err, trips){
      if(err) {
        res.send("Error in trip database");
        return;
      }
      Destination.find({}, function(err, destinations){
        if(err) {
          res.send("Error in destination database");
          return;
        }
        res.send(JSON.stringify({users: users,
                                 trips: trips,
                                 destinations: destinations}, null, 2));
      });
    });
  });
});

/* view all users status now */
router.get('/__users', function(req, res, next){
  User.find({}, function(err, users){
    if(err) {
      res.send("Error in user database");
      return;
    }
    res.send(JSON.stringify(users, null, 2));
  });
});

/* view your user status now */
router.get('/__auth', function(req, res, next){
  var data = {isAuthenticated: req.isAuthenticated()};
  if(req.isAuthenticated()){
    for(var key in req.user){
      if(req.user.hasOwnProperty(key)){
        data[key] = req.user[key];
      }
    }
  }
  res.send(JSON.stringify(data, null, 2));
});

/* view error message */
router.get('/__error/:error_type', function(req, res, next) {
  var errorType = req.params.error_type;
  var errorMessages = {
    error401 : "Error 401 - Unauthorized",
    error404 : "Error 404 - User Does Not Exist",
    error500 : "Error 500 - Internal Server Error",
  }
  res.render('error',{ message : errorMessages[errorType] });
})


/////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////
//// GET routes

/* GET home page */
router.get('/', function(req, res, next) {
  var loggedIn = req.isAuthenticated();
  var loggedInUser;
  if (loggedIn) {
    loggedInUser = req.user.userName;
  } else {
    loggedInUser = 'guest';
  }

  res.render('home', {showSearchBar: false, loggedIn: loggedIn, loggedInUser: loggedInUser});
});



/* GET login */
router.get('/login/facebook', passport.authenticate('facebook'));



/* GET login callback route */
router.get('/login/facebook/callback', 
  passport.authenticate('facebook', { 
    failureRedirect: '/login/facebook',
    successRedirect: '/' 
  })
);



/* GET user profile page for logged-in user */
router.get('/view_my_profile', function(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect('/view_user/'+req.user.userID);
  } else {
    res.redirect('/login/facebook');
  }
})



/* GET logout & callback route */
router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});



/* GET tabi search result page (ALL trips, same location) */
router.get('/tabi_search', function(req, res, next) {

  var loggedIn = req.isAuthenticated();
  var loggedInUser = 'guest';
  var loggedUserID = null;
  if (loggedIn) {
    loggedInUser = req.user.userName;
    loggedUserID = req.user.userID;
  } 

  var placeID = req.query.tabi_destination_id;
  var placeName = req.query.tabi_destination_name;
  var tabies = [];

  Destination.findOne({"destinationID": placeID}, function(err, foundDestination){
    if(err){
      console.log("Error in finding destination");
      res.render('error',{message: "Error 500 - Internal Server Error"});
      return;
    }

    if (foundDestination !== null) {
    
      tabies = foundDestination["tabies"];

      var tabiList = [];
      var query = Trip.
                  find({}).
                  where("tripID").in(tabies).
                  select("tripID tripActive tripCreatorID tripName tripCreatorName tripDescription tripPhoto tripLikedUsers");
      
      query.exec(function(err, trips){
        if (err) {
          console.log("Error in finding trips");
          res.render('error',{message: "Error 500 - Internal Server Error"});
          return;
        }

        if(trips !== null){
          for(var k = 0; k < trips.length; k++){

            // Check if the logged-in user has liked the trip
            var tripLikedUsers = trips[k].tripLikedUsers;
            var tripLiked = tripLikedUsers.some(function(tripUser){
              return tripUser === loggedUserID;
            });

            if (trips[k].tripActive && trips[k].tripCreatorID !== loggedUserID) {
              tabiList.push({tripID: trips[k].tripID,
                              userID: trips[k].tripCreatorID,
                              tripTitle: trips[k].tripName,
                              username: trips[k].tripCreatorName,
                              description: trips[k].tripDescription,
                              liked: tripLiked,
                              imageURL: trips[k].tripPhoto
              });
            }
          }
        }

        res.render('tabi_search', {placeID: placeID, placeName: placeName, 
          noTrips: false, trips: tabiList, showSearchBar: true, isTabiSearch: true,
          loggedIn: loggedIn, loggedInUser: loggedInUser});   
      });

    } else {
      suggestionList = [{placeID:'123',placeName:'NYC'}];

          res.render('tabi_search', {placeID: placeID, placeName: placeName,
            noTrips: true, suggestions: suggestionList, 
            trips: [], showSearchBar: true, isTabiSearch: true,
            loggedIn: loggedIn, loggedInUser: loggedInUser});

      // Destination.aggregate(
      //   [{ "$project": {
      //       "destinationID": 1,
      //       "destinationName": 1,
      //       "tabies": 1,
      //       "length": {"$size": "$tabies"}
      //   }},
      //   { "$sort": { "length": -1 } },
      //   { "$limit": 5 }
      //   ],

      //   function(err,results) {
      //     if (err) {
      //       console.log("Error in finding destinations");
      //       res.render('error',{message: "Error 500 - Internal Server Error"});
      //     }

      //     for (var i=0; i<results.length; i++) {
      //       suggestionList.push({ placeName: results[i].destinationName,
      //                             placeID: results[i].destinationID });
      //     }
          
      //     res.render('tabi_search', {placeID: placeID, placeName: placeName,
      //       noTrips: true, suggestions: suggestionList, 
      //       trips: [], showSearchBar: true, isTabiSearch: true,
      //       loggedIn: loggedIn, loggedInUser: loggedInUser});
      // });
    }
  });
});



/* GET FILTERED tabi search result (same location, sends back rendered html) */
router.get('/tabi_search_filter', function(req, res, next) {

  var loggedUserID = null;
  if (req.isAuthenticated()) {
    loggedUserID = req.user.userID;
  } 

  var placeID = req.query.placeID;
  var tabies = [];

  Destination.findOne({"destinationID": placeID}, function(err, foundDestination){
    if (err) {
      console.log("Error in finding destination");
      res.render('error',{message: "Error 500 - Internal Server Error"});
      return;
    }

    if(foundDestination !== null){
      tabies = foundDestination["tabies"];
    }

    var tabiList = [];
    var query = Trip.
                find({}).
                where("tripID").in(tabies);

    // TODO: clean these up with switch statements
    if ('Category' in req.query) {
        query.where("tripType").in(req.query['Category']);
    } 
    if ('Season' in req.query) {
        query.where("tripSeason").in(req.query['Season']);
    } 
    if ('Duration' in req.query) {
      tripDuration = req.query['Duration'][0];
      if (tripDuration === 'dayTrip') {
        query.where("tripDuration").lte(1);
      } else if (tripDuration === 'shortTrip') {
        query.where("tripDuration").gt(1).lte(3);
      } else if (tripDuration === 'mediumTrip') {
        query.where("tripDuration").gt(3).lte(7);
      } else if (tripDuration === 'longTrip') {
        query.where("tripDuration").gt(7);
      }
    } 
    if ('Budget' in req.query) {
      tripBudget = req.query['Budget'][0];
      if (tripBudget === 'lowBudget') {
        query.where("tripBudget").lte(300);
      } else if (tripBudget === 'mediumBudget') {
        query.where("tripBudget").gt(300).lte(800);
      } else if (tripBudget === 'highBudget') {
        query.where("tripBudget").gt(800);
      }
    }

    query.select("tripID tripActive tripCreatorID tripName tripCreatorName tripDescription tripPhoto tripLikedUsers");
    
    query.exec(function(err, trips){
      if (err) {
        console.log("Error in finding trips");
        res.render('error',{message: "Error 500 - Internal Server Error"});
        return;
      }

      if (trips !== null) {
        for(var k = 0; k < trips.length; k++){
          
          // Check if the logged-in user has liked the trip
          var tripLikedUsers = trips[k].tripLikedUsers;
          var tripLiked = tripLikedUsers.some(function(tripUser){
            return tripUser === loggedUserID;
          });

          if (trips[k].tripActive && trips[k].tripCreatorID !== loggedUserID) {
            tabiList.push({tripID: trips[k].tripID,
                            userID: trips[k].tripCreatorID,
                            tripTitle: trips[k].tripName,
                            username: trips[k].tripCreatorName,
                            description: trips[k].tripDescription,
                            liked: tripLiked,
                            imageURL: trips[k].tripPhoto
            });
          }
        }
      }

      res.render('tabi_search_result', {trips: tabiList});   
    })
  });
});



/* GET buddy search result page (ALL buddies, same location) */
router.get('/buddy_search', function(req, res, next) {

  var loggedIn = req.isAuthenticated();
  var loggedInUser = "guest";
  var loggedUserID = null;
  if (loggedIn) {
    loggedInUser = req.user.userName;
    loggedUserID = req.user.userID;
  } 

  var placeID = req.query.buddy_destination_id;
  var placeName = req.query.buddy_destination_name;
  var buddies = [];

  Destination.findOne({"destinationID": placeID}, function(err, foundDestination){
    if(err){
      console.log("Error in finding destination");
      res.render('error',{message: "Error 500 - Internal Server Error"});
      return;
    }

    if(foundDestination !== null){
      buddies = foundDestination["buddies"];
    
      var buddyList = [];
      var query = User.
                  find({}).
                  where("userID").in(buddies).
                  select("userID userName userPhoto");

      query.exec(function(err, users){
        if (err) { 
          console.log("Error in finding users");
          res.render('error',{message: "Error 500 - Internal Server Error"});
        }

        if (users !== null) {
          for(var k = 0; k < users.length; k++){
            // Don't show the logged-in user itself
            if (users[k].userID !== loggedUserID) {
              buddyList.push({userID: users[k].userID,
                              username: users[k].userName,
                              userImageURL: users[k].userPhoto,
                              tripImages: []
              }); 
            }
          }
        }
        res.render('buddy_search', {placeID: placeID, placeName: placeName, 
          users: buddyList, showSearchBar: true, isTabiSearch: false, 
          loggedIn: loggedIn, loggedInUser: loggedInUser});   
      });

    } else {

      suggestionList = [];

      Destination.aggregate(
        [{ "$project": {
            "destinationID": 1,
            "destinationName": 1,
            "buddies": 1,
            "length": {"$size": "$buddies"}
        }},
        { "$sort": { "length": -1 } },
        { "$limit": 5 }
        ],

        function(err,results) {
          if (err) {
            console.log("Error in finding destinations");
            res.render('error',{message: "Error 500 - Internal Server Error"});
          }

          for (var i=0; i<results.length; i++) {
            suggestionList.push({ placeName: results[i].destinationName,
                                  placeID: results[i].destinationID });
          }
          
          res.render('buddy_search', {placeID: placeID, placeName: placeName,
            noBuddies: true, suggestions: suggestionList, 
            users: [], showSearchBar: true, isTabiSearch: true,
            loggedIn: loggedIn, loggedInUser: loggedInUser});
      });
    }
  });
});



/* GET FILTERED buddy search result (same location, sends back rendered html) */
router.get('/buddy_search_filter', function(req, res, next) {

  var loggedUserID = null;
  if (req.isAuthenticated()) {
    loggedUserID = req.user.userID;
  } 

  var placeID = req.query.placeID;
  var buddies = [];
  var buddyList = [];

  var tripFilter = Trip.
                   find({}).
                   where("tripDestinationID").equals(placeID);


  // TODO: Clean these up with switch statements
  if ('Category' in req.query) {
      tripFilter.where("tripType").in(req.query['Category']);
  } 
  if ('Season' in req.query) {
      tripFilter.where("tripSeason").in(req.query['Season']);
  } 
  if ('Duration' in req.query) {
    tripDuration = req.query['Duration'][0];
    if (tripDuration === 'dayTrip') {
      tripFilter.where("tripDuration").lte(1);
    } else if (tripDuration === 'shortTrip') {
      tripFilter.where("tripDuration").gt(1).lte(3);
    } else if (tripDuration === 'mediumTrip') {
      tripFilter.where("tripDuration").gt(3).lte(7);
    } else if (tripDuration === 'longTrip') {
      tripFilter.where("tripDuration").gt(7);
    }
  } 
  if ('Budget' in req.query) {
    tripBudget = req.query['Budget'][0];
    if (tripBudget === 'lowBudget') {
      tripFilter.where("tripBudget").lte(300);
    } else if (tripBudget === 'mediumBudget') {
      tripFilter.where("tripBudget").gt(300).lte(800);
    } else if (tripBudget === 'highBudget') {
      tripFilter.where("tripBudget").gt(800);
    }
  }

  /* callback function for iterating over users */
  var addBuddies = function(users,currentUser,totalUsers) {
    var userLikedTrips = users[currentUser].userLikedTrips;
    var buddyUserID = users[currentUser].userID;
    var buddyUsername = users[currentUser].userName;
    var buddyUserImage = users[currentUser].userPhoto;

    var qTrip = tripFilter.
                where("tripID").in(userLikedTrips).
                count();

    qTrip.exec(function(err, tripCount){
      if (err) {
        console.log("Error finding trip count");
        res.render('error',{message: "Error 500 - Internal Server Error"});
        return;
      }

      if (buddyUserID !== loggedUserID && tripCount > 0) {
        buddyList.push({userID: buddyUserID,
                        username: buddyUsername,
                        userImageURL: buddyUserImage,
                        tripImages: []
                      }); 
      }

      currentUser += 1;
      if (currentUser < totalUsers) {
        addBuddies(users,currentUser,totalUsers);
      } else {
        res.render('buddy_search_result', {users: buddyList});   
      }
    });
  }

  Destination.findOne({"destinationID": placeID}, function(err, foundDestination){
    if (err) {
      console.log("Errof in finding destination");
      res.render('error',{message: "Error 500 - Internal Server Error"});
      return;
    }

    if(foundDestination !== null){
      buddies = foundDestination["buddies"];
    }

    var buddyList = [];
    var query = User.
                find({}).
                where("userID").in(buddies).
                select("userID userName userPhoto userLikedTrips");

    query.exec(function(err, users){
      if (err) {
        console.log("Error in finding users");
        res.render('error',{message: "Error 500 - Internal Server Error"});
      }

      if(users !== null){
        var currentUser = 0;
        var totalUsers = users.length;
        addBuddies(users,currentUser,totalUsers);
      }
    });
  });
});



/* GET user profile page (by user ID) */
router.get('/view_user/:user_id', function(req, res, next) {
  /* userID is user ID of the profile we are accessing */
  var userID = req.params.user_id;

  /* userIsOwner only if the viewing user and the displayed user are same */
  var userIsOwner = false;

  var loggedIn = req.isAuthenticated();
  var loggedInUser = 'guest';
  var loggedUserID = null;

  if (process.env.NODE_ENV === "production") {
    if (loggedIn) {
      loggedInUser = req.user.userName;
      loggedUserID = req.user.userID;
      if (userID === loggedUserID) {
        userIsOwner = true;
      }
    } 
  } else {
    loggedUserID = "userA";
    loggedInUser = "userA";
    userIsOwner = (userID === loggedUserID);
  }

  var query = User.findOne({"userID": userID});
  var profileData;

  query.exec(function(err, user){
    if (err) {
      console.log("error in finding user");
      res.render('error',{message: "Error 500 - Internal Server Error"});
      return;
    }

    if(user === null){
      res.render('error',{message: "Error 404 - User Does Not Exist"});
      return;

    } else {
      var queryTrips = Trip.find({}).
                       where("tripID").in(user.userLikedTrips).
                       select("tripID tripCreatorID tripName tripDestinationName tripCreatorName tripDescription tripPhoto tripLikedUsers");
      
      queryTrips.exec(function(err, trips){
        if(err) { 
          console.log("Error in finding trips");
          res.render('error',{message: "Error 500 - Internal Server Error"});
          return;
        }

        var wishlistTripsList = [];
        var userTripsList = [];

        for(var i = 0; i < trips.length; i++){

          // Check if the logged-in user has liked the trip
          var tripLikedUsers = trips[i].tripLikedUsers;
          var tripLiked = tripLikedUsers.some(function(tripUser){
            return tripUser === loggedUserID;
          });

          var tripsList = {tripID: trips[i].tripID,
                            userID: trips[i].tripCreatorID,
                            tripTitle: trips[i].tripName,
                            tripPlace: trips[i].tripDestinationName,
                            username: trips[i].tripCreatorName,
                            description: trips[i].tripDescription,
                            liked: tripLiked, 
                            imageURL: trips[i].tripPhoto}

          // wishlist = likedtrips - createdtrips
          if(user.userCreatedTrips.indexOf(trips[i].tripID) < 0){
            wishlistTripsList.push(tripsList);
          } else {
            userTripsList.push(tripsList);
          }
        }

        profileData = {userIsOwner: userIsOwner,
                       userImageURL: user.userPhoto, 
                       username: user.userName, 
                       userID: user.userID, 
                       userDescription: user.userDescription, 
                       userContact: user.userEmail, 
                       wishlistTrips: wishlistTripsList, 
                       userTrips: userTripsList,
                       showSearchBar: false, 
                       loggedIn: loggedIn, 
                       loggedInUser: loggedInUser};

        res.render('user_profile', profileData);
      });
    }
  });
});



/* GET add trip page */;
router.get('/add_trip_page', function(req, res, next) {

  if (process.env.NODE_ENV === "production") {

    if(!req.isAuthenticated()){
      res.redirect('/login/facebook');
      return;
    }

    var loggedInUser = req.user.userName;

  } else {
    loggedInUser = "userA";
  }

  res.render('add_trip', {loggedIn: true, loggedInUser: loggedInUser});
});

/* GET edit trip page by trip ID */
router.get('/edit_trip_page/:trip_id', function(req, res, next) {

  var loggedInUser;
  var loggedUserID;

  if (process.env.NODE_ENV === "production") {

    if(!req.isAuthenticated()){
      res.redirect('/login/facebook');
      return;

    } else {
      loggedInUser = req.user.userName;
      loggedUserID = req.user.userID;
    }

  } else {
    loggedUserID = "userA";
    loggedInUser = "userA";
  }

  var tripID = req.params.trip_id;  

  Trip.findOne({"tripID": tripID}, function(err, foundTrip) {
    if (err) {
      console.log("Error in finding this trip");
      res.render('error',{message: "Error 500 - Internal Server Error"});
      return;

    } else if (foundTrip === null) {
      console.log("No such trip with this trip ID");
      res.render('error',{message: "Error 404 - Trip Does Not Exist"});
      return;

    } else {
      var tripCreatorID = foundTrip['tripCreatorID'];

      if (tripCreatorID !== loggedUserID) {
        res.render('error',{message: "Error 401 - Unauthorized"});
        return;

      } else {
        var tripData = {tripID: tripID,
                        title: foundTrip.tripName,
                        description: foundTrip.tripDescription,
                        category: foundTrip.tripType,
                        season: foundTrip.tripSeason,
                        duration: foundTrip.tripDuration,
                        budget: foundTrip.tripBudget,
                        showSearchBar: false, 
                        loggedIn: true, 
                        loggedInUser: loggedInUser}

        res.render('edit_trip',tripData);
      }
    }
  });
});


/////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////
//// POST requests

/* POST edit profile photo */
router.post('/edit_profile_photo/:user_id', function(req, res, next) {

  var userID = req.params.user_id;

  if (process.env.NODE_ENV === "production") {

    if (!req.isAuthenticated()) {
      res.redirect('/login/facebook');
      return;

    } else if (req.user.userID !== userID) {
      res.render('error',{message: "Error 401 - Unauthorized"});
      return;
    }

  } 

  var form = new formidable.IncomingForm();

  form.on('file', function(field, file) {
    cloudinary.uploader.upload(
      file.path, 
      function(result) {

        var newImageURL = result.eager[0].secure_url; 
        var userInfo = {userID: userID, userPhoto: newImageURL};

        var redirectUser = function(success) {
          if (success) {
            res.redirect('/view_user/'+ userID);
            return;
          } else {
            res.render('error',{message: "Error 500 - Internal Server Error"});
            return;
          }
        }

        helperFunction.editUserProfile(userInfo, redirectUser);
      },
      {
        public_id: userID, 
        invalidate: true,
        quality: "auto:good",
        width: 400, height: 400, crop: "limit",
        eager: [{ width: 300, height: 300, crop: 'thumb', gravity: 'face', format: 'jpg'}],                                   
      }
    );
  });

  form.parse(req);
});



/* POST edit profile info (description, contact) */
router.post('/edit_profile_info/:user_id', function(req, res, next) {
  var userID = req.params.user_id;

  if (!req.isAuthenticated()) {
    res.redirect('/login/facebook');
    return;

  } else if (req.user.userID !== userID) {
    res.render('error',{message: "Error 401 - Unauthorized"});
    return;

  } else {
    var userInfo = {"userID": userID,
                    "userDescription": req.body.new_profile_text,
                    "userEmail": req.body.new_profile_contact}

    if (helperFunction.editUserProfile(userInfo)) {
      res.redirect('/view_user/'+userID);
      return;

    } else {
      res.send("Error in updating profile")
      res.render('error',{message: "Error 500 - Internal Server Error"});
      return;
    }
  }
});



/* POST add new trip */
router.post('/add_trip', function(req, res, next) {

  var userID;
  var userName;

  if (process.env.NODE_ENV === "production") {

    if(!req.isAuthenticated()){
      res.redirect('/login/facebook');
      return;
    }

    userID = req.user.userID;
    userName = req.user.userName;

  } else {
    userID = "userA";
    userName = "userA";
  }

  var tripInfo;
  var tripID = new mongoose.Types.ObjectId;

  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    tripInfo = {tripID: tripID,
                tripName: fields.title,
                tripCreatorID: userID,
                tripCreatorName: userName,
                tripDestinationID: fields.destination_id,
                tripDestinationName: fields.destination_name,
                tripType: fields.category,
                tripActive: true,
                tripPhoto: "http://placekitten.com/g/200/200",
                tripDescription: fields.description,
                tripLikedUsers: [userID],
                tripSeason: fields.season,
                tripDuration: fields.duration, 
                tripBudget: fields.budget,}
  });

  form.on('file', function(field, file) {
    cloudinary.uploader.upload(
      file.path, 
      function(result) {

        // Edit the photo URL after the photo upload
        tripInfo["tripPhoto"] = result.eager[0].secure_url;

        var redirectUser = function(success) {
          if (success) {
            res.redirect('/view_user/'+ userID);
            return;
          } else {
            res.render('error',{message: "Error 500 - Internal Server Error"});
            return;
          }
        }

        helperFunction.addTrip(User, Trip, tripInfo, redirectUser);
      },
      {
        public_id: tripID, 
        quality: "auto:good",
        width: 600, height: 600, crop: "limit",
        eager: [{ width: 500, height: 500, crop: 'thumb', gravity: 'auto', format: 'jpg'}],
      }
    );
  });
});



/* POST edit trip (title, description, category, season, duration, budget) */
router.post('/edit_trip/:tripID', function(req, res, next) {

  var userID;
  if (process.env.NODE_ENV === "production") {

    if(!req.isAuthenticated()){
      res.redirect('/login/facebook');
      return;

    } else {
      userID = req.user.userID;
    }

  } else {
    userID = "userA";
  }

  var tripID = req.params.tripID; 
  var title = req.body.title; 
  var description = req.body.description;
  var category = req.body.category;
  var season = req.body.season;
  var duration = req.body.duration;
  var budget = req.body.budget;

  Trip.findOne({"tripID": tripID}, function(err, foundTrip) {

    if (err) {
      console.log("Error looking up trip of this trip ID");
      res.render('error',{message: "Error 500 - Internal Server Error"});
      return;
    }

    if (foundTrip === null) {
      console.log("No such trip exists for this trip ID");
      res.render('error',{message: "Error 404 - Trip Does Not Exist"});
      return;
    }

    var tripCreatorID = foundTrip.tripCreatorID;

    if (userID !== tripCreatorID) {
      res.render('error',{message: "Error 401 - Unauthorized"});
      return;
    }

    // TODO: clean these up with loop or switch statements
    if (title.length > 0) {
      foundTrip.tripName = title;
    }
    if (description.length > 0) {
      foundTrip.tripDescription = description;
    }
    foundTrip.tripType = category;
    foundTrip.tripSeason = season;
    if (duration.length > 0) {
      foundTrip.tripDuration = duration;
    }
    if (budget.length > 0) {
      foundTrip.tripBudget = budget;
    }

    foundTrip.save();

    res.redirect('/view_user/'+userID);
  });
});



/* POST delete trip */
router.post('/delete_trip', function(req, res, next) {

  var userID;

  if (process.env.NODE_ENV === "production") {

    if(!req.isAuthenticated()){
      res.redirect('/login/facebook');
      return;

    } else {
      userID = req.user.userID;
    }

  } else {
    userID = "userA";
  }

  var tripID = req.body.trip_id;

  Trip.findOne({"tripID": tripID}, function(err, foundTrip) {

    if (err) {
      console.log("Error looking up trip of this trip ID");
      res.render('error',{message: "Error 500 - Internal Server Error"});
      return;
    }

    if (foundTrip === null) {
      console.log("No such trip exists for this trip ID");
      res.render('error',{message: "Error 404 - Trip Does Not Exist"});
      return;
    }

    var tripCreatorID = foundTrip.tripCreatorID;

    if (userID !== tripCreatorID) {
      res.render('error',{message: "Error 401 - Unauthorized"});
      return;
    }

    foundTrip.tripActive = false;
    foundTrip.save();

    var callback = function(success) {
      if (success) {
        res.send('');
      } else {
        res.send('error');
      }
    }

    helperFunction.dislikeTrip(userID,tripID,callback);

  });  
});



/* POST like trip */
router.post('/like_trip', function(req, res, next) {

  var tripID = req.body.trip_id;
  var userID;
  var userName;

  if (process.env.NODE_ENV === "production") {

    if(!req.isAuthenticated()){
      res.send('login');
      return;
    }

    userID = req.user.userID;
    userName = req.user.userName;

  } else {
    userID = "userB";
    userName = "userB";
  }

  var callback = function(success) {
    if (success) {
      res.send('');
      return;
    } else {
      res.send('error');
      return;
    }
  }

  helperFunction.likeTrip(userID,tripID,callback);

});



/* POST unlike trip */
router.post('/unlike_trip', function(req, res, next) {

  var tripID = req.body.trip_id;
  var userID;
  var userName;

  if (process.env.NODE_ENV === "production") {

    if(!req.isAuthenticated()){
      res.send('login');
      return;
    }

    userID = req.user.userID;
    userName = req.user.userName;

  } else {
    userID = "userA";
    userName = "userA";
  }

  var callback = function(success) {
    if (success) {
      res.send('');
      return;
    } else {
      res.send('error');
      return;
    }
  }

  helperFunction.dislikeTrip(userID,tripID,callback);
});

/////////////////////////////////////////////////////////////////////////////////////////////////////


module.exports = router;
