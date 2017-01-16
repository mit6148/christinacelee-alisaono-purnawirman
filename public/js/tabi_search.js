var main = function() {
  var data = {trips:[{tripID: "12345", userID: "123", tripTitle: "test1", username: "user1", description: "this is test description1", liked: true, imageURL:'http://placekitten.com/g/150/150'},
  {tripID: "12346", userID: "124", tripTitle: "test2", username: "user2", description: "this is test description2", liked:false, imageURL:'http://placekitten.com/g/150/150'},
  {tripID: "12347", userID: "125", tripTitle: "test3", username: "user3", description: "this is test description3", liked:false, imageURL:'http://placekitten.com/g/150/150'},
  {tripID: "12348", userID: "126", tripTitle: "test4", username: "user4", description: "this is test description4", liked:true, imageURL:'http://placekitten.com/g/150/150'},
  {tripID: "12349", userID: "127", tripTitle: "test5", username: "user5", description: "this is test description5", liked:true, imageURL:'http://placekitten.com/g/150/150'},]};

  var source = $("#hbtemplate").html();
  var template = Handlebars.compile(source);

  $('#search-results-container').append(template(data));

  $('.trip').on('click',function(event){
    if ($(event.target).attr('class') === 'trip-author') {
        var userID = $(event.target).attr('rel');
        console.log(userID +' get req');   
    } else {
        var tripID = $(this).attr('rel');
        if ($(event.target).attr('class') === 'trip-like') {
            console.log(tripID+' liked post req');
        } else if ($(event.target).attr('class') === 'trip-like') {
            console.log(tripID+' unliked post req');
        } else {
            console.log(tripID+' display');
        }
    }
  });  
} 

$(document).ready(main);

