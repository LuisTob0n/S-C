const modal = document.getElementById("imgModal");
// Cambiamos el selector para apuntar a nuestro nuevo contenedor
const modalContent = document.getElementById("modalContent");
const closeBtn = document.querySelector(".img-close");
const prevBtn = document.querySelector(".img-prev");
const nextBtn = document.querySelector(".img-next");

// Asumiendo que tus li están dentro de un ul o div con este ID
const galleryItems = Array.from(document.querySelectorAll("#fh5co-gallery-list li"));
let currentIndex = 0;
let originalBg = ""; // guardar color original del body
let originalFilters = new Map(); // guarda el filtro original de cada imagen

// --- GESTURE/SWIPE VARIABLES ---
let touchstartX = 0;
let touchendX = 0;
const swipeThreshold = 70; // Mínimo de píxeles para considerar un swipe

galleryItems.forEach((item, index) => {
    item.addEventListener("click", e => {
        e.preventDefault();
        currentIndex = index;
        showModal();
    });
});

function showModal() {
    // Obtenemos el elemento actual y sus datos
    const item = galleryItems[currentIndex];
    const type = item.dataset.type; // 'image' o 'video'
    const src = item.dataset.src;   // la URL del archivo

    // 1. Limpiamos el contenido anterior del modal
    modalContent.innerHTML = '';

    // 2. Creamos el elemento correspondiente (imagen o video)
    if (type === 'image') {
        const img = document.createElement('img');
        img.src = src;
        img.className = 'img-modal-content'; // Usa esta clase para darle estilo
        img.addEventListener('contextmenu', e => e.preventDefault()); /*Evita que se descargue la iamgen eliminaando el click derecho*/
        modalContent.appendChild(img);
    } else if (type === 'video') {
        const video = document.createElement('video');
        video.src = src;
        video.className = 'img-modal-content'; // Puedes reusar la clase
        video.controls = true; // Añadimos controles para el usuario
        video.autoplay = true;
        video.loop = true;
        video.muted = true; // Mutea el video por defecto.
        video.setAttribute('controlslist', 'nodownload');
        video.addEventListener('contextmenu', e => e.preventDefault()); /*Evita que se descargue el video eliminaando el click derecho*/
        modalContent.appendChild(video);
    }

    // mostrar el modal y los filtros
    modal.classList.add("show");
    document.body.classList.add("no-scroll");

    if (originalBg === null || originalBg === "") {
        const computed = getComputedStyle(document.body).backgroundColor;
        originalBg = document.body.style.backgroundColor || computed || "";
    }
    document.body.style.backgroundColor = "rgba(0,0,0)";

    galleryItems.forEach((item) => {
        if (!originalFilters.has(item)) {
            originalFilters.set(item, item.style.filter || "");
        }
        item.style.filter = "brightness(0)";
    });
}

function closeModal() {
    modal.classList.remove("show");
    document.body.classList.remove("no-scroll");
    document.body.style.backgroundColor = originalBg || "";
    originalBg = "";

    galleryItems.forEach((item) => {
        const original = originalFilters.get(item) || "";
        item.style.filter = original;
    });

    // Detenemos cualquier video que se esté reproduciendo
    modalContent.innerHTML = '';
}

function prevImage() {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    showModal();
}

function nextImage() {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    showModal();
}

// ------------------------------------------------------------------
// --- Lógica de Gestos (Swipes) ---
// ------------------------------------------------------------------

function checkDirection() {
    const deltaX = touchendX - touchstartX;
    if (Math.abs(deltaX) > swipeThreshold) {
        if (deltaX > 0) {
            // Deslizamiento hacia la derecha = Imagen anterior
            prevImage();
        } else {
            // Deslizamiento hacia la izquierda = Imagen siguiente
            nextImage();
        }
    }
    // Opcional: limpiar las coordenadas de inicio y fin
    touchstartX = 0;
    touchendX = 0;
}

// 1. Detectar inicio del toque
modal.addEventListener('touchstart', e => {
    if (!modal.classList.contains("show")) return;
    // Solo registrar el toque si es un solo dedo
    if (e.touches.length === 1) {
        touchstartX = e.changedTouches[0].screenX;
    }
}, false);

// 2. Detectar final del toque
modal.addEventListener('touchend', e => {
    if (!modal.classList.contains("show")) return;
    if (e.changedTouches.length === 1) {
        touchendX = e.changedTouches[0].screenX;
        checkDirection();
    }
}, false);

// ------------------------------------------------------------------
// Event Listeners Existentes
// ------------------------------------------------------------------
prevBtn.addEventListener("click", (e) => { e.stopPropagation(); prevImage(); });
nextBtn.addEventListener("click", (e) => { e.stopPropagation(); nextImage(); });
closeBtn.onclick = closeModal;
modal.onclick = (e) => { if (e.target === modal) closeModal(); };
document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("show")) return;
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowLeft") prevImage();
    if (e.key === "ArrowRight") nextImage();
});