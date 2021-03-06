// the fake users and trips consists of 3 users (userA, userB, userC) 
// 3 locations (NY, cambridge, seattle) with valid location id
// and 6 trips created (newYorkTestA, newYorkTestB, cambridgeTestA, etc.)
var mongoose = require('mongoose');
var newYorkTestAID = new mongoose.Types.ObjectId;
var newYorkTestBID = new mongoose.Types.ObjectId;
var cambridgeTestAID = new mongoose.Types.ObjectId;
var cambridgeTestBID = new mongoose.Types.ObjectId;
var seattleTestAID = new mongoose.Types.ObjectId;
var seattleTestBID = new mongoose.Types.ObjectId;
var alisaTripAID = new mongoose.Types.ObjectId;
var purnaTripAID = new mongoose.Types.ObjectId;
var purnaTripBID = new mongoose.Types.ObjectId;
var purnaTripCID = new mongoose.Types.ObjectId;
var christinaTripAID = new mongoose.Types.ObjectId;

var users = [
			{"userID": "userA",
			 "userName": "userA",
			 "userEmail": "",
			 "userPhoto": "http://placekitten.com/g/200/200",
			 "userDescription": "This is a fake user A",
			 "userActive": true,
			 "userDestinations": ["ChIJOwg_06VPwokRYv534QaPC8g", "ChIJX8wwy6Vw44kRh2xoiWSOOsU", "ChIJVTPokywQkFQRmtVEaUZlJRA"], 
			 "userLikedTrips": [newYorkTestAID, newYorkTestBID, cambridgeTestAID, cambridgeTestBID, seattleTestAID, seattleTestBID],
			 "userCreatedTrips": [newYorkTestAID, cambridgeTestBID, seattleTestBID]
			},
			 {"userID": "userB",
			 "userName": "userB",
			 "userEmail": "",
			 "userPhoto": "http://placekitten.com/g/200/201",
			 "userDescription": "This is a fake user B",
			 "userActive": true,
			 "userDestinations": ["ChIJOwg_06VPwokRYv534QaPC8g"], 
			 "userLikedTrips": [newYorkTestAID, newYorkTestBID],
			 "userCreatedTrips": [newYorkTestBID]
			},
			{"userID": "userC",
			 "userName": "userC",
			 "userEmail": "",
			 "userPhoto": "http://placekitten.com/g/200/202",
			 "userDescription": "This is a fake user C",
			 "userActive": true,
			 "userDestinations": ["ChIJOwg_06VPwokRYv534QaPC8g", "ChIJX8wwy6Vw44kRh2xoiWSOOsU", "ChIJVTPokywQkFQRmtVEaUZlJRA"], 
			 "userLikedTrips": [newYorkTestAID, cambridgeTestAID, cambridgeTestBID, seattleTestAID, seattleTestBID],
			 "userCreatedTrips": [cambridgeTestAID, seattleTestAID]
			},

			{"userID": "userD",
			 "userName": "userD",
			 "userEmail": "",
			 "userPhoto": "http://placekitten.com/g/200/203",
			 "userDescription": "This is a fake user D",
			 "userActive": true,
			 "userDestinations": ["ChIJOwg_06VPwokRYv534QaPC8g", "ChIJX8wwy6Vw44kRh2xoiWSOOsU", "ChIJVTPokywQkFQRmtVEaUZlJRA"], 
			 "userLikedTrips": [newYorkTestAID, cambridgeTestAID, cambridgeTestBID, seattleTestAID, seattleTestBID],
			 "userCreatedTrips": [cambridgeTestAID, seattleTestAID]
			},
			{"userID": "userE",
			 "userName": "userE",
			 "userEmail": "",
			 "userPhoto": "http://placekitten.com/g/200/204",
			 "userDescription": "This is a fake user E",
			 "userActive": true,
			 "userDestinations": ["ChIJOwg_06VPwokRYv534QaPC8g", "ChIJX8wwy6Vw44kRh2xoiWSOOsU", "ChIJVTPokywQkFQRmtVEaUZlJRA"], 
			 "userLikedTrips": [newYorkTestAID, cambridgeTestAID, cambridgeTestBID, seattleTestAID, seattleTestBID],
			 "userCreatedTrips": [cambridgeTestAID, seattleTestAID]
			},
			{"userID": "userF",
			 "userName": "userF",
			 "userEmail": "",
			 "userPhoto": "http://placekitten.com/g/200/205",
			 "userDescription": "This is a fake user F",
			 "userActive": true,
			 "userDestinations": ["ChIJOwg_06VPwokRYv534QaPC8g", "ChIJX8wwy6Vw44kRh2xoiWSOOsU", "ChIJVTPokywQkFQRmtVEaUZlJRA"], 
			 "userLikedTrips": [newYorkTestAID, cambridgeTestAID, cambridgeTestBID, seattleTestAID, seattleTestBID],
			 "userCreatedTrips": [cambridgeTestAID, seattleTestAID]
			},
			{"userID": "userG",
			 "userName": "userG",
			 "userEmail": "",
			 "userPhoto": "http://placekitten.com/g/200/206",
			 "userDescription": "This is a fake user G",
			 "userActive": true,
			 "userDestinations": ["ChIJOwg_06VPwokRYv534QaPC8g", "ChIJX8wwy6Vw44kRh2xoiWSOOsU", "ChIJVTPokywQkFQRmtVEaUZlJRA"], 
			 "userLikedTrips": [newYorkTestAID, cambridgeTestAID, cambridgeTestBID, seattleTestAID, seattleTestBID],
			 "userCreatedTrips": [cambridgeTestAID, seattleTestAID]
			},
			{"userID": "userH",
			 "userName": "userH",
			 "userEmail": "",
			 "userPhoto": "http://placekitten.com/g/200/207",
			 "userDescription": "This is a fake user H",
			 "userActive": true,
			 "userDestinations": ["ChIJOwg_06VPwokRYv534QaPC8g", "ChIJX8wwy6Vw44kRh2xoiWSOOsU", "ChIJVTPokywQkFQRmtVEaUZlJRA"], 
			 "userLikedTrips": [newYorkTestAID, cambridgeTestAID, cambridgeTestBID, seattleTestAID, seattleTestBID],
			 "userCreatedTrips": [cambridgeTestAID, seattleTestAID]
			},
			{"userID": "userI",
			 "userName": "userI",
			 "userEmail": "",
			 "userPhoto": "http://placekitten.com/g/200/208",
			 "userDescription": "This is a fake user I",
			 "userActive": true,
			 "userDestinations": ["ChIJOwg_06VPwokRYv534QaPC8g", "ChIJX8wwy6Vw44kRh2xoiWSOOsU", "ChIJVTPokywQkFQRmtVEaUZlJRA"], 
			 "userLikedTrips": [newYorkTestAID, cambridgeTestAID, cambridgeTestBID, seattleTestAID, seattleTestBID],
			 "userCreatedTrips": [cambridgeTestAID, seattleTestAID]
			},
			{"userID": "userJ",
			 "userName": "userJ",
			 "userEmail": "",
			 "userPhoto": "http://placekitten.com/g/200/209",
			 "userDescription": "This is a fake user J",
			 "userActive": true,
			 "userDestinations": ["ChIJOwg_06VPwokRYv534QaPC8g", "ChIJX8wwy6Vw44kRh2xoiWSOOsU", "ChIJVTPokywQkFQRmtVEaUZlJRA"], 
			 "userLikedTrips": [newYorkTestAID, cambridgeTestAID, cambridgeTestBID, seattleTestAID, seattleTestBID],
			 "userCreatedTrips": [cambridgeTestAID, seattleTestAID]
			},
			{"userID": "userK",
			 "userName": "userK",
			 "userEmail": "",
			 "userPhoto": "http://placekitten.com/g/200/210",
			 "userDescription": "This is a fake user K",
			 "userActive": true,
			 "userDestinations": ["ChIJOwg_06VPwokRYv534QaPC8g", "ChIJX8wwy6Vw44kRh2xoiWSOOsU", "ChIJVTPokywQkFQRmtVEaUZlJRA"], 
			 "userLikedTrips": [newYorkTestAID, cambridgeTestAID, cambridgeTestBID, seattleTestAID, seattleTestBID],
			 "userCreatedTrips": [cambridgeTestAID, seattleTestAID]
			},
			{"userID": "userL",
			 "userName": "userL",
			 "userEmail": "",
			 "userPhoto": "http://placekitten.com/g/200/211",
			 "userDescription": "This is a fake user L",
			 "userActive": true,
			 "userDestinations": ["ChIJOwg_06VPwokRYv534QaPC8g", "ChIJX8wwy6Vw44kRh2xoiWSOOsU", "ChIJVTPokywQkFQRmtVEaUZlJRA"], 
			 "userLikedTrips": [newYorkTestAID, cambridgeTestAID, cambridgeTestBID, seattleTestAID, seattleTestBID],
			 "userCreatedTrips": [cambridgeTestAID, seattleTestAID]
			},
			{"userID": "userM",
			 "userName": "userM",
			 "userEmail": "",
			 "userPhoto": "http://placekitten.com/g/200/212",
			 "userDescription": "This is a fake user M",
			 "userActive": true,
			 "userDestinations": ["ChIJOwg_06VPwokRYv534QaPC8g", "ChIJX8wwy6Vw44kRh2xoiWSOOsU", "ChIJVTPokywQkFQRmtVEaUZlJRA"], 
			 "userLikedTrips": [newYorkTestAID, cambridgeTestAID, cambridgeTestBID, seattleTestAID, seattleTestBID],
			 "userCreatedTrips": [cambridgeTestAID, seattleTestAID]
			},
			{"userID": "userN",
			 "userName": "userN",
			 "userEmail": "",
			 "userPhoto": "http://placekitten.com/g/200/213",
			 "userDescription": "This is a fake user N",
			 "userActive": true,
			 "userDestinations": ["ChIJOwg_06VPwokRYv534QaPC8g", "ChIJX8wwy6Vw44kRh2xoiWSOOsU", "ChIJVTPokywQkFQRmtVEaUZlJRA"], 
			 "userLikedTrips": [newYorkTestAID, cambridgeTestAID, cambridgeTestBID, seattleTestAID, seattleTestBID],
			 "userCreatedTrips": [cambridgeTestAID, seattleTestAID]
			},
			{"userID": "userO",
			 "userName": "userO",
			 "userEmail": "",
			 "userPhoto": "http://placekitten.com/g/200/214",
			 "userDescription": "This is a fake user O",
			 "userActive": true,
			 "userDestinations": ["ChIJOwg_06VPwokRYv534QaPC8g", "ChIJX8wwy6Vw44kRh2xoiWSOOsU", "ChIJVTPokywQkFQRmtVEaUZlJRA"], 
			 "userLikedTrips": [newYorkTestAID, cambridgeTestAID, cambridgeTestBID, seattleTestAID, seattleTestBID],
			 "userCreatedTrips": [cambridgeTestAID, seattleTestAID]
			},
			{"userID": "userP",
			 "userName": "userP",
			 "userEmail": "",
			 "userPhoto": "http://placekitten.com/g/200/215",
			 "userDescription": "This is a fake user P",
			 "userActive": true,
			 "userDestinations": ["ChIJOwg_06VPwokRYv534QaPC8g", "ChIJX8wwy6Vw44kRh2xoiWSOOsU", "ChIJVTPokywQkFQRmtVEaUZlJRA"], 
			 "userLikedTrips": [newYorkTestAID, cambridgeTestAID, cambridgeTestBID, seattleTestAID, seattleTestBID],
			 "userCreatedTrips": [cambridgeTestAID, seattleTestAID]
			},
			{"userID": "userQ",
			 "userName": "userQ",
			 "userEmail": "",
			 "userPhoto": "http://placekitten.com/g/200/216",
			 "userDescription": "This is a fake user Q",
			 "userActive": true,
			 "userDestinations": ["ChIJOwg_06VPwokRYv534QaPC8g", "ChIJX8wwy6Vw44kRh2xoiWSOOsU", "ChIJVTPokywQkFQRmtVEaUZlJRA"], 
			 "userLikedTrips": [newYorkTestAID, cambridgeTestAID, cambridgeTestBID, seattleTestAID, seattleTestBID],
			 "userCreatedTrips": [cambridgeTestAID, seattleTestAID]
			},
			{"userID": "userR",
			 "userName": "userR",
			 "userEmail": "",
			 "userPhoto": "http://placekitten.com/g/200/217",
			 "userDescription": "This is a fake user R",
			 "userActive": true,
			 "userDestinations": ["ChIJOwg_06VPwokRYv534QaPC8g", "ChIJX8wwy6Vw44kRh2xoiWSOOsU", "ChIJVTPokywQkFQRmtVEaUZlJRA"], 
			 "userLikedTrips": [newYorkTestAID, cambridgeTestAID, cambridgeTestBID, seattleTestAID, seattleTestBID],
			 "userCreatedTrips": [cambridgeTestAID, seattleTestAID]
			},
			{"userID": "userS",
			 "userName": "userS",
			 "userEmail": "",
			 "userPhoto": "http://placekitten.com/g/200/218",
			 "userDescription": "This is a fake user S",
			 "userActive": true,
			 "userDestinations": ["ChIJOwg_06VPwokRYv534QaPC8g", "ChIJX8wwy6Vw44kRh2xoiWSOOsU", "ChIJVTPokywQkFQRmtVEaUZlJRA"], 
			 "userLikedTrips": [newYorkTestAID, cambridgeTestAID, cambridgeTestBID, seattleTestAID, seattleTestBID],
			 "userCreatedTrips": [cambridgeTestAID, seattleTestAID]
			},
			{"userID": "userT",
			 "userName": "userT",
			 "userEmail": "",
			 "userPhoto": "http://placekitten.com/g/200/219",
			 "userDescription": "This is a fake user T",
			 "userActive": true,
			 "userDestinations": ["ChIJOwg_06VPwokRYv534QaPC8g", "ChIJX8wwy6Vw44kRh2xoiWSOOsU", "ChIJVTPokywQkFQRmtVEaUZlJRA"], 
			 "userLikedTrips": [newYorkTestAID, cambridgeTestAID, cambridgeTestBID, seattleTestAID, seattleTestBID],
			 "userCreatedTrips": [cambridgeTestAID, seattleTestAID]
			},
			{"userID": "userU",
			 "userName": "userU",
			 "userEmail": "",
			 "userPhoto": "http://placekitten.com/g/200/220",
			 "userDescription": "This is a fake user U",
			 "userActive": true,
			 "userDestinations": ["ChIJOwg_06VPwokRYv534QaPC8g", "ChIJX8wwy6Vw44kRh2xoiWSOOsU", "ChIJVTPokywQkFQRmtVEaUZlJRA"], 
			 "userLikedTrips": [newYorkTestAID, cambridgeTestAID, cambridgeTestBID, seattleTestAID, seattleTestBID],
			 "userCreatedTrips": [cambridgeTestAID, seattleTestAID]
			},
			{"userID": "userV",
			 "userName": "userV",
			 "userEmail": "",
			 "userPhoto": "http://placekitten.com/g/200/221",
			 "userDescription": "This is a fake user V",
			 "userActive": true,
			 "userDestinations": ["ChIJOwg_06VPwokRYv534QaPC8g", "ChIJX8wwy6Vw44kRh2xoiWSOOsU", "ChIJVTPokywQkFQRmtVEaUZlJRA"], 
			 "userLikedTrips": [newYorkTestAID, cambridgeTestAID, cambridgeTestBID, seattleTestAID, seattleTestBID],
			 "userCreatedTrips": [cambridgeTestAID, seattleTestAID]
			},
			{"userID": "userW",
			 "userName": "userW",
			 "userEmail": "",
			 "userPhoto": "http://placekitten.com/g/200/222",
			 "userDescription": "This is a fake user W",
			 "userActive": true,
			 "userDestinations": ["ChIJOwg_06VPwokRYv534QaPC8g", "ChIJX8wwy6Vw44kRh2xoiWSOOsU", "ChIJVTPokywQkFQRmtVEaUZlJRA"], 
			 "userLikedTrips": [newYorkTestAID, cambridgeTestAID, cambridgeTestBID, seattleTestAID, seattleTestBID],
			 "userCreatedTrips": [cambridgeTestAID, seattleTestAID]
			},
			{"userID": "userX",
			 "userName": "userX",
			 "userEmail": "",
			 "userPhoto": "http://placekitten.com/g/200/223",
			 "userDescription": "This is a fake user X",
			 "userActive": true,
			 "userDestinations": ["ChIJOwg_06VPwokRYv534QaPC8g", "ChIJX8wwy6Vw44kRh2xoiWSOOsU", "ChIJVTPokywQkFQRmtVEaUZlJRA"], 
			 "userLikedTrips": [newYorkTestAID, cambridgeTestAID, cambridgeTestBID, seattleTestAID, seattleTestBID],
			 "userCreatedTrips": [cambridgeTestAID, seattleTestAID]
			},
			{"userID": "userY",
			 "userName": "userY",
			 "userEmail": "",
			 "userPhoto": "http://placekitten.com/g/200/224",
			 "userDescription": "This is a fake user Y",
			 "userActive": true,
			 "userDestinations": ["ChIJOwg_06VPwokRYv534QaPC8g", "ChIJX8wwy6Vw44kRh2xoiWSOOsU", "ChIJVTPokywQkFQRmtVEaUZlJRA"], 
			 "userLikedTrips": [newYorkTestAID, cambridgeTestAID, cambridgeTestBID, seattleTestAID, seattleTestBID],
			 "userCreatedTrips": [cambridgeTestAID, seattleTestAID]
			},
			{"userID": "userZ",
			 "userName": "userZ",
			 "userEmail": "",
			 "userPhoto": "http://placekitten.com/g/200/225",
			 "userDescription": "This is a fake user Z",
			 "userActive": true,
			 "userDestinations": ["ChIJOwg_06VPwokRYv534QaPC8g", "ChIJX8wwy6Vw44kRh2xoiWSOOsU", "ChIJVTPokywQkFQRmtVEaUZlJRA"], 
			 "userLikedTrips": [newYorkTestAID, cambridgeTestAID, cambridgeTestBID, seattleTestAID, seattleTestBID],
			 "userCreatedTrips": [cambridgeTestAID, seattleTestAID]
			}]

			{"userID": "664614793719454",
			 "userName": "Alisa Ono",
			 "userEmail": "alisao (at) mit (dot) edu",
			 "userPhoto": "http://res.cloudinary.com/tabibuddy/image/upload/c_thumb,g_face,h_300,w_300/v1485470184/664614793719454.jpg",
			 "userDescription": "Hi I'm Alisa, creator of tabibuddy!",
			 "userActive": true,
			 "userDestinations": ["ChIJmUQ05l2AHWARyJIoB3SpKPE"], 
			 "userLikedTrips": [alisaTripAID],
			 "userCreatedTrips": [alisaTripAID]
			},
			{"userID": "10158044489410487",
			 "userName": "Purnawirman Huang",
			 "userEmail": "nn@gmail.com",
			 "userPhoto": "http://res.cloudinary.com/tabibuddy/image/upload/c_thumb,g_face,h_300,w_300/v1485326790/10158044489410487.jpg",
			 "userDescription": "I'm the first user of tabibuddy, yay!",
			 "userActive": true,
			 "userDestinations": ["ChIJOSmpLuR5j4AR0u9gOcikHdo","ChIJE9on3F3HwoAR9AhGJW_fL-I","ChIJ0X31pIK3voARo3mz1ebVzDo"], 
			 "userLikedTrips": [purnaTripAID, purnaTripBID, purnaTripCID],
			 "userCreatedTrips": [purnaTripAID, purnaTripBID, purnaTripCID]
			},
			{"userID": "10155769496177729",
			 "userName": "Christina Lee",
			 "userEmail": "",
			 "userPhoto": "http://res.cloudinary.com/tabibuddy/image/upload/c_thumb,g_face,h_200,w_200/v1485053998/125.jpg",
			 "userDescription": "",
			 "userActive": true,
			 "userDestinations": ["ChIJNc0j6G3raDURpwhxJHTL2DU"], 
			 "userLikedTrips": [christinaTripAID],
			 "userCreatedTrips": [christinaTripAID]
			},
			{ "_id": "588fbad7ab2ad529bc7d6f0b", 
			  "userPhoto": "https://res.cloudinary.com/tabibuddy/image/upload/c_thumb,g_face,h_300,w_300/v1485838258/1216321191789270.jpg", 
			  "userName": "Kalyn Bowen", 
			  "userID": "1216321191789270", 
			  "userDescription": "Japanese girl from Hawaii/Boston, I mostly travel to Asian countries", 
			  "userEmail": "", 
			  "userCreatedTrips": [ "588fbe17b21c8438f0ba72d0", "588fbf04b21c8438f0ba72d3", "588fbfe17b88e81a9cc7c901", "588fc11f7b88e81a9cc7c904", "588fc1877b88e81a9cc7c906", "588fc20b7b88e81a9cc7c908", "588fc27b7b88e81a9cc7c90a", "588fc2e77b88e81a9cc7c90d", "588fc34e7b88e81a9cc7c90f", "588fc3957b88e81a9cc7c911", "588fc3bb7b88e81a9cc7c913", "588fc3eb7b88e81a9cc7c915", "588fc6bd28c610328cc765ba", "588fc6f328c610328cc765bc", "588fc71628c610328cc765be" ], "userLikedTrips": [ "588f9fdbd714d531204e345b", "588fa37488d8211404306167", "588fbe17b21c8438f0ba72d0", "588fbf04b21c8438f0ba72d3", "588fbfe17b88e81a9cc7c901", "588fc11f7b88e81a9cc7c904", "588fc1877b88e81a9cc7c906", "588fc20b7b88e81a9cc7c908", "588fc27b7b88e81a9cc7c90a", "588fc2e77b88e81a9cc7c90d", "588fc34e7b88e81a9cc7c90f", "588fc3957b88e81a9cc7c911", "588fc3bb7b88e81a9cc7c913", "588fc3eb7b88e81a9cc7c915", "588fc6bd28c610328cc765ba", "588fc6f328c610328cc765bc", "588fc71628c610328cc765be" ], "userDestinations": [ "ChIJTUbDjDsYAHwRbJen81_1KEs", "ChIJByjqov3-AzQR2pT0dDW0bUg", "ChIJCWW2u-xbGGARAFQoYPaDlgY", "ChIJeZG7TctYAHwRx_CZ3-LyTqI", "ChIJmY8AduF6ATQRrXXv59PpHbk" ], 
			  "userActive": true 
			}, 
			]



