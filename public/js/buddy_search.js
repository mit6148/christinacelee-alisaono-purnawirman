var main = function() {
  // var data = {users:[{userID: "123", username: "user1", userImageURL: 'http://placekitten.com/g/150/150',
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

  // $('#search-results-container').append(template(data));

  // $('.trip').on('click',function(event){
  //   if ($(event.target).attr('class') === 'trip-author') {
  //       var userID = $(event.target).attr('rel');
  //       console.log(userID +' get req');   
  //   } else {
  //       var tripID = $(this).attr('rel');
  //       if ($(event.target).attr('class') === 'trip-like') {
  //           console.log(tripID+' liked post req');
  //       } else if ($(event.target).attr('class') === 'trip-like') {
  //           console.log(tripID+' unliked post req');
  //       } else {
  //           console.log(tripID+' display');
  //       }
  //   }
  // });  
} 

$(document).ready(main);