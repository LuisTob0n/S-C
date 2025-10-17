// Importa los SDKs que necesitas de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";


// Tu configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCyS14WGVM4XYx9kTO-CGZ8mXg3AspW9JU",
    authDomain: "proyectrelay.firebaseapp.com",
    projectId: "proyectrelay",
    storageBucket: "proyectrelay.firebasestorage.app",
    messagingSenderId: "512935247942",
    appId: "1:512935247942:web:d82b24f0d6f782a9f34a47"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Captura el formulario
const form = document.getElementById("rsvp-form");

// Evento submit del formulario
form.addEventListener("submit", async (e) => {
    e.preventDefault(); // evita que se recargue la página

    // Obtén los valores del formulario
    const asistencia = form.asistencia.value;
    const nombre = form.nombre.value;
    const apellido = form.apellido.value;
    const platillo = form.platillo.value;
    const bebida = form.bebida.value;

    try {
        // Guarda en la colección "asistentes" en Firestore
        await addDoc(collection(db, "asistentes"), {
            asistencia,
            nombre,
            apellido,
            platillo,
            bebida,
            timestamp: new Date()
        });

        alert("Tu asistencia fue confirmada. ¡Gracias!");
        form.reset(); // limpia el formulario
    } catch (error) {
        console.error("❌ Error al guardar en Firebase:", error);
        alert("Ocurrió un error al registrar tu asistencia.");
    }
});