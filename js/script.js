document.addEventListener("DOMContentLoaded", function () {
  // "leftMenu" id'li div'yi bul
  let leftMenu = document.getElementById("leftMenu");

  if (leftMenu) {
    // leftMenu içindeki ilk <ul> öğesini bul
    let tocUl = leftMenu.querySelector("ul");

    if (tocUl) {
      tocUl.id = "filtered-list"; // ID ekle
    }
  }
});
document.addEventListener("DOMContentLoaded", function() {
  // Tüm TOC içindeki <a> etiketlerini seç
  document.querySelectorAll("nav a, #filtered-list a").forEach(link => {
      // İçindeki <b> ve <sup> etiketlerini kaldır
      link.querySelectorAll("b, sup").forEach(tag => tag.remove());
  });
});

function filterList() {
  let input = document.getElementById("searchInput").value.toLowerCase();
  let items = document.querySelectorAll(".list-group-item");

  items.forEach(item => {
      let text = item.textContent.toLowerCase();
      item.style.display = text.includes(input) ? "block" : "none";
  });
}



  // Gündüz/Gece modu geçişi
  const toggleModeBtn = document.getElementById('toggleMode');
  let isNightMode = false;
  toggleModeBtn.addEventListener('click', function() {
    const readingArea = document.getElementById('readingArea');
    isNightMode = !isNightMode;
    if(isNightMode) {
      readingArea.style.backgroundColor = '#2c2c2c';
      readingArea.style.color = '#f1f1f1';
      toggleModeBtn.textContent = 'Gündüz Modu';
    } else {
      readingArea.style.backgroundColor = '#fbf0cb';
      readingArea.style.color = '#000';
      toggleModeBtn.textContent = 'Gece Modu';
    }
  });





let fontSize = 1; // Başlangıç font-size (rem cinsinden)

const root = document.documentElement;
const increaseFontBtn = document.getElementById('increaseFont');
const decreaseFontBtn = document.getElementById('decreaseFont');

function updateFontSizeWithIdle(change) {
  fontSize += change;
  if (fontSize < 0.8) fontSize = 0.8; // Min limit
  if (fontSize > 2.5) fontSize = 2.5; // Max limit

  // `requestIdleCallback` ile idle zamanlarda font büyüklüğünü güncelle
  requestIdleCallback(() => {
      root.style.setProperty('--font-size', `${fontSize}rem`);
  });
}

increaseFontBtn.addEventListener('click', () => updateFontSizeWithIdle(0.1));
decreaseFontBtn.addEventListener('click', () => updateFontSizeWithIdle(-0.1));



// Tefekkür modu geçişi
var orijinalMetin = document.getElementById("readingArea").innerHTML;
const btnTefekkur = document.getElementById('btnTefekkur');
let isTefekkurMode = false;

  btnTefekkur.addEventListener('click', function() {
    
   var metinElementi = document.getElementById("readingArea");
    if(isTefekkurMode) {
        // Eski haline döndür
              metinElementi.innerHTML = orijinalMetin;
      btnTefekkur.textContent = 'Tefekkür Modu Aç';
    } else {
    // Cümle sonundaki noktaları tespit et ve `<br>` ekle
              var yeniMetin = orijinalMetin.replace(/(?<=\b[A-Za-zÇĞİÖŞÜçğıöşü]+)\. (?=[A-ZÇĞİÖŞÜ])/g, ".<br><br>");

              metinElementi.innerHTML = yeniMetin;
      btnTefekkur.textContent = 'Tefekkür Modu Kapat';
    }
    // Durumu tersine çevir
        isTefekkurMode = !isTefekkurMode; 
        bindModalTriggers(); // Yeni modal öğeleri için tekrar olay bağla
  });

 
function showModal() {

const originalList = document.getElementById("filtered-list");
const clonedList = originalList.cloneNode(true);

// Tüm toggle ikonlarını kaldır
clonedList.querySelectorAll('span.toggle-icon').forEach(el => el.remove());

// Tüm alt <ul>'leri açık yap
clonedList.querySelectorAll('ul').forEach(ul => {
  ul.classList.add('open');
  ul.style.display = "block";
});

// Modal içeriğine listeyi ekle
const container = document.getElementById("listeContainer");
container.innerHTML = "";
container.appendChild(clonedList);
// Menü açık ise kapat
const leftMenu = document.getElementById("leftMenu");
if (leftMenu && leftMenu.classList.contains("open")) {
  leftMenu.classList.remove("open");
}

// Modalı göster
document.getElementById("listeModal").style.display = "block";
}

function closeModal() {

document.getElementById("listeModal").style.display = "none";

}

// Dışarı veya bağlantıya tıklayınca kapatma
document.addEventListener("click", function(event) {


  // Liste bağlantısına tıklanırsa
  if (event.target.closest("#listeContainer a")) {
    closeModal();
  }

});
