// Changes the color of a clicked SWIC span by toggling the SWIC-active class
function TextColorChange(element) {
$(element).toggleClass('SWIC-active');
}
// Shows or hides the given element
function ToggleName(element) {
  $(element).toggle();
}

// Shows an error message inside the given output element
function showError($output, message) {
  $output.empty().append($('<p class="ajax-error"></p>').text(message));
}

$(document).ready(function () {

// When a SWIC span is clicked, change its text color
  $('.SWIC').on('click', function () {
    TextColorChange(this);
  });

// When the Toggle Name button is clicked, show/hide the h1 name
$('#nameToggle').on('click', function () {
  ToggleName('h1');
});

/* AJAX CALL #1 (data source: local hobbies.json file)
   When the Get Hobbies button is clicked, request hobbies.json and show
   each hobby in a list, linking any that have a URL. */
$('#getHobbies').on('click', function () {
  var $button = $(this);
  var $output = $('#hobbyOutput');

  $button.prop('disabled', true);
  $output.html('<p class="ajax-status">Loading hobbies...</p>');

  $.ajax({
    url: 'hobbies.json',
    method: 'GET',
    dataType: 'json',
    timeout: 8000
  })
  .done(function (data) {
    // Make sure the JSON has the shape we expect
    if (!data.hobbies || !data.hobbies.length) {
      showError($output, 'The hobbies file was loaded but it has no hobbies in it.');
      return;
    }
    var hobbyList = $('<ul></ul>');
    $.each(data.hobbies, function (index, hobby) {
      var $item = $('<li></li>');
      if (hobby.link) {
        // Hobby has a link, so wrap the name in an <a> tag
        $item.append($('<a></a>').attr('href', hobby.link).text(hobby.name));
      } else {
        // No link, just show the plain hobby name
        $item.text(hobby.name);
      }
      hobbyList.append($item);
    });
    // Replace whatever was in the output area (so clicking twice doesn't duplicate)
    $output.empty().append(hobbyList);
  })
  .fail(function (jqXHR, textStatus) {
    // ERROR HANDLING for call #1
    var message = 'Could not load hobbies.json. ';
    if (textStatus === 'timeout') {
      message += 'The request timed out.';
    } else if (textStatus === 'parsererror') {
      message += 'The file is not valid JSON.';
    } else if (jqXHR.status === 404) {
      message += 'The file was not found (404). Check the file name and folder.';
    } else {
      message += 'Make sure the page is running from a web server, not opened as a file.';
    }
    showError($output, message);
  })
  .always(function () {
    $button.prop('disabled', false);
  });
});

/* AJAX CALL #2 (data source: API Ninjas Chuck Norris API, external)
   Get a free key at https://api-ninjas.com/register and paste it below. */
var API_NINJAS_KEY = 'PASTE_YOUR_API_KEY_HERE';

$('#getJoke').on('click', function () {
  var $button = $(this);
  var $output = $('#jokeOutput');

  if (API_NINJAS_KEY === 'PASTE_YOUR_API_KEY_HERE') {
    showError($output, 'Add your API Ninjas key to API_NINJAS_KEY in main.js first.');
    return;
  }

  $button.prop('disabled', true);
  $output.html('<p class="ajax-status">Loading joke...</p>');

  $.ajax({
    url: 'https://api.api-ninjas.com/v1/chucknorris',
    method: 'GET',
    headers: { 'X-Api-Key': API_NINJAS_KEY },
    dataType: 'json',
    timeout: 8000
  })
  .done(function (data) {
    var joke = $.isArray(data) ? (data[0] && data[0].joke) : data.joke;
    if (!joke) {
      showError($output, 'The API responded but did not include a joke.');
      return;
    }
    $output.empty().append($('<p class="joke-text"></p>').text(joke));
  })
  .fail(function (jqXHR, textStatus) {
    // ERROR HANDLING for call #2
    var message = 'Could not get a joke. ';
    if (textStatus === 'timeout') {
      message += 'The request timed out.';
    } else if (jqXHR.status === 401 || jqXHR.status === 403) {
      message += 'The API key was rejected. Check that it is correct.';
    } else if (jqXHR.status === 429) {
      message += 'Too many requests or monthly quota reached. Try again later.';
    } else if (jqXHR.status === 0) {
      message += 'The server could not be reached. Check your internet connection.';
    } else {
      message += 'The server returned status ' + jqXHR.status + '.';
    }
    showError($output, message);
  })
  .always(function () {
    $button.prop('disabled', false);
  });
});

// Style odd and even table rows differently
$('#scheduleTable tr:odd').css('background-color', '#e8e8f5');
$('#scheduleTable tr:even').css('background-color', '#ffffff');

// Give the first and last span their own styles
$('span:first').css({
  'font-weight': 'bold',
  'background-color': 'yellow'
});
$('span:last').css({
  'font-style': 'italic',
  'background-color': 'green'
});

});