var trips = [
			{
			  "tripID": newYorkTestAID,
			  "tripName": "newYorkTestA",
			  "tripCreatorID": "userA",
			  "tripCreatorName": "userA",
			  "tripDestinationID": "ChIJOwg_06VPwokRYv534QaPC8g",
			  "tripDestinationName": "New York, NY, USA",
			  "tripType": "Food",
			  "tripActive": true,
			  "tripPhoto": "http://res.cloudinary.com/tabibuddy/image/upload/v1485302951/newyork1.jpg",
			  "tripDescription": "This is a test trip for new york A",
			  "tripLikedUsers": ["userA", "userB", "userC"],
			  "tripSeason": "Spring",
			  "tripDuration": 3,
			  "tripBudget": 200,
			},
			{
			  "tripID": newYorkTestBID,
			  "tripName": "newYorkTestB",
			  "tripCreatorID": "userB",
			  "tripCreatorName": "userB",
			  "tripDestinationID": "ChIJOwg_06VPwokRYv534QaPC8g",
			  "tripDestinationName": "New York, NY, USA",
			  "tripType": "Food",
			  "tripActive": true,
			  "tripPhoto": "http://res.cloudinary.com/tabibuddy/image/upload/v1485302948/newyork2.jpg",
			  "tripDescription": "This is a test trip for new york B",
			  "tripLikedUsers": ["userA", "userB"],
			  "tripSeason": "Winter",
			  "tripDuration": 1,
			  "tripBudget": 50,
			},
			{
			  "tripID": newYorkTestCID,
			  "tripName": "newYorkTestC",
			  "tripCreatorID": "userC",
			  "tripCreatorName": "userC",
			  "tripDestinationID": "ChIJOwg_06VPwokRYv534QaPC8g",
			  "tripDestinationName": "New York, NY, USA",
			  "tripType": "Food",
			  "tripActive": true,
			  "tripPhoto": "http://res.cloudinary.com/tabibuddy/image/upload/v1485302929/newyork3.jpg",
			  "tripDescription": "This is a test trip for new york C",
			  "tripLikedUsers": ["userA", "userB"],
			  "tripSeason": "Winter",
			  "tripDuration": 1,
			  "tripBudget": 50,
			},
			{
			  "tripID": newYorkTestDID,
			  "tripName": "newYorkTestD",
			  "tripCreatorID": "userD",
			  "tripCreatorName": "userD",
			  "tripDestinationID": "ChIJOwg_06VPwokRYv534QaPC8g",
			  "tripDestinationName": "New York, NY, USA",
			  "tripType": "Food",
			  "tripActive": true,
			  "tripPhoto": "http://res.cloudinary.com/tabibuddy/image/upload/v1485302922/newyork4.jpg",
			  "tripDescription": "This is a test trip for new york D",
			  "tripLikedUsers": ["userA", "userB"],
			  "tripSeason": "Winter",
			  "tripDuration": 1,
			  "tripBudget": 50,
			},
			{
			  "tripID": newYorkTestEID,
			  "tripName": "newYorkTestE",
			  "tripCreatorID": "userE",
			  "tripCreatorName": "userE",
			  "tripDestinationID": "ChIJOwg_06VPwokRYv534QaPC8g",
			  "tripDestinationName": "New York, NY, USA",
			  "tripType": "Food",
			  "tripActive": true,
			  "tripPhoto": "http://res.cloudinary.com/tabibuddy/image/upload/v1485302925/newyork5.jpg",
			  "tripDescription": "This is a test trip for new york D",
			  "tripLikedUsers": ["userA", "userB"],
			  "tripSeason": "Winter",
			  "tripDuration": 1,
			  "tripBudget": 50,
			},
			{
			  "tripID": newYorkTestFID,
			  "tripName": "newYorkTestF",
			  "tripCreatorID": "userF",
			  "tripCreatorName": "userF",
			  "tripDestinationID": "ChIJOwg_06VPwokRYv534QaPC8g",
			  "tripDestinationName": "New York, NY, USA",
			  "tripType": "Food",
			  "tripActive": true,
			  "tripPhoto": "http://res.cloudinary.com/tabibuddy/image/upload/v1485302921/newyork6.jpg",
			  "tripDescription": "This is a test trip for new york F",
			  "tripLikedUsers": ["userA", "userB"],
			  "tripSeason": "Winter",
			  "tripDuration": 1,
			  "tripBudget": 50,
			},
			{
			  "tripID": newYorkTestGID,
			  "tripName": "newYorkTestG",
			  "tripCreatorID": "userG",
			  "tripCreatorName": "userG",
			  "tripDestinationID": "ChIJOwg_06VPwokRYv534QaPC8g",
			  "tripDestinationName": "New York, NY, USA",
			  "tripType": "Food",
			  "tripActive": true,
			  "tripPhoto": "http://res.cloudinary.com/tabibuddy/image/upload/v1485302901/newyork7.jpg",
			  "tripDescription": "This is a test trip for new york G",
			  "tripLikedUsers": ["userA", "userB"],
			  "tripSeason": "Winter",
			  "tripDuration": 1,
			  "tripBudget": 50,
			},
			{
			  "tripID": newYorkTestHID,
			  "tripName": "newYorkTestH",
			  "tripCreatorID": "userH",
			  "tripCreatorName": "userH",
			  "tripDestinationID": "ChIJOwg_06VPwokRYv534QaPC8g",
			  "tripDestinationName": "New York, NY, USA",
			  "tripType": "Food",
			  "tripActive": true,
			  "tripPhoto": "http://res.cloudinary.com/tabibuddy/image/upload/v1485302913/newyork8.jpg",
			  "tripDescription": "This is a test trip for new york H",
			  "tripLikedUsers": ["userA", "userB"],
			  "tripSeason": "Winter",
			  "tripDuration": 1,
			  "tripBudget": 50,
			},
			{
			  "tripID": newYorkTestIID,
			  "tripName": "newYorkTestI",
			  "tripCreatorID": "userI",
			  "tripCreatorName": "userI",
			  "tripDestinationID": "ChIJOwg_06VPwokRYv534QaPC8g",
			  "tripDestinationName": "New York, NY, USA",
			  "tripType": "Food",
			  "tripActive": true,
			  "tripPhoto": "http://res.cloudinary.com/tabibuddy/image/upload/v1485302916/newyork9.jpg",
			  "tripDescription": "This is a test trip for new york I",
			  "tripLikedUsers": ["userA", "userB"],
			  "tripSeason": "Winter",
			  "tripDuration": 1,
			  "tripBudget": 50,
			},
			{
			  "tripID": newYorkTestJID,
			  "tripName": "newYorkTestJ",
			  "tripCreatorID": "userJ",
			  "tripCreatorName": "userJ",
			  "tripDestinationID": "ChIJOwg_06VPwokRYv534QaPC8g",
			  "tripDestinationName": "New York, NY, USA",
			  "tripType": "Food",
			  "tripActive": true,
			  "tripPhoto": "http://res.cloudinary.com/tabibuddy/image/upload/v1485302897/newyork10.jpg",
			  "tripDescription": "This is a test trip for new york J",
			  "tripLikedUsers": ["userA", "userB"],
			  "tripSeason": "Winter",
			  "tripDuration": 1,
			  "tripBudget": 50,
			},
			{
			  "tripID": newYorkTestKID,
			  "tripName": "newYorkTestK",
			  "tripCreatorID": "userK",
			  "tripCreatorName": "userK",
			  "tripDestinationID": "ChIJOwg_06VPwokRYv534QaPC8g",
			  "tripDestinationName": "New York, NY, USA",
			  "tripType": "Food",
			  "tripActive": true,
			  "tripPhoto": "http://res.cloudinary.com/tabibuddy/image/upload/v1485302895/newyork11.jpg",
			  "tripDescription": "This is a test trip for new york K",
			  "tripLikedUsers": ["userA", "userB"],
			  "tripSeason": "Winter",
			  "tripDuration": 1,
			  "tripBudget": 50,
			},
			{
			  "tripID": newYorkTestLID,
			  "tripName": "newYorkTestL",
			  "tripCreatorID": "userL",
			  "tripCreatorName": "userL",
			  "tripDestinationID": "ChIJOwg_06VPwokRYv534QaPC8g",
			  "tripDestinationName": "New York, NY, USA",
			  "tripType": "Food",
			  "tripActive": true,
			  "tripPhoto": "http://res.cloudinary.com/tabibuddy/image/upload/v1485302894/newyork12.jpg",
			  "tripDescription": "This is a test trip for new york L",
			  "tripLikedUsers": ["userA", "userB"],
			  "tripSeason": "Winter",
			  "tripDuration": 1,
			  "tripBudget": 50,
			},
			{
			  "tripID": newYorkTestMID,
			  "tripName": "newYorkTestM",
			  "tripCreatorID": "userM",
			  "tripCreatorName": "userM",
			  "tripDestinationID": "ChIJOwg_06VPwokRYv534QaPC8g",
			  "tripDestinationName": "New York, NY, USA",
			  "tripType": "Food",
			  "tripActive": true,
			  "tripPhoto": "http://res.cloudinary.com/tabibuddy/image/upload/v1485302896/newyork13.jpg",
			  "tripDescription": "This is a test trip for new york M",
			  "tripLikedUsers": ["userA", "userB"],
			  "tripSeason": "Winter",
			  "tripDuration": 1,
			  "tripBudget": 50,
			},
			{
			  "tripID": newYorkTestNID,
			  "tripName": "newYorkTestN",
			  "tripCreatorID": "userN",
			  "tripCreatorName": "userN",
			  "tripDestinationID": "ChIJOwg_06VPwokRYv534QaPC8g",
			  "tripDestinationName": "New York, NY, USA",
			  "tripType": "Food",
			  "tripActive": true,
			  "tripPhoto": "http://res.cloudinary.com/tabibuddy/image/upload/v1485302887/newyork14.jpg",
			  "tripDescription": "This is a test trip for new york N",
			  "tripLikedUsers": ["userA", "userB"],
			  "tripSeason": "Winter",
			  "tripDuration": 1,
			  "tripBudget": 50,
			},
			{
			  "tripID": newYorkTestOID,
			  "tripName": "newYorkTestO",
			  "tripCreatorID": "userO",
			  "tripCreatorName": "userO",
			  "tripDestinationID": "ChIJOwg_06VPwokRYv534QaPC8g",
			  "tripDestinationName": "New York, NY, USA",
			  "tripType": "Food",
			  "tripActive": true,
			  "tripPhoto": "http://res.cloudinary.com/tabibuddy/image/upload/v1485302886/newyork15.jpg",
			  "tripDescription": "This is a test trip for new york O",
			  "tripLikedUsers": ["userA", "userB"],
			  "tripSeason": "Winter",
			  "tripDuration": 1,
			  "tripBudget": 50,
			},
			{
			  "tripID": newYorkTestPID,
			  "tripName": "newYorkTestP",
			  "tripCreatorID": "userP",
			  "tripCreatorName": "userP",
			  "tripDestinationID": "ChIJOwg_06VPwokRYv534QaPC8g",
			  "tripDestinationName": "New York, NY, USA",
			  "tripType": "Food",
			  "tripActive": true,
			  "tripPhoto": "http://res.cloudinary.com/tabibuddy/image/upload/v1485302880/newyork16.jpg",
			  "tripDescription": "This is a test trip for new york P",
			  "tripLikedUsers": ["userA", "userB"],
			  "tripSeason": "Winter",
			  "tripDuration": 1,
			  "tripBudget": 50,
			},
			{
			  "tripID": newYorkTestQID,
			  "tripName": "newYorkTestQ",
			  "tripCreatorID": "userQ",
			  "tripCreatorName": "userQ",
			  "tripDestinationID": "ChIJOwg_06VPwokRYv534QaPC8g",
			  "tripDestinationName": "New York, NY, USA",
			  "tripType": "Food",
			  "tripActive": true,
			  "tripPhoto": "http://res.cloudinary.com/tabibuddy/image/upload/v1485302880/newyork17.jpg",
			  "tripDescription": "This is a test trip for new york Q",
			  "tripLikedUsers": ["userA", "userB"],
			  "tripSeason": "Winter",
			  "tripDuration": 1,
			  "tripBudget": 50,
			},
			{
			  "tripID": newYorkTestRID,
			  "tripName": "newYorkTestR",
			  "tripCreatorID": "userR",
			  "tripCreatorName": "userR",
			  "tripDestinationID": "ChIJOwg_06VPwokRYv534QaPC8g",
			  "tripDestinationName": "New York, NY, USA",
			  "tripType": "Food",
			  "tripActive": true,
			  "tripPhoto": "http://res.cloudinary.com/tabibuddy/image/upload/v1485302758/newyork18.jpg",
			  "tripDescription": "This is a test trip for new york R",
			  "tripLikedUsers": ["userA", "userB"],
			  "tripSeason": "Winter",
			  "tripDuration": 1,
			  "tripBudget": 50,
			},
			{
			  "tripID": cambridgeTestAID,
			  "tripName": "cambridgeTestA",
			  "tripCreatorID": "userC",
			  "tripCreatorName": "userC",
			  "tripDestinationID": "ChIJX8wwy6Vw44kRh2xoiWSOOsU",
			  "tripDestinationName": "Cambridge, MA, USA",
			  "tripType": "History",
			  "tripActive": true,
			  "tripPhoto": "http://placekitten.com/g/200/206",
			  "tripDescription": "This is a test trip for cambridge A",
			  "tripLikedUsers": ["userA", "userC"],
			  "tripSeason": "Fall",
			  "tripDuration": 4,
			  "tripBudget": 150,
			},
			{
			  "tripID": cambridgeTestBID,
			  "tripName": "cambridgeTestB",
			  "tripCreatorID": "userA",
			  "tripCreatorName": "userA",
			  "tripDestinationID": "ChIJX8wwy6Vw44kRh2xoiWSOOsU",
			  "tripDestinationName": "Cambridge, MA, USA",
			  "tripType": "Food",
			  "tripActive": true,
			  "tripPhoto": "http://placekitten.com/g/200/207",
			  "tripDescription": "This is a test trip for cambridge B",
			  "tripLikedUsers": ["userA", "userC"],
			  "tripSeason": "Spring",
			  "tripDuration": 8,
			  "tripBudget": 10000,
			},
			{
			  "tripID": seattleTestAID,
			  "tripName": "seattleTestA",
			  "tripCreatorID": "userC",
			  "tripCreatorName": "userC",
			  "tripDestinationID": "ChIJVTPokywQkFQRmtVEaUZlJRA",
			  "tripDestinationName": "Seattle, WA, USA",
			  "tripType": "Food",
			  "tripActive": true,
			  "tripPhoto": "http://placekitten.com/g/200/208",
			  "tripDescription": "This is a test trip for seattle A",
			  "tripLikedUsers": ["userA", "userC"],
			  "tripSeason": "Summer",
			  "tripDuration": 3,
			  "tripBudget": 650,
			},
			{
			  "tripID": seattleTestBID,
			  "tripName": "seattleTestB",
			  "tripCreatorID": "userA",
			  "tripCreatorName": "userA",
			  "tripDestinationID": "ChIJVTPokywQkFQRmtVEaUZlJRA",
			  "tripDestinationName": "Seattle, WA, USA",
			  "tripType": "Food",
			  "tripActive": true,
			  "tripPhoto": "http://placekitten.com/g/200/209",
			  "tripDescription": "This is a test trip for seattle B",
			  "tripLikedUsers": ["userA", "userC"],
			  "tripSeason": "Spring",
			  "tripDuration": 9,
			  "tripBudget": 10,
			},			
			{ 
			  "tripID": alisaTripAID, 
			  "tripName": "Snow Cat", 
			  "tripCreatorID": "664614793719454", 
			  "tripCreatorName": "Alisa Ono", 
			  "tripDestinationID": "ChIJmUQ05l2AHWARyJIoB3SpKPE", 
			  "tripDestinationName": "Nagano, Nagano Prefecture, Japan", 
			  "tripType": "Adventure", 
			  "tripActive": true,
			  "tripPhoto": "https://res.cloudinary.com/tabibuddy/image/upload/c_thumb,g_auto,h_500,w_500/v1485308652/588802e3bfda072fb896bfba.jpg", 
			  "tripDescription": "Snow cat witnessed in Nagano, Japan. You can only find them on a cold, snowy day.", 
			  "tripLikedUsers": [ "664614793719454" ], 
			  "tripSeason": "Winter", 
			  "tripBudget": 0, 
			  "tripDuration": 1, 
			},
			{ 
			  "tripID": purnaTripAID, 
			  "tripName": "Dont try this at home!", 
			  "tripCreatorID": "10158044489410487", 
			  "tripCreatorName": "Purnawirman Huang", 
			  "tripDestinationID": "ChIJOSmpLuR5j4AR0u9gOcikHdo", 
			  "tripDestinationName": "San Bruno, CA, USA", 
			  "tripType": "Adventure",
			  "tripActive": true, 
			  "tripPhoto": "https://res.cloudinary.com/tabibuddy/image/upload/c_thumb,g_auto,h_500,w_500/v1485327112/58884b0824be4c2bb0ff700f.jpg", 
			  "tripDescription": "On a long trip on pacific highway, we discovered the forbidden forest.", 
			  "tripLikedUsers": [ "10158044489410487" ], 
			  "tripSeason": "Summer", 
			  "tripBudget": 100, 
			  "tripDuration": 1, 
			},
			{ 
			  "tripID": purnaTripBID, 
			  "tripName": "Caution! Doctor hate this guy!!", 
			  "tripCreatorID": "10158044489410487", 
			  "tripCreatorName": "Purnawirman Huang", 
			  "tripDestinationID": "ChIJE9on3F3HwoAR9AhGJW_fL-I", 
			  "tripDestinationName": "Los Angeles, CA, USA", 
			  "tripType": "Adventure", 
			  "tripPhoto": "https://res.cloudinary.com/tabibuddy/image/upload/c_thumb,g_auto,h_500,w_500/v1485696391/588ded6c1d060f2e18799e8b.jpg", 
			  "tripDescription": "How to be strong like me", 
			  "tripSeason": "Winter",
			  "tripBudget": 0.5, 
			  "tripDuration": 2, 
			  "tripLikedUsers": [ "10158044489410487" ], 
			  "tripActive": true }, 
			{ 
			  "tripID": purnaTripCID, 
			  "tripName": "Hold me now", 
			  "tripCreatorID": "10158044489410487", 
			  "tripCreatorName": "Purnawirman Huang", 
			  "tripDestinationID": "ChIJ0X31pIK3voARo3mz1ebVzDo", 
			  "tripDestinationName": "Las Vegas, NV, USA", 
			  "tripType": "Adventure", 
			  "tripPhoto": "https://res.cloudinary.com/tabibuddy/image/upload/c_thumb,g_auto,h_500,w_500/v1485696585/588dee3a1d060f2e18799e8e.jpg", 
			  "tripDescription": "I'm six feet from the edge and I'm thinking..", 
			  "tripSeason": "Winter", 
			  "tripBudget": 120, 
			  "tripDuration": 1, 
			  "tripLikedUsers": [ "10158044489410487" ], 
			  "tripActive": true },
			{ 
			  "tripID": christinaTripAID, 
			  "tripName": "Pie store 'Pie-o-lin'", 
			  "tripCreatorID": "10155769496177729", 
			  "tripCreatorName": "Christina Lee", 
			  "tripDestinationID": "ChIJNc0j6G3raDURpwhxJHTL2DU", 
			  "tripDestinationName": "Busan, South Korea", 
			  "tripType": "Food", 
			  "tripActive": true, 
			  "tripPhoto": "https://res.cloudinary.com/tabibuddy/image/upload/c_thumb,g_auto,h_500,w_500/v1485307986/58880052bfda072fb896bfb7.jpg", 
			  "tripDescription": "Great pie store in Busan! Name is 'Pie-o-lin', as in it rhymes with 'violin' haha XD Their pecan pies and espresso are amazingggg <3", 
			  "tripLikedUsers": [ "10155769496177729" ], 
			  "tripSeason": "Fall", 
			  "tripBudget": 10, 
			  "tripDuration": 10, 
			},
			]


