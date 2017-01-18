var main = function() {
  // loadFakeTestingData();
  $('.user').on('click', showUserProfile);
}

function showUserProfile(event){
  event.preventDefault();
  var userID = $(event.target).attr('rel');
  window.location = '/view_user/' + userID;
}

function loadFakeTestingData(){
  var fakeData = {users:[{userID: "123", username: "user1", userImageURL: 'http://placekitten.com/g/150/150',
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

  var source = $("#hbtemplate").html();
  var template = Handlebars.compile(source);

  $('#search-results-container').append(template(fakeData));
}

$(document).ready(main);


