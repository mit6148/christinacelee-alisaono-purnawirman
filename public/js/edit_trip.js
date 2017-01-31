$(document).ready(function(){
  var category = $('#category-input').attr('current');
  var season = $('#season-input').attr('current');
  $('form input[name="category"][value="'+category+'"]').prop('checked',true);
  $('#category-'+category).css('color','white'); 
  $('form input[name="season"][value="'+season+'"]').prop('checked',true);
  $('#season-'+season).css('color','white'); 

  $('form input[name="category"]').on('click', function(){
    if ($('form input[name="category"]:checked').length === 0) {
      $(this).prop('checked',true);
    }
  });

  $('form input[name="season"]').on('click', function(){
    if ($('form input[name="season"]:checked').length === 0) {
      $(this).prop('checked',true);
    }
  });

  $('form input[name="category"]:not(checked)').on('click', function(){
    $('.category-choices').css('color','#bdc3c7');
    $('#category-'+$(this).val()).css('color','white'); 
    if ($('form input[name="category"]:checked').length > 1) {
      $('form input[name="category"]').prop('checked',false);
      $(this).prop('checked',true);
    }
  });

  $('form input[name="season"]:not(checked)').on('click', function(){
    $('.season-choices').css('color','#bdc3c7');
    $('#season-'+$(this).val()).css('color','white'); 
    if ($('form input[name="season"]:checked').length > 1) {
      $('form input[name="season"]').prop('checked',false);
      $(this).prop('checked',true);
    }
  });

  $('form input').on('keypress', function(e) {
    return e.which !== 13;
  });

  $('#save-trip').on('click', function(e) {
    if ($('#duration-input').val().length > 0 && $('#duration-input').val() < 1) {
      alert("Trip must be 1 day or longer");
    } else if ($('#budget-input').val().length > 0 && $('#budget-input').val() < 0) {
      alert("Budget must be $0 or higher");
    } else {
      $('form').submit();
    }
  });
});