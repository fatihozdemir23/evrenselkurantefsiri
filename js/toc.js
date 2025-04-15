const leftMenu = document.getElementById('leftMenu');
const openLeftMenuBtn = document.getElementById('openLeftMenu');

openLeftMenuBtn.addEventListener('click', function(event) {
  leftMenu.classList.toggle('open');
  event.stopPropagation(); // Butona tıklanınca body'ye yayılmasını önler
});

document.addEventListener('click', function(event) {
  // Eğer tıklanan eleman menünün içi değilse ve menü açıksa kapat
  if (!leftMenu.contains(event.target) && !openLeftMenuBtn.contains(event.target)) {
    leftMenu.classList.remove('open');
  }
});


document.addEventListener('DOMContentLoaded', () => {
    const toggles = document.querySelectorAll('li > a');

    toggles.forEach((toggle) => {
        const subList = toggle.nextElementSibling;
        if (subList && subList.tagName === 'UL') {
            const icon = document.createElement('span');
            icon.classList.add('toggle-icon');
            toggle.append(icon);

            // Tıklama olaylarını yönet
            toggle.addEventListener('click', (e) => {
                // Eğer tıklanan öğe .toggle-icon değilse, olay tetiklenmesin
                if (!e.target.classList.contains('toggle-icon')) return;

                e.preventDefault(); // Sayfada gezinmeyi engelle
                const isOpen = subList.classList.contains('open');
                subList.classList.toggle('open', !isOpen);
                icon.classList.toggle('open', !isOpen);
            });
        }
    });
});

  
document.getElementById('filter-input').addEventListener('input', function () {
  const filterValue = removeDiacritics(this.value.toLowerCase()); // Şapkalı harfleri kaldır
  const listItems = document.querySelectorAll('#filtered-list > li');

  listItems.forEach((item) => {
    const text = removeDiacritics(item.textContent.toLowerCase()); // Şapkalı harfleri kaldır

    if (text.includes(filterValue)) {
      item.style.display = ''; // Göster
    } else {
      item.style.display = 'none'; // Gizle
    }
  });
});

// Şapkalı harfleri kaldıran fonksiyon
function removeDiacritics(text) {
  return text.normalize('NFD') // Unicode normalizasyonu (şapkalı harfleri ayırır)
    .replace(/[\u0300-\u036f]/g, '') // Şapkalı işaretleri kaldırır
    .toLowerCase();
}
  // Listeyi seç
  const list = document.getElementById('filtered-list');
  const items = list.getElementsByTagName('li');

  // Her bir öğeyi döngüye al
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const link = item.getElementsByTagName('a')[0];
    const text = link.textContent;

    // Metni düzenle
    if (text) {
      const formattedText = text.replace(/(\d+)\/(\d+)\.\s*/, '').replace(/\s*\(\d+\s*Âyet\)/, '');
      link.textContent = formattedText;
    }
  }