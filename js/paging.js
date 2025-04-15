 let fullContent = document.getElementById("reading-area").innerHTML; // Sayfa içeriğini al
        let currentIndex = 0;
        let chunkSize = 2000; // Her seferinde eklenecek karakter sayısı
        let readingArea = document.getElementById("full-content");

        function loadNextChunk() {
            if (currentIndex >= fullContent.length) return; // Tüm metin yüklendiyse dur
            let nextChunk = fullContent.substring(currentIndex, currentIndex + chunkSize);
            let tempDiv = document.createElement("div");
            tempDiv.innerHTML = nextChunk;
            readingArea.appendChild(tempDiv);
            currentIndex += chunkSize;
        }

        // İlk yükleme
        loadNextChunk();

        // Sayfa kaydırıldıkça içerik ekleme
        window.addEventListener("scroll", function() {
            let scrollPosition = window.innerHeight + window.scrollY;
            let documentHeight = document.documentElement.scrollHeight;
            if (scrollPosition >= documentHeight - 100) { // Sayfanın en altına yaklaşınca yükle
                loadNextChunk();
            }
        });