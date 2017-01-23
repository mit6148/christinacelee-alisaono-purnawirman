var myUserID = 'tempUserID';

var likeIconURL = "/images/like.png";
var unlikeIconURL = "/images/unlike.png";

// var $j = jQuery.noConflict();

var main = function() {

	//loadFakeTestingData();	

  // $(function () {
  //   $('#user-photo-edit-dialog').dialog({
  //     autoOpen: false
  //   });
  
  //   $('.edit-user-image').on('click',editUserImage);
  // });

  // $(function () {
  //   $('#info-edit-dialog').dialog({
  //     autoOpen: false
  //   });
  
  //   $('#user-info-edit').on('click', openEditProfile);
  // });

  // $(function () {
  //   $('#delete-confirm-dialog').dialog({
  //     autoOpen: false
  //   });
  
  //   $('#delete-confirm').on('click', deleteTrip);
  // });

  $('#info-edit-dialog').dialog({
    autoOpen: false
  });

  $('#user-photo-edit-dialog').dialog({
    autoOpen: false
  });

  $("#delete-confirm-dialog").dialog({
    autoOpen: false
  });

  jQuery('.edit-user-image').on('click',editUserImage)

  jQuery('#user-info-edit').on('click', openEditProfile);

  jQuery('#delete-confirm').on('click', deleteTrip);

  jQuery('#trip-index').on('click', showTripsTab);

 	jQuery('#wishlist-index').on('click', showWishlistTab);

 	jQuery('.trip').on('click',function(event){
    event.preventDefault();

    var target = jQuery(event.target);
    var targetClass = target.attr('class');
    var tripID = jQuery(this).attr('rel');
    var tripElement = jQuery(this);

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
    	case 'trip-edit':
        editTrip(tripID);
    		break;
    	case 'trip-delete':
        openDeleteTrip(tripID);
    		break;
    	default:
    		showPopupTrip(tripElement);
    		break;
  	}
	});

  jQuery('#trip-popup-close-icon').on('click',closePopupTrip);

  jQuery('#trip-popup').on('click',function(event){
    event.preventDefault();

    var target = jQuery(event.target);
    var targetClass = jQuery(event.target).attr('class');
    var tripID = jQuery(this).attr('rel');

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
    	case 'trip-edit':
        editTrip(tripID);
    		break;
    	case 'trip-delete':
    		openDeleteTrip(tripID);
    		break;
    	default:
    		break;
    }
  });

  jQuery('.new-trip').on('click',addTrip);
}

function editUserImage(event){
  event.preventDefault();
  $('#user-photo-edit-dialog').dialog("open");
  // $('#user-photo-edit-dialog').modal('show');
}

function openEditProfile(event){
  event.preventDefault();
  var currentDescription = jQuery('#user-description').text();
  var currentContact = jQuery('#user-contact').text();
  jQuery('#edit-user-description').text(currentDescription);
  jQuery('#edit-user-contact').text(currentContact);
  $('#info-edit-dialog').dialog("open");
  // $('#info-edit-dialog').modal('show');
}

function showTripsTab(event){
	event.preventDefault();
 	jQuery('#trip-index').removeClass('inactive').addClass('active');
 	jQuery('#trip-content').removeClass('inactive').addClass('active');
 	jQuery('#wishlist-index').removeClass('active').addClass('inactive');
 	jQuery('#wishlist-content').removeClass('active').addClass('inactive');
}

function showWishlistTab(event){
	event.preventDefault();
	jQuery('#wishlist-index').removeClass('inactive').addClass('active');
	jQuery('#wishlist-content').removeClass('inactive').addClass('active');
	jQuery('#trip-index').removeClass('active').addClass('inactive');
	jQuery('#trip-content').removeClass('active').addClass('inactive');
}

function showUserProfile(eventTarget){
	var userID = eventTarget.attr('rel');
	window.location = '/view_user/' + userID;
}

function showPopupTrip(tripElement){
	var tripID = tripElement.attr('rel');
  var offset = jQuery('body').scrollTop();
  var popupTripTop = 100 + offset;
  var popupCloseTop = 75 + offset;
  jQuery('#trip-popup').css('top', popupTripTop+'px');
  jQuery('#trip-popup-close').css('top',popupCloseTop+'px');
  jQuery('#trip-popup-container').removeClass('popup-inactive');
	jQuery('#trip-popup').append(tripElement.clone());
	jQuery('#trip-popup .trip-description').removeClass('text-hidden');
	jQuery('#trip-popup').attr('rel',tripID);
}

