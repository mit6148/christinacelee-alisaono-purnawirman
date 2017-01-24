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
  $(function(){
  var backgrounds = ['/images/sf-background.jpg','/images/switzerland-background.jpg',
    '/images/egypt-background.jpg'];
  var current = 0;

  function nextBackground(){
    current++;
    $('#background-next').attr('src',backgrounds[current%backgrounds.length]);
    $('#background').fadeOut('3000');
    $('#background-next').fadeIn('3000');
    setTimeout(nextBackground,5000);
  };

  // $next.css('z-index',2);//move the next image up the pile
  //     $active.fadeOut(1500,function(){//fade out the top image
  //   $active.css('z-index',1).show().removeClass('active');//reset the z-index and unhide the image
  //         $next.css('z-index',3).addClass('active');//make the next image the top one
  //     });

  setTimeout(nextBackground,5000);
  $('#background').attr('src', backgrounds[0]);
  });
});