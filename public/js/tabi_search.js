var myUserID = 'tempUserID';

var likeIconURL = "/images/like.png";
var unlikeIconURL = "/images/unlike.png";

var main = function() {

  //loadFakeTestingData();

  $('.trip').on('click',function(event){
    event.preventDefault();

    var target = $(event.target);
    var targetClass = target.attr('class');
    var tripID = $(this).attr('rel');

    switch (targetClass) {
      case 'trip-author':
        showUserProfile(target);
        break;
      case 'trip-like':
        likeTrip(target, tripID);
        break;
      case 'trip-unlike':
        unlikeTrip(target, tripID);
        break;
      default:
        showPopupTrip($(this));
        break;
    }
  });  

  $('#trip-popup-close-icon').on('click',closePopupTrip);

  $('#trip-popup').on('click',function(event){
    event.preventDefault();

    var target = $(event.target);
    var targetClass = $(event.target).attr('class');
    var tripID = $(this).attr('rel');

    switch (targetClass) {
      case 'trip-author':
        showUserProfile(target);
        break;
      case 'trip-like':
        likeTrip(target, tripID);
        break;
      case 'trip-unlike':
        unlikeTrip(target, tripID);
        break;
      default:
        break;
    }
  });
} 

function showUserProfile(eventTarget){
  var userID = eventTarget.attr('rel');
  window.location = '/view_user/' + userID;
}

function showPopupTrip(tripElement){
  var tripID = tripElement.attr('rel');
  var offset = $('body').scrollTop();
  var popupTripTop = 100 + offset;
  var popupCloseTop = 75 + offset;
  $('#trip-popup').css('top', popupTripTop+'px');
  $('#trip-popup-close').css('top',popupCloseTop+'px');
  $('#trip-popup-container').removeClass('popup-inactive');
  $('#trip-popup').append(tripElement.clone());
  $('#trip-popup .trip-description').removeClass('text-hidden');
  $('#trip-popup').attr('rel',tripID);
}

function closePopupTrip(event){
  event.preventDefault();
  $('#trip-popup-container').addClass('popup-inactive');
  $('#trip-popup').children('.trip').remove();
  $('#trip-popup').attr('rel',"");
}

function likeTrip (eventTarget, tripID) {
  console.log(tripID+' liked post req');

  $.ajax({
    url: '/like_trip',
    method: 'POST', 
    data: {
      trip_id: tripID,
      user_id: myUserID,
    }
  }).done(function(response){
    //db updates trip with like
    
    eventTarget.attr('class','trip-unlike');
    eventTarget.attr('src',unlikeIconURL);
  });
}

function unlikeTrip (eventTarget,tripID) {
  console.log(tripID+' unliked post req');
  
  $.ajax({
    url: '/unlike_trip',
    method: 'POST', 
    data: {
      trip_id: tripID,
      user_id: myUserID,

      // how to get my own user ID?
    }
  }).done(function(response){
    //db updates trip with unlike

    eventTarget.attr('class','trip-like');
    eventTarget.attr('src',likeIconURL);
  });
}

function loadFakeTestingData() {
  var fakeData = {trips:[{tripID: "12345", userID: "123", tripTitle: "test1", username: "user1", description: "this is test description1", liked: true, imageURL:'http://placekitten.com/g/150/150'},
  {tripID: "12346", userID: "124", tripTitle: "test2", username: "user2", description: "this is test description2", liked:false, imageURL:'http://placekitten.com/g/150/150'},
  {tripID: "12347", userID: "125", tripTitle: "test3", username: "user3", description: "this is test description3", liked:false, imageURL:'http://placekitten.com/g/150/150'},
  {tripID: "12348", userID: "126", tripTitle: "test4", username: "user4", description: "this is test description4", liked:true, imageURL:'http://placekitten.com/g/150/150'},
  {tripID: "12349", userID: "127", tripTitle: "test5", username: "user5", description: "this is test description5", liked:true, imageURL:'http://placekitten.com/g/150/150'},]};

  var source = $("#hbtemplate").html();
  var template = Handlebars.compile(source);

  $('#search-results-container').append(template(fakeData));
}

$(document).ready(main);

