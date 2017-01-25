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
			},]


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
			  "tripPhoto": "http://placekitten.com/g/200/204",
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
			  "tripPhoto": "http://placekitten.com/g/200/205",
			  "tripDescription": "This is a test trip for new york B",
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
			},]


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
					},]


module.exports = {
	users: users,
	trips: trips,
	destinations: destinations
}