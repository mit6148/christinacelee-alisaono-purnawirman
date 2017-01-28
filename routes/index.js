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
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

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

/* this is to populate database with fake users and trips, using fakeUsersAndTrips.js file */
router.get('/__addFakeUsersAndTrips', function(req, res, next){
  var fake = require("../routes/fakeUsersAndTrips.js");

  User.collection.insertMany(fake.users, function(err, docs){
    if(err){
      console.log("Error in inserting user for fake data");
    }
  });
  Trip.collection.insertMany(fake.trips, function(err, docs){
    if(err){
      console.log("Error in inserting trip for fake data");
    }
  });
  Destination.collection.insertMany(fake.destinations, function(err, docs){
    if(err){
      console.log("Error in inserting destination for fake data");
    }
  });
  res.send('Success');
});

/* WARNING!! This is to clear ALL database */
router.get('/__removeAll', function(req, res, next){
  User.remove({}, function(err, docs){
    if(err){
      console.log("Error in deleting user for fake data");
    }
  });
  Trip.remove({}, function(err, docs){
    if(err){
      console.log("Error in deleting trip for fake data");
    }
  });
  Destination.remove({}, function(err, docs){
    if(err){
      console.log("Error in deleting destination for fake data");
    }
  });
  res.send('Success');
});

/* view all database status now */
router.get('/__database', function(req, res, next){
  User.find({}, function(err, users){
    if(err) console.log("err in user database");
    Trip.find({}, function(err, trips){
      if(err) console.log("err in trip database");
      Destination.find({}, function(err, destinations){
        if(err) console.log("err in destination database");
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
    if(err) console.log("err in user database");
    res.send(JSON.stringify(users, null, 2));
  });
});

/* view all database status now */
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

// GET requests

/* GET home page. */
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

router.get('/login/facebook', passport.authenticate('facebook'));

router.get('/login/facebook/callback', 
  passport.authenticate('facebook', { 
    failureRedirect: '/login',
    successRedirect: '/' 
  })
);

router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

/* GET buddy search result */
// This GET req should return ALL buddies of the same location 
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
      console.log("Errof in finding destination");
    }
    if(foundDestination != null){
      buddies = foundDestination["buddies"];
    }
    var buddyList = [];
    var query = User.
                find({}).
                where("userID").in(buddies).
                select("userID userName userPhoto");
    query.exec(function(err, users){
      if(err) console.log("Error");
      if(users != null){
        for(var k = 0; k < users.length; k++){
          // console.log("ID: " + users[k].userID + " userName: " + users[k].userName);
          if (users[k].userID !== loggedUserID) {
            buddyList.push({userID: users[k].userID,
                            username: users[k].userName,
                            userImageURL: users[k].userPhoto,
                            tripImages: []
            }); 
          }
        }
      }
      res.render('buddy_search', {users: buddyList, showSearchBar: false, loggedIn: loggedIn, loggedInUser: loggedInUser});   
    })
  });
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

  var loggedIn = req.isAuthenticated();
  var loggedInUser;
  var loggedUserLikeList = [];
  if (loggedIn) {
    loggedInUser = req.user.userName;
    loggedUserLikeList = req.user.userLikedTrips;
  } else {
    loggedInUser = 'guest';
  }

  var placeID = req.query.tabi_destination_id;
  var placeName = req.query.tabi_destination_name;
  var tabies = [];
  Destination.findOne({"destinationID": placeID}, function(err, foundDestination){
    if(err){
      console.log("Error in finding destination");
    }
    if(foundDestination != null){
      tabies = foundDestination["tabies"];
    }
    var tabiList = [];
    var query = Trip.
                find({}).
                where("tripID").in(tabies).
                select("tripID tripCreatorID tripName tripCreatorName tripDescription tripPhoto");
    query.exec(function(err, trips){
      if(err) console.log("Error");
      if(trips != null){
        for(var k = 0; k < trips.length; k++){
          // if its in logged user liked list, then liked is true
          // var liked = loggedUserLikeList.some(function(tabi){
          //   return tabi.equals(trips[k].tripID);
          // });
          // var liked = (loggedUserLikeList.indexOf(trips[k].tripID) >= 0);
          console.log(liked); 
          tabiList.push({tripID: trips[k].tripID,
                          userID: trips[k].tripCreatorID,
                          tripTitle: trips[k].tripName,
                          username: trips[k].tripCreatorName,
                          description: trips[k].tripDescription,
                          liked: liked,
                          imageURL: trips[k].tripPhoto
          });
        }
      }

      res.render('tabi_search', {trips: tabiList, showSearchBar: false, loggedIn: loggedIn, loggedInUser: loggedInUser});   
    })
  });
});

/* GET tabi search result (filtered) */
// This GET req should return FILTERED trips of the same location
router.get('/tabi_search_filter', function(req, res, next) {
  console.log(req.query.Budget);
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
  {tripID: "12349", userID: "127", tripTitle: "test5", username: "user5", description: "this is test description5", liked:true, imageURL:'http://placekitten.com/g/150/150'},],};

  res.render('tabi_search_result', fakeTripData);
});


