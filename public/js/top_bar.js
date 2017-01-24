var main = function() {
  $("#logo-container").on('click',function(){
    window.location = '/';
  });
  $("#user-option").mouseover(function(event){
    $('#user-dropdown-container').show();
  }).mouseout(function(event){
    $('#user-dropdown-container').hide();
  });
  $('.user-dropdown').mouseover(function(event){
    $(this).css('background-color','grey');
  }).mouseout(function(event){
    $(this).css('background-color','white');
  });
  $('#user-dropdown-profile').on('click',function(event){
    window.location = '/view_my_profile';
  });
  $('#user-dropdown-create').on('click',function(event){
    window.location = '/add_trip_page';
  });
  $('#user-dropdown-logout').on('click',function(event){
    window.location = '/logout';
  });
  $('#user-dropdown-login').on('click',function(event){
    window.location = '/login/facebook';
  });
}
$(document).ready(main);