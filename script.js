// Observa todo lo que tenga la clase "reveal" y le agrega "visible" al entrar en pantalla
const observador = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada, i) => {
    if (entrada.isIntersecting) {
      setTimeout(() => entrada.target.classList.add('visible'), i * 120);
      observador.unobserve(entrada.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.reveal').forEach(el => observador.observe(el));