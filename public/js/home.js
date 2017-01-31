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

  // $('.fieldset-home ').hover(
  //   function() {
  //     $(this).find('.expand-show').show();
  //     $(this).animate({height:'+=200', width:'+=200'}, 'slow');
  //   },
  //   function() {
  //     $(this).animate({height:'-=200', width:'-=200'}, 'slow');
  //     $(this).find('.expand-show').hide();
  //   }
  // );
  var isTabiOpen = false;
  var isBuddyOpen = false;

    $('.fieldset-home-tabi ').hover(
    function() {
      if (!isTabiOpen) {
        isTabiOpen = true;
        $(this).find('.expand-show').show();
        $(this).animate({height:'+=120', width:'+=120'}, 'slow');
      };

      if (isBuddyOpen) {
        isBuddyOpen = false;
        $('.fieldset-home-buddy').animate({height:'-=120', width:'-=120'}, 'slow');
        $('.fieldset-home-buddy').find('.expand-show').hide();
      };
    }
  );

  $('.fieldset-home-buddy ').hover(
    function() {
      if (!isBuddyOpen) {
        isBuddyOpen = true;
        $(this).find('.expand-show').show();
        $(this).animate({height:'+=120', width:'+=120'}, 'slow');
      };

      if (isTabiOpen) {
        isTabiOpen = false;
        $('.fieldset-home-tabi').animate({height:'-=120', width:'-=120'}, 'slow');
        $('.fieldset-home-tabi').find('.expand-show').hide();
      };
    }
  );



  $(function(){
    var backgrounds = ['sf','switzerland','egypt','stonehenge','india','russia','tokyo'];
    var index = 0;

    function nextBackground(){
      index++;
      var nextImage = '/images/'+backgrounds[index%backgrounds.length]+'-background.jpg';
      $('#background-next').attr('src',nextImage);
      $('#background').fadeOut('500',function(){
        $('#background').attr('src',nextImage);
        $('#background').show();
      });

      setTimeout(nextBackground,3000);
    };

    $('#background').attr('src','/images/'+backgrounds[0]+'-background.jpg');
    $('#background-next').attr('src','/images/'+backgrounds[1]+'-background.jpg');
    setTimeout(nextBackground,3000);
  });

});