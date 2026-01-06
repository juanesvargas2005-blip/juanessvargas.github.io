const toggleButton = document.getElementById('toggle');
const overlay = document.getElementById('overlay');

toggleButton.addEventListener('click', () => {
    toggleButton.classList.toggle('active');
    overlay.classList.toggle('open');
});

// Efecto de escritura (typing)
const textoCompleto = "Estoy haciendo mi portafolio como publicista y quiero poner algo sobre mí. Debe ser muy creativo, que grite publicidad, creatividad y estrategia, pero que no suene forzado ni nerd. Quiero que vaya esto: estoy en 5to semestre de Publicidad, me encanta el diseño y la estrategia, me gusta trabajar en equipo y la presión. Me obsesiona la publicidad tanto como el pan. Algún día, director creativo.";

const elementoTexto = document.getElementById('texto-typing');
let indice = 0;
const velocidad = 25; // Milisegundos por letra

function escribirTexto() {
    if (indice < textoCompleto.length) {
        elementoTexto.textContent += textoCompleto.charAt(indice);
        indice++;
        setTimeout(escribirTexto, velocidad);
    }
}

// Observador para detectar cuando el elemento es visible
const observador = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Espera 500ms después de que sea visible
            setTimeout(escribirTexto, 200);
            observador.unobserve(entry.target); // Solo ejecuta una vez
        }
    });
}, {
    threshold: 0.5 // Se activa cuando el 50% del elemento es visible
});

// Inicia el observador cuando la página carga
window.addEventListener('load', () => {
    if (elementoTexto) {
        observador.observe(elementoTexto);
    }
});

// Cerrar menú al hacer clic en un enlace
const enlacesMenu = document.querySelectorAll('.overlay-menu a');

enlacesMenu.forEach(enlace => {
    enlace.addEventListener('click', () => {
        toggleButton.classList.remove('active');
        overlay.classList.remove('open');
    });
});

const track = document.querySelector('.carrusel-3d-track');
const imagenes = track.querySelectorAll('img');
const btnRotar = document.querySelector('.btn-rotar');

let currentIndex = 0;

function rotar() {
    // Remueve todas las clases
    imagenes.forEach(img => {
        img.classList.remove('activo', 'izquierda', 'derecha');
    });

    // Calcula las nuevas posiciones
    const izqIndex = (currentIndex - 1 + imagenes.length) % imagenes.length;
    const derIndex = (currentIndex + 1) % imagenes.length;

    // Asigna las clases
    imagenes[currentIndex].classList.add('activo');
    imagenes[izqIndex].classList.add('izquierda');
    imagenes[derIndex].classList.add('derecha');
}

// Botón para rotar
btnRotar.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % imagenes.length;
    rotar();
});

// Click en la imagen activa para rotar
track.addEventListener('click', (e) => {
    if (e.target.classList.contains('activo')) {
        currentIndex = (currentIndex + 1) % imagenes.length;
        rotar();
    }
});

// Inicializar
rotar();

