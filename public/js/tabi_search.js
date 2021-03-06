var likeIconURL = "/images/like.png";
var unlikeIconURL = "/images/unlike.png";
var loadingIconURL = "/images/loading.svg";

var tripFilterGroups = {
  'Category': [
    {title: 'Adventure', value: 'Adventure'}, 
    {title: 'Food', value: 'Food'}, 
    {title: 'Art', value: 'Art'}, 
    {title: 'History', value: 'History'}, 
  ],
  'Season': [
  {title: 'Winter', value: 'Winter'}, 
  {title: 'Fall', value: 'Fall'}, 
  {title: 'Summer', value: 'Summer'}, 
  {title: 'Spring', value: 'Spring'},
  ],
  'Duration': [
  {title: 'Day Trip', value: 'dayTrip'}, 
  {title: 'Short(2~3 days)', value: 'shortTrip'}, 
  {title: 'Medium(4~7 days)', value: 'mediumTrip'}, 
  {title: 'Long(8+ days)', value: 'longTrip'},
  ],
  'Budget': [
  {title: 'Low(~$300)', value: 'lowBudget'}, 
  {title: 'Medium($300~800)', value: 'mediumBudget'}, 
  {title: 'High($800~)', value: 'highBudget'}, 
  ]    
}


function initMap() {
  var tabiInput = $('#auto-completion')[0];
  
  var tabiAutocomplete = new google.maps.places.Autocomplete(tabiInput);

  tabiAutocomplete.setTypes(['(cities)']);

  tabiAutocomplete.addListener('place_changed', function() {

    var place = tabiAutocomplete.getPlace();
    var placeID = place.place_id;
    var placeName = place.formatted_address;

    $('#tabi-place-id').val(placeID);
    $('#tabi-place-name').val(placeName);

    $('#search-button').css('background-color', 'white').css('color','black');
  });
}


var main = function() {

  populateSearchBar(tripFilterGroups);

  addListenerToTrips();

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
      default:
        break;
    }
  });

  $('#search-button').on('click',function(event){
    if ($('#tabi-place-id').val().length > 0) {
      $('#new-search-form').submit();
    }
  });

  $('.suggestion-place').on('click',function(event){
    var placeID = $(this).attr('rel');
    var placeName = $(this).text();
    $('#suggested-place-id').val(placeID);
    $('#suggested-place-name').val(placeName);
    $('#suggestion-search-form').submit();
  });
} 

function populateSearchBar(filter){
  var filterForm = $('#filter-by-container form');
  for (var group in filter){
    $('<div>').attr('id',group+'-title-container').attr('rel',group).addClass('filter-title-container')
      .mouseover(expandFilterCriteria).appendTo(filterForm);
    $('<h2>').text(group).appendTo('#'+group+'-title-container');
    $('<div>').attr('id',group+'-criteria-container').addClass('filter-criteria-container').appendTo(filterForm);

    var criteria = filter[group];
    for (i=0; i<criteria.length; i++){
      var element = criteria[i];
      $('#'+group+'-criteria-container').append(
        '<input type="checkbox" name="'+group+'" value="'+element.value+'" title="'+element.title+'">'+element.title+'<br>'
      );
    }
  }

  $('form input[name="Duration"]:not(checked)').on('click', function(){
    if ($('form input[name="Duration"]:checked').length > 1) {
      $('form input[name="Duration"]').prop('checked',false);
      $(this).prop('checked',true);
    }
  });

  $('form input[name="Budget"]:not(checked)').on('click', function(){
    if ($('form input[name="Budget"]:checked').length > 1) {
      $('form input[name="Budget"]').prop('checked',false);
      $(this).prop('checked',true);
    }
  });

  $('<ul>').attr('id','filter-tags').appendTo(filterForm);
  $('<div>').attr('id','apply-filter').text('Apply Filter').appendTo(filterForm);
  $('<div>').attr('id','clear-filter').text('Clear Filter').appendTo(filterForm);

  $('#filter-by-container input[type=checkbox]').on('click',toggleFilterTags);

  $('#clear-filter').on('click',clearFilter);
  $('#apply-filter').on('click',applyFilter);
}

