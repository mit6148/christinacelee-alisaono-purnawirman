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
}
$(document).ready(main);