router.get('/view_my_profile', function(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect('/view_user/'+req.user.userID);
  } else {
    res.redirect('/login');
  }
})

/* GET user profile page by user ID */
router.get('/view_user/:user_id', function(req, res, next) {
  // userID is user ID of the profile we are accessing
  var userID = req.params.user_id;

  // req.user.userID is user ID of the person who is viewing the profile
  // set userIsOwner to true, if the person is viewing his/her own profile
  var userIsOwner = false;
  var loggedIn = req.isAuthenticated();
  var loggedInUser;
  var loggedUserLikeList = [];
  if (loggedIn) {
    loggedInUser = req.user.userName;
    loggedUserLikeList = req.user.userLikedTrips;
    if (userID === req.user.userID) {
      userIsOwner = true;
    }
  } else {
    loggedInUser = 'guest';
  }

  // perform query to users then query each trips he liked
  var query = User.findOne({"userID": userID});
  var profileData;
  query.exec(function(err, user){
    if(err) console.log("error in finding user");
    if(user === null){
      res.send("There is no such users");
      return;
    } else {
      var queryTrips = Trip.find({}).
                       where("tripID").in(user.userLikedTrips).
                       select("tripID tripCreatorID tripName tripCreatorName tripDescription tripPhoto");
      queryTrips.exec(function(err, trips){
        if(err) console.log("Error in finding the trips");
        var wishlistTripsList = [];
        var userTripsList = [];
        for(var i = 0; i < trips.length; i++){
          var liked = (loggedUserLikeList.indexOf(trips[i].tripID) >= 0);
          var tripsList = {tripID: trips[i].tripID,
                            userID: trips[i].tripCreatorID,
                            tripTitle: trips[i].tripName,
                            username: trips[i].tripCreatorName,
                            description: trips[i].tripDescription,
                            liked: liked, 
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

  var loggedIn = req.isAuthenticated();
  var loggedInUser;
  if (loggedIn) {
    loggedInUser = req.user.userName;
  } else {
    loggedInUser = 'guest';
  }

  res.render('add_trip_temp', {loggedIn: loggedIn, loggedInUser: loggedInUser});
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

  // console.log(chalk.red("AAA" + req.body.trip_id));
  // console.log(chalk.red("like trip!"));

  var tripID = req.body.trip_id;
  var userID;
  var userName;
  if (process.env.NODE_ENV === "production") {
    userID = req.user.userID;
    userName = req.user.userName;
    if(!req.isAuthenticated()){
      res.redirect('/login/facebook');
      return;
    }
  } else {
    userID = "userB";
    userName = "userB";
  }

  // update the database 

  var callback = function(success) {
    if (success) {
      // if no error, send empty string message
      res.send('');
    } else {
      // else redirect to error screen
      console.log('error');
    }
  }

  helperFunction.likeTrip(userID,tripID,callback);

});

/* POST like_trip*/
router.post('/unlike_trip', function(req, res, next) {

  console.log(chalk.red("Hit on unlike trip!"));

  var tripID = req.body.trip_id;
  var userID;
  var userName;
  if (process.env.NODE_ENV === "production") {
    userID = req.user.userID;
    userName = req.user.userName;
    if(!req.isAuthenticated()){
      res.redirect('/login/facebook');
      return;
    }
  } else {
    userID = "userA";
    userName = "userA";
  }

  // update the database 

  var callback = function(success) {
    if (success) {
      // if no error, send empty string message
      res.send('');
    } else {
      // else redirect to error screen
      console.log('error');
    }
  }

  helperFunction.dislikeTrip(userID,tripID,callback);
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
        var newImageURL = result.eager[0].secure_url; 
        var userInfo = {userID: userID, userPhoto: newImageURL};
        if(helperFunction.editUserProfile(userInfo)){
          res.redirect('/view_user/'+userID); 
        } else {
          res.send("error in updating photo");
        }
        // then redirect to the user's own profile page
      },
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
  var userInfo = {"userID": userID,
                  "userDescription": req.body.new_profile_text,
                  "userEmail": req.body.new_profile_contact}
  if(helperFunction.editUserProfile(userInfo)){
    res.redirect('/view_user/'+userID);
  } else {
    res.send("Error in updating profile")
  }
});

/* POST add_trip*/
router.post('/add_trip', function(req, res, next) {
  var userID;
  var userName;
  if (process.env.NODE_ENV === "production") {
    userID = req.user.userID;
    userName = req.user.userName;
    if(!req.isAuthenticated()){
      res.redirect('/login/facebook');
      return;
    }
  } else {
    userID = "userA";
    userName = "userA";
  }

  // add trip to db
  var tripInfo;
  var tripID = new mongoose.Types.ObjectId;
  // parse from the form
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

  // edit the photourl to db
  form.on('file', function(field, file) {
    cloudinary.uploader.upload(
      file.path, 
      function(result) {
        tripInfo["tripPhoto"] = result.eager[0].secure_url;
        // Save the trip to database.
        console.log(helperFunction.addTrip(User, Trip, tripInfo));
        res.redirect('/view_user/'+ userID);
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

  // Show some message on top to let the user know the update was successful?
  // res.redirect('/view_user/'+userID);
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
