const yukleniyorMesaji = document.getElementById('loading');
        const icerikDiv = document.getElementById('reading-area');
        const tumOgeler = icerikDiv.querySelectorAll('*');
        const oncekiSayfaBtn = document.getElementById('onceki-sayfa');
        const sonrakiSayfaBtn = document.getElementById('sonraki-sayfa');
        const mevcutSayfaSpan = document.getElementById('mevcut-sayfa');
        const toplamSayfaSpan = document.getElementById('toplam-sayfa');
        const sayfalamaKontrolDiv = document.getElementById('sayfalama-kontrol');
      
       

        const ogeSayisiBasinaSayfa = 50;
        let mevcutSayfa = 1;
        let toplamSayfa = Math.ceil(tumOgeler.length / ogeSayisiBasinaSayfa);

        function sayfayiGoster(sayfaNumarasi, scrollToElementId = null, updateHistory = true) {
            console.log('Sayfayı göster:', sayfaNumarasi, 'Hedef ID:', scrollToElementId); // DEBUG
            if (sayfaNumarasi < 1 || sayfaNumarasi > toplamSayfa) {
                return;
            }

            mevcutSayfa = sayfaNumarasi;
            mevcutSayfaSpan.textContent = mevcutSayfa;
           

            for (let i = 0; i < tumOgeler.length; i++) {
                tumOgeler[i].classList.add('gizli');
            }

            const baslangicIndex = (mevcutSayfa - 1) * ogeSayisiBasinaSayfa;
            const bitisIndex = Math.min(baslangicIndex + ogeSayisiBasinaSayfa, tumOgeler.length);

            for (let i = baslangicIndex; i < bitisIndex; i++) {
                tumOgeler[i].classList.remove('gizli');
            }

            oncekiSayfaBtn.disabled = mevcutSayfa === 1;
            sonrakiSayfaBtn.disabled = mevcutSayfa === toplamSayfa;

            if (scrollToElementId) {
                const targetElement = document.getElementById(scrollToElementId);
                console.log('Hedef Element:', targetElement); // DEBUG
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                } else {
                    console.log('Hedef element bulunamadı:', scrollToElementId); // DEBUG
                }
            }

            if (updateHistory) {
                const newUrl = window.location.pathname + window.location.search + (scrollToElementId ? `#${scrollToElementId}` : `#sayfa-${sayfaNumarasi}`);
                history.pushState({ sayfa: sayfaNumarasi, scrollTo: scrollToElementId }, null, newUrl);
            }
        }

        oncekiSayfaBtn.addEventListener('click', () => sayfayiGoster(mevcutSayfa - 1));
        sonrakiSayfaBtn.addEventListener('click', () => sayfayiGoster(mevcutSayfa + 1));

      

        window.onload = function() {
            toplamSayfaSpan.textContent = toplamSayfa;
           
            const initialHash = window.location.hash;
            if (initialHash) {
                const targetId = initialHash.substring(1);
                const targetElement = document.getElementById(targetId);
                console.log('İlk Yükleme - Hedef ID:', targetId, 'Element:', targetElement); // DEBUG
                if (targetElement) {
                    let hedefSayfa = -1;
                    for (let i = 0; i < tumOgeler.length; i++) {
                        if (tumOgeler[i].id === targetId) {
                            hedefSayfa = Math.floor(i / ogeSayisiBasinaSayfa) + 1;
                            break;
                        }
                    }
                    console.log('İlk Yükleme - Hedef Sayfa:', hedefSayfa); // DEBUG
                    if (hedefSayfa > 0) {
                        sayfayiGoster(hedefSayfa, targetId, false);
                    } else {
                        sayfayiGoster(1, null, false);
                    }
                } else if (initialHash.startsWith('#sayfa-')) {
                    const sayfaNumarasi = parseInt(initialHash.substring(7));
                    if (!isNaN(sayfaNumarasi) && sayfaNumarasi >= 1 && sayfaNumarasi <= toplamSayfa) {
                        sayfayiGoster(sayfaNumarasi, null, false);
                    } else {
                        sayfayiGoster(1, null, false);
                    }
                } else {
                    sayfayiGoster(1, null, false);
                }
            } else {
                sayfayiGoster(1, null, false);
            }
            yukleniyorMesaji.style.display = 'none';
            icerikDiv.style.display = 'block';
            sayfalamaKontrolDiv.style.display = 'block';
        };

      window.addEventListener('hashchange', function() {
    const targetId = window.location.hash.substring(1);
    const targetElement = document.getElementById(targetId);
    console.log('Hash Değişti - Hedef ID:', targetId);
    console.log('Hash Değişti - Hedef Element:', targetElement);
    if (targetElement) {
        let hedefSayfa = -1;
        for (let i = 0; i < tumOgeler.length; i++) {
            if (tumOgeler[i].id === targetId) {
                hedefSayfa = Math.floor(i / ogeSayisiBasinaSayfa) + 1;
                console.log('Hash Değişti - Bulunan Element Index:', i); // EKLEDİ
                console.log('Hash Değişti - Hesaplanan Hedef Sayfa:', hedefSayfa); // EKLEDİ
                break;
            }
        }
        if (hedefSayfa > 0) {
            sayfayiGoster(hedefSayfa, targetId);
        }
    } else if (window.location.hash.startsWith('#sayfa-')) {
        // ...
    }
});

        window.addEventListener('popstate', function(event) {
            if (event.state && event.state.sayfa) {
                sayfayiGoster(event.state.sayfa, event.state.scrollTo, false);
            } else if (window.location.hash.startsWith('#sayfa-')) {
                const sayfaNumarasi = parseInt(window.location.hash.substring(7));
                if (!isNaN(sayfaNumarasi) && sayfaNumarasi >= 1 && sayfaNumarasi <= toplamSayfa) {
                    sayfayiGoster(sayfaNumarasi, null, false);
                } else if (window.location.hash) {
                    const targetId = window.location.hash.substring(1);
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        let hedefSayfa = -1;
                        for (let i = 0; i < tumOgeler.length; i++) {
                            if (tumOgeler[i].id === targetId) {
                                hedefSayfa = Math.floor(i / ogeSayisiBasinaSayfa) + 1;
                                break;
                            }
                        }
                        if (hedefSayfa > 0) {
                            sayfayiGoster(hedefSayfa, targetId, false);
                        }
                    }
                } else {
                    sayfayiGoster(1, null, false);
                }
            } else {
                sayfayiGoster(1, null, false);
            }
        });
 