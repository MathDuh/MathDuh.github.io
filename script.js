// Observa las tarjetas y les agrega la clase "visible" cuando entran en pantalla
const observador = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada, i) => {
    if (entrada.isIntersecting) {
      // pequeño retraso escalonado según el orden de aparición
      setTimeout(() => entrada.target.classList.add('visible'), i * 150);
      observador.unobserve(entrada.target); // ya no hace falta seguir observándola
    }
  });
}, { threshold: 0.2 }); // se activa cuando se ve el 20% de la tarjeta

document.querySelectorAll('.card').forEach(card => observador.observe(card));