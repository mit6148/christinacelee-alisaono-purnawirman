function initMap() {
  var input = $('#place-autocomplete')[0];
  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.setTypes(['(cities)']);

  autocomplete.addListener('place_changed', function() {

    var place = autocomplete.getPlace();
    var placeID = place.place_id;
    var placeName = place.formatted_address;

    $('#place-id').val(placeID);
    $('#place-name').val(placeName);
  });
}

$(document).ready(function(){
  $('form input').on('keypress', function(e) {
    return e.which !== 13;
  });

  $('#save-trip').on('click', function(e) {
    if ($('#duration-input').val().length > 0 && $('#duration-input').val() < 1) {
      alert("Trip must be 1 day or longer");
    } else if ($('#budget-input').val().length > 0 && $('#budget-input').val() < 0) {
      alert("Budget must be $0 or higher");
    } else if ($('#place-id').val().length === 0) {
      alert("Please input a valid city name");
    } else {
      $('form').submit();
    }
  });

  $('form input[name="category"]:not(checked)').on('click', function(){
    $('.category-choices').css('color','#bdc3c7');
    $('#category-'+$(this).val()).css('color','white'); 
    if ($('form input[name="category"]:checked').length > 1) {
      $('form input[name="category"]').prop('checked',false)          
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
});