function addListenerToTrips(){
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
}

function expandFilterCriteria(event){
  event.preventDefault();
  $('.filter-title-container').css('color','#bdc3c7').css('background-color','#34495e');
  $(this).css('color','white').css('background-color','#1abc9c');
  var groupName = $(this).attr('rel');
  $('.filter-criteria-container').hide();
  $('#'+groupName+'-criteria-container').show();
}

function toggleFilterTags(event){
  if ($('#filter-by-container input[type=checkbox]:checked').length > 0) {
    $('#filter-tags').show();
  } else {
    $('#filter-tags').hide();
  }

  updateFilterTags();
}

function clearFilter(event){
  event.preventDefault();
  $('#filter-by-container input[type=checkbox]').prop('checked',false);
  $('#filter-by-container button').hide();
  $('#filter-tags').hide();
  updateFilterTags();

  $.ajax({
    url: '/tabi_search_filter',
    method: 'GET', 
    data: {placeID: $('body').attr('rel')},
  }).done(function(response){
    $('#search-results-container').html(response);
    addListenerToTrips();
  });

}

function updateFilterTags() {
  $('#filter-tags').children().remove();
  $('#filter-by-container input[type=checkbox]:checked').each(function(){
    $('<li>').text($(this).attr('title')).appendTo('#filter-tags');
  })
}

function applyFilter(event){
  event.preventDefault();

  var filterData = {};
  filterData['placeID'] = $('body').attr('rel');

  $('#filter-by-container input[type=checkbox]:checked').each(function(){

    var groupName = $(this).attr('name');
    var value = $(this).attr('value');

    if (groupName in filterData) {
      filterData[groupName].push(value);
    } else {
      filterData[groupName] = [value];
    }
  });

  $.ajax({
    url: '/tabi_search_filter',
    method: 'GET', 
    data: filterData,
  }).done(function(response){
    $('#search-results-container').html(response);
    addListenerToTrips();
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
  $('#trip-popup img').css('width','50%');
  $('#trip-popup .trip-description').removeClass('text-hidden');
  $('#trip-popup').attr('rel',tripID);
  $('#trip-popup .trip-title').css('overflow-wrap','break-word');
  $('#trip-popup .trip-title').css('over-wrap','break-word');
  $('#trip-popup .trip-title').css('hyphens','auto');
  $('#trip-popup .trip').css('cursor','default');
}

function closePopupTrip(event){
  event.preventDefault();
  $('#trip-popup-container').addClass('popup-inactive');
  $('#trip-popup').children('.trip').remove();
  $('#trip-popup').attr('rel',"");
}

function likeTrip (eventTarget, tripID) {

  $('img[rel="'+tripID+'"]').attr('src',loadingIconURL);

  $.ajax({
    url: '/like_trip',
    method: 'POST', 
    data: {
      trip_id: tripID,
    }
  }).done(function(response){

    if (response === '') {
      $('img[rel="'+tripID+'"]').attr('class','trip-unlike');
      $('img[rel="'+tripID+'"]').attr('src',unlikeIconURL);
    } else if (response === 'login') {
      window.location = "/login/facebook";
    } else {
      alert('Error... reloading the page');
      location.reload();
    }

  });
}

function unlikeTrip (eventTarget,tripID) {

  $('img[rel="'+tripID+'"]').attr('src',loadingIconURL);

  $.ajax({
    url: '/unlike_trip',
    method: 'POST', 
    data: {
      trip_id: tripID,
    }
  }).done(function(response){

    if (response === '') {
      $('img[rel="'+tripID+'"]').attr('class','trip-like');
      $('img[rel="'+tripID+'"]').attr('src',likeIconURL);
    } else if (response === 'login') {
      window.location = "/login/facebook";
    } else {
      alert('Error... reloading the page');
      location.reload();
    }
  });
}

$(document).ready(main);

