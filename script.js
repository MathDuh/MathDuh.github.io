/* =========================================================
   0) PREFERENCIA DE MOVIMIENTO (la usan las secciones 2 y 3)
   ========================================================= */
const menosMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;


/* =========================================================
   1) REVEAL AL HACER SCROLL
   ========================================================= */
const observador = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada, i) => {
    if (entrada.isIntersecting) {
      setTimeout(() => entrada.target.classList.add('visible'), i * 120);
      observador.unobserve(entrada.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.reveal').forEach(el => observador.observe(el));


/* =========================================================
   2) INCLINACIÓN 3D DE LAS TARJETAS
   ========================================================= */
const MAX_INCLINACION = 20; // grados máximos hacia cada lado

if (!menosMovimiento) {
  document.querySelectorAll('.card').forEach(card => {

    card.addEventListener('mousemove', (e) => {
      const caja = card.getBoundingClientRect();

      const x = e.clientX - caja.left;
      const y = e.clientY - caja.top;

      const ry = ((x / caja.width)  - 0.5) *  2 * MAX_INCLINACION;
      const rx = ((y / caja.height) - 0.5) * -2 * MAX_INCLINACION;

      card.style.setProperty('--rx', rx + 'deg');
      card.style.setProperty('--ry', ry + 'deg');
      card.style.setProperty('--mx', x + 'px');
      card.style.setProperty('--my', y + 'px');
    });

    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
    });
  });
}


/* =========================================================
   3) EFECTO MÁQUINA DE ESCRIBIR (librería externa Typed.js)
   ========================================================= */
// Solo se activa si: existe el elemento, la librería cargó y el usuario permite movimiento
if (document.querySelector('#escribiendo') && typeof Typed !== 'undefined' && !menosMovimiento) {
  new Typed('#escribiendo', {
    strings: [
      'el desarrollo de software',
      'las redes',
      'los sistemas ERP',
      'aprender cosas nuevas'
    ],
    typeSpeed: 55,     // velocidad al escribir (ms por letra)
    backSpeed: 30,     // velocidad al borrar
    backDelay: 1600,   // pausa antes de borrar
    loop: true         // repite infinitamente
  });
}
/* =========================================================
   4) WHATSAPP: botón flotante y formulario de contacto
   ========================================================= */
// Código de país + número, SIN "+", espacios, guiones ni cero inicial
const NUMERO_WHATSAPP = '595981764358';   // <-- cambialo por el tuyo

// Arma el enlace de WhatsApp con el mensaje ya codificado
function enlaceWhatsApp(texto) {
  return 'https://wa.me/' + NUMERO_WHATSAPP + '?text=' + encodeURIComponent(texto);
}

// Botón flotante: le ponemos el enlace real
const botonFlotante = document.querySelector('#wa-flotante');
if (botonFlotante) {
  botonFlotante.href = enlaceWhatsApp('Hola Mathias, vi tu portafolio y quiero consultarte por un proyecto.');
}

// Formulario: en vez de enviarse a un servidor, abre WhatsApp con el mensaje armado
const formContacto = document.querySelector('#form-contacto');
if (formContacto) {
  formContacto.addEventListener('submit', (e) => {
    e.preventDefault();   // evita que la página se recargue

    const nombre  = formContacto.nombre.value.trim();
    const mensaje = formContacto.mensaje.value.trim();
    const texto   = `Hola, soy ${nombre}. ${mensaje}`;

    window.open(enlaceWhatsApp(texto), '_blank', 'noopener');
  });
}s