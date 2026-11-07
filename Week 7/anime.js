$(function () {
  const images = [
    { src: 'Dungeon.jpg', alt: 'Delicious in Dungeon' },
    { src: 'Frieren.jpg', alt: "Frieren: Beyond Journey's End" },
    { src: 'Fullmetal.jpg', alt: 'Fullmetal Alchemist: Brotherhood' }
  ];

  let next = 0;
  let secondButtonAdded = false;

  // Generic click function: works for ANY element with the class "anime-btn",
  // including buttons that get created after the page loads.
  $(document).on('click', '.anime-btn', function () {
    const $clicked = $(this);

    // 1. Append the next image
    if (next < images.length) {
      const pick = images[next++];
      $('<img>')
        .attr({ src: pick.src, alt: pick.alt })
        .css('width', '200px')
        .appendTo('#gallery');
    }

    // 2. Show which button was clicked
    $clicked.addClass('clicked');

    // 3. After the FIRST click, create the new button (only once)
    if (!secondButtonAdded) {
      secondButtonAdded = true;
      $('<button>', {
        id: 'add-more',
        class: 'anime-btn',
        text: 'Show another title'
      }).insertAfter('#add');
    }

    // 4. Disable everything once all images are showing
    if (next >= images.length) {
      $('.anime-btn').prop('disabled', true).text('All shows revealed');
    }
  });
});