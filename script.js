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
const MAX_INCLINACION = 10; // grados máximos hacia cada lado (probá 5, 15, 20...)

// Si el usuario pidió menos movimiento, no activamos el efecto
const menosMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!menosMovimiento) {
  document.querySelectorAll('.card').forEach(card => {

    card.addEventListener('mousemove', (e) => {
      // 1. Posición y tamaño de la tarjeta en pantalla
      const caja = card.getBoundingClientRect();

      // 2. Posición del mouse DENTRO de la tarjeta (en píxeles)
      const x = e.clientX - caja.left;
      const y = e.clientY - caja.top;

      // 3. Convertimos a grados: centro = 0, bordes = ±MAX_INCLINACION
      const ry = ((x / caja.width)  - 0.5) *  2 * MAX_INCLINACION;
      const rx = ((y / caja.height) - 0.5) * -2 * MAX_INCLINACION;

      // 4. Se lo pasamos al CSS a través de variables
      card.style.setProperty('--rx', rx + 'deg');
      card.style.setProperty('--ry', ry + 'deg');
      card.style.setProperty('--mx', x + 'px');
      card.style.setProperty('--my', y + 'px');
    });

    // Al salir el mouse, volvemos a la posición neutra
    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
    });
  });
}