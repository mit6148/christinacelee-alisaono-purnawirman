var main = function() {

  // loading fakeData for front end testing

  // var fakeData = {users:[{userID: "123", username: "user1", userImageURL: 'http://placekitten.com/g/150/150',
  // tripImages: [{tripImageURL:'http://placekitten.com/g/150/150'},{tripImageURL:'http://placekitten.com/g/150/150'},{tripImageURL:'http://placekitten.com/g/150/150'},{tripImageURL:'http://placekitten.com/g/150/150'}]},
  // {userID: "124", username: "user2", userImageURL: 'http://placekitten.com/g/150/150', 
  // tripImages: [{tripImageURL:'http://placekitten.com/g/150/150'},{tripImageURL:'http://placekitten.com/g/150/150'},{tripImageURL:'http://placekitten.com/g/150/150'},{tripImageURL:'http://placekitten.com/g/150/150'}]},
  // {userID: "125", username: "user3", userImageURL: 'http://placekitten.com/g/150/150',
  // tripImages: [{tripImageURL:'http://placekitten.com/g/150/150'},{tripImageURL:'http://placekitten.com/g/150/150'},{tripImageURL:'http://placekitten.com/g/150/150'},{tripImageURL:'http://placekitten.com/g/150/150'}]},
  // {userID: "126", username: "user4", userImageURL: 'http://placekitten.com/g/150/150',
  // tripImages: [{tripImageURL:'http://placekitten.com/g/150/150'},{tripImageURL:'http://placekitten.com/g/150/150'},{tripImageURL:'http://placekitten.com/g/150/150'},{tripImageURL:'http://placekitten.com/g/150/150'}]},
  // {userID: "127", username: "user5", userImageURL: 'http://placekitten.com/g/150/150',
  // tripImages: [{tripImageURL:'http://placekitten.com/g/150/150'},{tripImageURL:'http://placekitten.com/g/150/150'},{tripImageURL:'http://placekitten.com/g/150/150'},{tripImageURL:'http://placekitten.com/g/150/150'}]},
  // ]};

  // var source = $("#hbtemplate").html();
  // var template = Handlebars.compile(source);

  // $('#search-results-container').append(template(fakeData));

  $('.user').on('click',function(event){
    event.preventDefault();

    var userID = $(this).attr('rel');
    console.log(userID +' get req sending');

    window.location = '/view_user/' + userID;

    // $.ajax({
    //     url: '/view_user',
    //     method: 'GET',
    //     data: {
    //       user_id: userID,
    //     }
    //   }).done(function(response){
    //     console.log('user profile should be displayed');;
    // });   
  });  
} 

$(document).ready(main);


