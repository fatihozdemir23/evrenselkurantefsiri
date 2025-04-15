document.addEventListener("DOMContentLoaded", function () {
    function bindModalTriggers() {
        let triggers = document.querySelectorAll(".modal-trigger");
    
        // Modal elementini oluştur
        let modal = document.querySelector(".modal-container");
        if (!modal) {
            modal = document.createElement("div");
            modal.innerHTML = `
                <div class="modal-overlay"></div>
                <div class="modal-box">
                    <div class="modal-content"></div>
                </div>
            `;
            modal.classList.add("modal-container");
            document.body.appendChild(modal);
        }
    
        let modalBox = modal.querySelector(".modal-box");
        let modalContent = modal.querySelector(".modal-content");
        let overlay = modal.querySelector(".modal-overlay");
    
        // Önce eski event'leri temizle
        triggers.forEach(trigger => {
            trigger.removeEventListener("click", openModal); // Eski olayları kaldır
            trigger.addEventListener("click", openModal); // Yeniden ekle
        });
    
        function openModal(event) {
            let noteContent = event.currentTarget.getAttribute("data-content");
            modalContent.innerHTML = noteContent;
            modal.classList.add("open");
            event.stopPropagation();
        }
    
        // Modal dışına tıklanınca kapanması için
        function closeModal(event) {
            if (!modalBox.contains(event.target)) {
                modal.classList.remove("open");
            }
        }
    
        document.removeEventListener("click", closeModal); // Eski kapanma olayını temizle
        document.addEventListener("click", closeModal);
    }

    // Sayfa yüklendiğinde modal olaylarını bağla
    bindModalTriggers();

    // Bu fonksiyonu dışarı açıyoruz ki metin değişince tekrar çağırabilelim
    window.bindModalTriggers = bindModalTriggers;
});
