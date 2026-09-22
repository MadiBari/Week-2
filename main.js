
function TextColorChange(element) {
$(element).toggleClass('SWIC-active');
}

function ToggleName(element) {
  $(element).toggle();
}

$(document).ready(function () {
  $('.SWIC').on('click', function () {
    TextColorChange(this);
  });

$('#nameToggle').on('click', function () {
  ToggleName('h1');
});
});

 $(document).ready(function() {
      alert("Hello World");
         });


