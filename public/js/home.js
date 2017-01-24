function initMap() {
  var tabiInput = $('#tabi-autocomplete')[0];
  var buddyInput = $('#buddy-autocomplete')[0];
  
  var tabiAutocomplete = new google.maps.places.Autocomplete(tabiInput);
  var buddyAutocomplete = new google.maps.places.Autocomplete(buddyInput);

  tabiAutocomplete.setTypes(['(cities)']);
  buddyAutocomplete.setTypes(['(cities)']);

  tabiAutocomplete.addListener('place_changed', function() {

    var place = tabiAutocomplete.getPlace();
    var placeID = place.place_id;
    var placeName = place.formatted_address;

    $('#tabi-place-id').val(placeID);
    $('#tabi-place-name').val(placeName);
  });

  buddyAutocomplete.addListener('place_changed', function() {

    var place = buddyAutocomplete.getPlace();
    var placeID = place.place_id;
    var placeName = place.formatted_address;

    $('#buddy-place-id').val(placeID);
    $('#buddy-place-name').val(placeName);
  });

  // $(function(){
  // var backgrounds = ['/images/people.jpg','/images/city1.jpg','/images/city2.jpg','/images/forest.jpg','/images/city3.jpg'];
  // var current = 0;

  // function nextBackground(){
  //   $('#background').fadeOut('300');
  //   current++;
  //   $('#background').attr('src',backgrounds[current%backgrounds.length]);
  //   $('#background').fadeIn('600');
  //   setTimeout(nextBackground,5000);
  // };

  // setTimeout(nextBackground,5000);
  //   $('#background').attr('src', backgrounds[0]);
  // });
}

$(document).ready(function(){
  $('form input').on('keypress', function(e) {
    return e.which !== 13;
  });
  $('#tabi-submit').on('click', function(e) {
    return $('#tabi-place-id').val().length > 0;
  });
  $('#buddy-submit').on('click', function(e) {
    return $('#buddy-place-id').val().length > 0;
  });
});