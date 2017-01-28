var likeIconURL = "/images/like.png";
var unlikeIconURL = "/images/unlike.png";

var tripFilterGroups = {
  'Category': [
    {title: 'Adventure', value: 'adventure'}, 
    {title: 'Food', value: 'food'}, 
    {title: 'Art', value: 'art'}, 
    {title: 'History', value: 'history'}, 
  ],
  'Season': [
  {title: 'Winter', value: 'winter'}, 
  {title: 'Fall', value: 'fall'}, 
  {title: 'Summer', value: 'summer'}, 
  {title: 'Spring', value: 'spring'},
  ],
  'Duration': [
  {title: 'Day Trip', value: 'dayTrip'}, 
  {title: 'Short(1~3 days)', value: 'shortTrip'}, 
  {title: 'Medium(4~7 days)', value: 'mediumTrip'}, 
  {title: 'Long(8+ days)', value: 'longTrip'},
  ],
  'Budget': [
  {title: 'Low(~$300)', value: 'lowBudget'}, 
  {title: 'Medium($300~800)', value: 'mediumBudget'}, 
  {title: 'High($800~)', value: 'highBudget'}, 
  ]    
}

var main = function() {

  //loadFakeTestingData();

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

  $('<ul>').attr('id','filter-tags').appendTo(filterForm);
  $('<button>').attr('id','apply-filter').text('Apply Filter').appendTo(filterForm);
  $('<button>').attr('id','clear-filter').text('Clear Filter').appendTo(filterForm);

  $('#filter-by-container input[type=checkbox]').on('click',toggleFilterButtonTags);

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
  var groupName = $(this).attr('rel');
  $('.filter-criteria-container').hide();
  $('#'+groupName+'-criteria-container').show();
}

function toggleFilterButtonTags(event){
  if ($('#filter-by-container input[type=checkbox]:checked').length > 0) {
    $('#filter-by-container button').show();
    $('#filter-tags').show();
  } else {
    $('#filter-by-container button').hide(); 
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

  $('#filter-by-container input[type=checkbox]:checked').each(function(){

    var groupName = $(this).attr('name');
    var value = $(this).attr('value');

    if (groupName in filterData) {
      filterData[groupName].push(value);
    } else {
      filterData[groupName] = [value];
    }
  });

  console.log(filterData);

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
  console.log(tripID+' liked post req');

  $.ajax({
    url: '/like_trip',
    method: 'POST', 
    data: {
      trip_id: tripID,
    }
  }).done(function(response){
    //db updates trip with like
    
    // eventTarget.attr('class','trip-unlike');
    // eventTarget.attr('src',unlikeIconURL);

    $('.trip-like[rel="'+tripID+'"]').attr('class','trip-unlike');
    $('.trip-like[rel="'+tripID+'"]').attr('src',unlikeIconURL);

  });
}

function unlikeTrip (eventTarget,tripID) {
  console.log(tripID+' unliked post req');
  
  $.ajax({
    url: '/unlike_trip',
    method: 'POST', 
    data: {
      trip_id: tripID,
    }
  }).done(function(response){
    //db updates trip with unlike

    // eventTarget.attr('class','trip-like');
    // eventTarget.attr('src',likeIconURL);

    $('.trip-unlike[rel="'+tripID+'"]').attr('class','trip-like');
    $('.trip-unlike[rel="'+tripID+'"]').attr('src',likeIconURL);

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

