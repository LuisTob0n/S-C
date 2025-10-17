function actualizarHref() {
  const enlace = document.getElementById("miEnlace");
  const esMobile = window.matchMedia("(max-width: 768px)").matches;

  if (esMobile) {
    enlace.setAttribute("href", "#targetMobile");
  } else {
    enlace.setAttribute("href", "#target");
  }
}

// Ejecutar al cargar
  document.addEventListener("DOMContentLoaded", actualizarHref);

// Ejecutar al redimensionar la ventana
window.addEventListener("resize", actualizarHref);