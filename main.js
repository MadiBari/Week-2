// Changes the color of a clicked SWIC span by toggling the SWIC-active class
function TextColorChange(element) {
$(element).toggleClass('SWIC-active');
}
// Shows or hides the given element
function ToggleName(element) {
  $(element).toggle();
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

/* When the Get Hobbies button is clicked, fetch hobbies.json
and display each hobby in a new list, linking any that have a URL */
$('#getHobbies').on('click', function () {
  $.getJSON('hobbies.json', function (data) {
    var hobbyList = $('<ul></ul>');
    // Loop through each hobby from the JSON file
    $.each(data.hobbies, function (index, hobby) {
      if (hobby.link) {
        // Hobby has a link, so wrap the name in an <a> tag
        hobbyList.append('<li><a href="' + hobby.link + '">' + hobby.name + '</a></li>');
      } else {
        // No link, just show the plain hobby name
        hobbyList.append('<li>' + hobby.name + '</li>');
      }
    });
    // Add the new hobby list to the bottom of the page
    $('body').append(hobbyList);
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

 $(document).ready(function() {
      alert("Hello World");
         });


