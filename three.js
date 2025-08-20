const hamburger = document.getElementById('hamburger');
const dropdownMenu = document.getElementById('dropdownMenu');

hamburger.addEventListener('click', () => {
  const isVisible = dropdownMenu.style.display === 'block';
  dropdownMenu.style.display = isVisible ? 'none' : 'block';
});
