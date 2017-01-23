var myUserID = 'tempUserID';

var likeIconURL = "/images/like.png";
var unlikeIconURL = "/images/unlike.png";

var $j = jQuery.noConflict();

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

  $j('#info-edit-dialog').dialog({
    autoOpen: false
  });

  $j('#user-photo-edit-dialog').dialog({
    autoOpen: false
  });

  $j("#delete-confirm-dialog").dialog({
    autoOpen: false
  });

  $j('.edit-user-image').on('click',editUserImage)

  $j('#user-info-edit').on('click', openEditProfile);

  $j('#delete-confirm').on('click', deleteTrip);

  $j('#trip-index').on('click', showTripsTab);

 	$j('#wishlist-index').on('click', showWishlistTab);

 	$j('.trip').on('click',function(event){
    event.preventDefault();

    var target = $j(event.target);
    var targetClass = target.attr('class');
    var tripID = $j(this).attr('rel');
    var tripElement = $j(this);

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

  $j('#trip-popup-close-icon').on('click',closePopupTrip);

  $j('#trip-popup').on('click',function(event){
    event.preventDefault();

    var target = $j(event.target);
    var targetClass = $j(event.target).attr('class');
    var tripID = $j(this).attr('rel');

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

  $j('.new-trip').on('click',addTrip);
}

function editUserImage(event){
  event.preventDefault();
  $j('#user-photo-edit-dialog').dialog("open");
  // $('#user-photo-edit-dialog').modal('show');
}

function openEditProfile(event){
  event.preventDefault();
  var currentDescription = $j('#user-description').text();
  var currentContact = $j('#user-contact').text();
  $j('#edit-user-description').text(currentDescription);
  $j('#edit-user-contact').text(currentContact);
  $j('#info-edit-dialog').dialog("open");
  // $('#info-edit-dialog').modal('show');
}

function showTripsTab(event){
	event.preventDefault();
 	$j('#trip-index').removeClass('inactive').addClass('active');
 	$j('#trip-content').removeClass('inactive').addClass('active');
 	$j('#wishlist-index').removeClass('active').addClass('inactive');
 	$j('#wishlist-content').removeClass('active').addClass('inactive');
}

function showWishlistTab(event){
	event.preventDefault();
	$j('#wishlist-index').removeClass('inactive').addClass('active');
	$j('#wishlist-content').removeClass('inactive').addClass('active');
	$j('#trip-index').removeClass('active').addClass('inactive');
	$j('#trip-content').removeClass('active').addClass('inactive');
}

function showUserProfile(eventTarget){
	var userID = eventTarget.attr('rel');
	window.location = '/view_user/' + userID;
}

function showPopupTrip(tripElement){
	var tripID = tripElement.attr('rel');
  var offset = $j('body').scrollTop();
  var popupTripTop = 100 + offset;
  var popupCloseTop = 75 + offset;
  $j('#trip-popup').css('top', popupTripTop+'px');
  $j('#trip-popup-close').css('top',popupCloseTop+'px');
  $j('#trip-popup-container').removeClass('popup-inactive');
	$j('#trip-popup').append(tripElement.clone());
	$j('#trip-popup .trip-description').removeClass('text-hidden');
	$j('#trip-popup').attr('rel',tripID);
}

function closePopupTrip(event){
	event.preventDefault();
	$j('#trip-popup-container').addClass('popup-inactive');
  $j('#trip-popup').children('.trip').remove();
  $j('#trip-popup').attr('rel',"");
}

function likeTrip(eventTarget, tripID) {
  console.log(tripID+' liked post req');

  $j.ajax({
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
	
	$j.ajax({
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
  $j("#delete-confirm-dialog").dialog("open");
  // $("#delete-confirm-dialog").modal('show');
  $j("#delete-confirm").attr('rel',tripID);
}

function deleteTrip(event){
  var tripID = $j("#delete-confirm").attr('rel');

  $j('<form>', {
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

	var source = $j("#hbtemplate").html();
	var template = Handlebars.compile(source);
	$j('body').append(template(fakeData));
}

$j(document).ready(main);


