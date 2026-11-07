const images = [
  { src: 'Dungeon.jpg', alt: 'Delicious in Dungeon' },
  { src: 'Frieren.jpg', alt: "Frieren: Beyond Journey's End" },
  { src: 'Fullmetal.jpg', alt: 'Fullmetal Alchemist: Brotherhood' }
];

let next = 0

button.addEventListener('click', function () {
  if (next >= images.length) return;   // all shown already
  const pick = images[next++];
img.src = pick.src;
  img.alt = pick.alt;
  img.style.width = '200px';
  gallery.appendChild(img);
});