var destinations = [{
					"destinationID": "ChIJOwg_06VPwokRYv534QaPC8g",
					"destinationName": "New York, NY, USA",
					"tabies": [newYorkTestAID, newYorkTestBID],
					"buddies": ["userA", "userB", "userC"],
					},
					{
					"destinationID": "ChIJX8wwy6Vw44kRh2xoiWSOOsU",
					"destinationName": "Cambridge, MA, USA",
					"tabies": [cambridgeTestAID, cambridgeTestBID],
					"buddies": ["userA", "userC"],
					},
					{
					"destinationID": "ChIJVTPokywQkFQRmtVEaUZlJRA",
					"destinationName": "Seattle, WA, USA",
					"tabies": [seattleTestAID, seattleTestBID],
					"buddies": ["userA", "userC"],
					},
					{
					"destinationID": "ChIJmUQ05l2AHWARyJIoB3SpKPE",
					"destinationName": "Nagano, Nagano Prefecture, Japan",
					"tabies": [alisaTripAID],
					"buddies": ["664614793719454"],
					},
					{
					"destinationID": "ChIJOSmpLuR5j4AR0u9gOcikHdo",
					"destinationName": "San Bruno, CA, USA",
					"tabies": [purnaTripAID],
					"buddies": ["10158044489410487"],
					},
					{
					"destinationID": "ChIJNc0j6G3raDURpwhxJHTL2DU",
					"destinationName": "Busan, South Korea",
					"tabies": [christinaTripAID],
					"buddies": ["10155769496177729"],
					},
					{
					"destinationID": "ChIJE9on3F3HwoAR9AhGJW_fL-I", 
					"destinationName": "Los Angeles, CA, USA", 
					"buddies": [ "10158044489410487" ], 
					"tabies": [ purnaTripBID ] }, 
					{  
				    "destinationID": "ChIJ0X31pIK3voARo3mz1ebVzDo", 
				    "destinationName": "Las Vegas, NV, USA", 
				    "buddies": [ "10158044489410487" ], 
				    "tabies": [ purnaTripCID ] 
					},]



module.exports = {
	users: users,
	trips: trips,
	destinations: destinations
}