function closePopupTrip(event){
	event.preventDefault();
	jQuery('#trip-popup-container').addClass('popup-inactive');
  jQuery('#trip-popup').children('.trip').remove();
  jQuery('#trip-popup').attr('rel',"");
}

function likeTrip(eventTarget, tripID) {
  console.log(tripID+' liked post req');

  jQuery.ajax({
    url: '/like_trip',
    method: 'POST', 
    data: {
      trip_id: tripID,
      user_id: myUserID,
    }
  }).done(function(response){
    //db updated trip with like
    eventTarget.attr('class','trip-unlike');
  	eventTarget.attr('src',unlikeIconURL);
  });
}

function unlikeTrip(eventTarget,tripID) {
	console.log(tripID+' unliked post req');
	
	jQuery.ajax({
    url: '/unlike_trip',
    method: 'POST', 
    data: {
      trip_id: tripID,
      user_id: myUserID,

      // how to get my own user ID?
    }
  }).done(function(response){
    //db updated trip with unlike
    eventTarget.attr('class','trip-like');
  	eventTarget.attr('src',likeIconURL);
  });
}

function editTrip(tripID){
  window.location = '/edit_trip_page/' + tripID;
}

function openDeleteTrip(tripID){
  $("#delete-confirm-dialog").dialog("open");
  // $("#delete-confirm-dialog").modal('show');
  jQuery("#delete-confirm").attr('rel',tripID);
}

function deleteTrip(event){
  var tripID = jQuery("#delete-confirm").attr('rel');

  jQuery('<form>', {
    method: 'post',
    action: '/delete_trip',
    data: {
      trip_id: tripID,
      user_id: myUserID,
      // how to get my own user ID?
    }
  }).submit();
}

function addTrip(){
  window.location = '/add_trip_page';
}

function loadFakeTestingData(){
	var userTripsList = [{tripID: "12345", userID: "123", tripTitle: "test1", username: "user1", description: "this is test description1", liked: true, imageURL:'http://placekitten.com/g/150/150'},
	{tripID: "12346", userID: "124", tripTitle: "test2", username: "user2", description: "this is test description2", liked:false, imageURL:'http://placekitten.com/g/150/150'},
	{tripID: "12347", userID: "125", tripTitle: "test3", username: "user3", description: "this is test description3", liked:false, imageURL:'http://placekitten.com/g/150/150'},
	{tripID: "12348", userID: "126", tripTitle: "test4", username: "user4", description: "this is test description4", liked:true, imageURL:'http://placekitten.com/g/150/150'},
	{tripID: "12349", userID: "127", tripTitle: "test5", username: "user5", description: "this is test description5", liked:true, imageURL:'http://placekitten.com/g/150/150'},
	{tripID: "12350", userID: "128", tripTitle: "test6", username: "user6", description: "this is test description6", liked: true, imageURL:'http://placekitten.com/g/150/150'},
	{tripID: "12351", userID: "129", tripTitle: "test7", username: "user7", description: "this is test description7", liked:false, imageURL:'http://placekitten.com/g/150/150'},
	{tripID: "12352", userID: "130", tripTitle: "test8", username: "user8", description: "this is test description8", liked:false, imageURL:'http://placekitten.com/g/150/150'},
	{tripID: "12353", userID: "131", tripTitle: "test9", username: "user9", description: "this is test description9", liked:true, imageURL:'http://placekitten.com/g/150/150'},
	{tripID: "12354", userID: "132", tripTitle: "test10", username: "user10", description: "this is test description10", liked:true, imageURL:'http://placekitten.com/g/150/150'},];

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

	var fakeData = {userIsOwner: true,
	userImageURL: 'http://placekitten.com/g/150/150', username: "Cat Meow", userDescription: "this is test user description", userContact: 'test@gmail.com',
	wishlistTrips: wishlistTripsList, userTrips: userTripsList};

	var source = jQuery("#hbtemplate").html();
	var template = Handlebars.compile(source);
	jQuery('body').append(template(fakeData));
}

jQuery(document).ready(main);


