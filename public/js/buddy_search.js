var buddySearchGroups = {
  'Category': [
    {title: 'Adventure', value: 'adventure'}, 
    {title: 'Food', value: 'food'}, 
    {title: 'Art', value: 'art'}, 
    {title: 'History', value: 'history'}, 
  ],
  'Availability': [
  {title: '2016 Winter', value: '2016Winter'}, 
  {title: '2016 Fall', value: '2016Fall'}, 
  {title: '2016 Summer', value: '2016Summer'}, 
  {title: '2016 Spring', value: '2016Spring'},
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
  // loadFakeTestingData();

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

  $('<ul>').attr('id','filter-tags').appendTo(filterForm);
  $('<button>').attr('id','apply-filter').text('Apply Filter').appendTo(filterForm);
  $('<button>').attr('id','clear-filter').text('Clear Filter').appendTo(filterForm);

  $('#filter-by-container input[type=checkbox]').on('click',toggleFilterButtonTags);

  $('#clear-filter').on('click',clearFilter);
  $('#apply-filter').on('click',applyFilter);
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

  $.ajax({
    url: '/buddy_search_filter',
    method: 'GET', 
    data: {
      category: 'food',
      duration: 'long',
    }
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

function loadFakeTestingData(){
  var fakeData = {users:[{userID: "123", username: "user1", userImageURL: 'http://placekitten.com/g/150/150',
  tripImages: [{tripImageURL:'http://placekitten.com/g/150/150'},{tripImageURL:'http://placekitten.com/g/150/150'},{tripImageURL:'http://placekitten.com/g/150/150'},{tripImageURL:'http://placekitten.com/g/150/150'}]},
  {userID: "124", username: "user2", userImageURL: 'http://placekitten.com/g/150/150', 
  tripImages: [{tripImageURL:'http://placekitten.com/g/150/150'},{tripImageURL:'http://placekitten.com/g/150/150'},{tripImageURL:'http://placekitten.com/g/150/150'},{tripImageURL:'http://placekitten.com/g/150/150'}]},
  {userID: "125", username: "user3", userImageURL: 'http://placekitten.com/g/150/150',
  tripImages: [{tripImageURL:'http://placekitten.com/g/150/150'},{tripImageURL:'http://placekitten.com/g/150/150'},{tripImageURL:'http://placekitten.com/g/150/150'},{tripImageURL:'http://placekitten.com/g/150/150'}]},
  {userID: "126", username: "user4", userImageURL: 'http://placekitten.com/g/150/150',
  tripImages: [{tripImageURL:'http://placekitten.com/g/150/150'},{tripImageURL:'http://placekitten.com/g/150/150'},{tripImageURL:'http://placekitten.com/g/150/150'},{tripImageURL:'http://placekitten.com/g/150/150'}]},
  {userID: "127", username: "user5", userImageURL: 'http://placekitten.com/g/150/150',
  tripImages: [{tripImageURL:'http://placekitten.com/g/150/150'},{tripImageURL:'http://placekitten.com/g/150/150'},{tripImageURL:'http://placekitten.com/g/150/150'},{tripImageURL:'http://placekitten.com/g/150/150'}]},
  ]};

  var source = $("#hbtemplate").html();
  var template = Handlebars.compile(source);

  $('#search-results-container').append(template(fakeData));
}

$(document).ready(main);


