 // Menü açma/kapama


 const rightMenu = document.getElementById('rightMenu');
const openRightMenuBtn = document.getElementById('openRightMenu');

openRightMenuBtn.addEventListener('click', function(event) {
  rightMenu.classList.toggle('open');
  event.stopPropagation(); // Butona tıklanınca body'ye yayılmasını önler
});

document.addEventListener('click', function(event) {
  // Eğer tıklanan eleman menünün içi değilse ve menü açıksa kapat
  if (!rightMenu.contains(event.target) && !openRightMenuBtn.contains(event.target)) {
    rightMenu.classList.remove('open');
  }
});