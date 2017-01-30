var likeIconURL = "/images/like.png";
var unlikeIconURL = "/images/unlike.png";
var loadingIconURL = "/images/loading.svg";

var main = function() {

  $('.edittable-user-image').mouseenter(function(event){
    $('.edit-user-image').show();
  }).mouseleave(function(event){
    $('.edit-user-image').hide();
  });

  $('.edit-user-image').on('click', openEditUserImage)

  $('#user-info-edit').on('click', openEditProfile);

  $('#delete-confirm').on('click', deleteTrip);

  $('.close-dialog').on('click', closeDialog);

  $('#trip-index').on('click', showTripsTab);

 	$('#wishlist-index').on('click', showWishlistTab);

 	$('.trip').on('click',function(event){
    event.preventDefault();

    var target = $(event.target);
    var targetClass = target.attr('class');
    var tripID = $(this).attr('rel');
    var tripElement = $(this);

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

  $('#trip-popup-close-icon').on('click',closePopupTrip);
  
  $('#background-blur').on('click',closePopupTrip);

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

  $('.new-trip').on('click',addTrip);
}

function openEditUserImage(event){
  event.preventDefault();
  $('#background-black').removeClass('popup-inactive');
  $('#user-photo-edit-dialog').removeClass('popup-inactive');
}

function openEditProfile(event){
  event.preventDefault();
  var currentDescription = $('#user-description').text();
  var currentContact = $('#user-contact').text();
  $('#edit-user-description').text(currentDescription);
  $('#edit-user-contact').text(currentContact);
  $('#background-black').removeClass('popup-inactive');
  $('#info-edit-dialog').removeClass('popup-inactive');
}

function openDeleteTrip(tripID){
  $("#delete-confirm").attr('rel',tripID);
  $('#background-black').removeClass('popup-inactive');
  $('#delete-confirm-dialog').removeClass('popup-inactive');
}

function closeDialog(event) {
  event.preventDefault();
  $('.dialog').addClass('popup-inactive');
}

function showTripsTab(event){
	event.preventDefault();
 	$('#trip-index').removeClass('inactive').addClass('active');
 	$('#trip-content').removeClass('inactive').addClass('active');
 	$('#wishlist-index').removeClass('active').addClass('inactive');
 	$('#wishlist-content').removeClass('active').addClass('inactive');
}

function showWishlistTab(event){
	event.preventDefault();
	$('#wishlist-index').removeClass('inactive').addClass('active');
	$('#wishlist-content').removeClass('inactive').addClass('active');
	$('#trip-index').removeClass('active').addClass('inactive');
	$('#trip-content').removeClass('active').addClass('inactive');
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
  $('#trip-popup .trip-image').css('width','50%');
  $('#trip-popup .trip-like-container img').css('width','50%');
  $('#trip-popup .trip-options-container div').css('width','7%');
  $('#trip-popup .trip-description').removeClass('text-hidden');
  $('#trip-popup').attr('rel',tripID);
  $('#trip-popup .trip-title').css('overflow-wrap','break-word');
  $('#trip-popup .trip-title').css('over-wrap','break-word');
  $('#trip-popup .trip-title').css('hyphens','auto');
  $('#trip-popup').children().css('cursor','default');
  $('#trip-popup .trip-author').css('cursor','pointer');
}

function closePopupTrip(event){
	event.preventDefault();
	$('#trip-popup-container').addClass('popup-inactive');
  $('#trip-popup').children('.trip').remove();
  $('#trip-popup').attr('rel',"");
}

function likeTrip(eventTarget, tripID) {

  $('img[rel="'+tripID+'"]').attr('src',loadingIconURL);

  $.ajax({
    url: '/like_trip',
    method: 'POST', 
    data: {
      trip_id: tripID,
    }
  }).done(function(response){

    $('img[rel="'+tripID+'"]').attr('class','trip-unlike');
    $('img[rel="'+tripID+'"]').attr('src',unlikeIconURL);
  });
}

function unlikeTrip(eventTarget,tripID) {

  $('img[rel="'+tripID+'"]').attr('src',loadingIconURL);

	$.ajax({
    url: '/unlike_trip',
    method: 'POST', 
    data: {
      trip_id: tripID,
    }
  }).done(function(response){

    $('img[rel="'+tripID+'"]').attr('class','trip-like');
    $('img[rel="'+tripID+'"]').attr('src',likeIconURL);
  });
}

function editTrip(tripID){
  window.location = '/edit_trip_page/' + tripID;
}

function deleteTrip(event){
  var tripID = $("#delete-confirm").attr('rel');

  $.ajax({
    url: '/delete_trip',
    method: 'POST', 
    data: {
      trip_id: tripID,
    }
  }).done(function(response){
    if (response === '') {
      location.reload();
    } 
    // error?
  });
}

function addTrip(){
  window.location = '/add_trip_page';
}

$(document).ready(main);


