var buddySearchGroups = {
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

  populateSearchBar(buddySearchGroups);

  $('.user').on('click', showUserProfile);
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
    url: '/buddy_search_filter',
    method: 'GET', 
    data: {placeID: $('body').attr('rel')},
  }).done(function(response){
    $('#search-results-container').html(response);
    $('.user').on('click', showUserProfile);
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
    url: '/buddy_search_filter',
    method: 'GET', 
    data: filterData,
  }).done(function(response){
    $('#search-results-container').html(response);
    $('.user').on('click', showUserProfile);
  });
}

function showUserProfile(event){
  event.preventDefault();
  var userID = $(this).attr('rel');
  window.location = '/view_user/' + userID;
}

$(document).ready(main);


