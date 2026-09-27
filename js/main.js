/* ==========================================================================
   HeyJapan · Catálogo Beauty
   Script principal
   1. Logo: muestra un recuadro de reemplazo si no existe src/logo.png
   2. Menú hamburguesa de categorías (móvil)
   3. Visor de imágenes (lightbox)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* 1. LOGO
     ------------------------------------------------------------------------ */
  var logoImage = document.getElementById('brand-logo-image');
  var logoPlaceholder = document.getElementById('brand-logo-placeholder');

  function showLogoPlaceholder() {
    logoImage.hidden = true;
    logoPlaceholder.hidden = false;
  }

  if (logoImage && logoPlaceholder) {
    logoImage.addEventListener('error', showLogoPlaceholder);
    // Si la imagen ya terminó de cargar con error antes de este script
    if (logoImage.complete && logoImage.naturalWidth === 0) {
      showLogoPlaceholder();
    }
  }

  /* 2. MENÚ DE CATEGORÍAS
     ------------------------------------------------------------------------ */
  var toggle = document.getElementById('category-nav-toggle');
  var list = document.getElementById('category-nav-list');
  var OPEN_CLASS = 'category-nav__list--open';

  function setMenu(open) {
    toggle.setAttribute('aria-expanded', String(open));
    list.classList.toggle(OPEN_CLASS, open);
  }

  if (toggle && list) {
    toggle.addEventListener('click', function () {
      var isOpen = toggle.getAttribute('aria-expanded') === 'true';
      setMenu(!isOpen);
    });

    // Cierra el menú al elegir una categoría
    list.addEventListener('click', function (event) {
      if (event.target.closest('a')) {
        setMenu(false);
      }
    });

    // Cierra el menú con la tecla Escape
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        setMenu(false);
      }
    });
  }

  /* 3. VISOR DE IMÁGENES (LIGHTBOX)
     Al hacer clic en la foto de un producto se abre ampliada.
     Se cierra con la X, la tecla Escape o haciendo clic fuera de la imagen.
     ------------------------------------------------------------------------ */
  var lightbox = document.getElementById('lightbox');
  var lightboxImage = document.getElementById('lightbox-image');
  var lightboxCaption = document.getElementById('lightbox-caption');
  var lightboxClose = document.getElementById('lightbox-close');
  var lastTrigger = null;

  function openLightbox(trigger) {
    lastTrigger = trigger;
    lightboxImage.src = trigger.getAttribute('data-lightbox-src');
    lightboxImage.alt = trigger.getAttribute('data-lightbox-caption');
    lightboxCaption.textContent = trigger.getAttribute('data-lightbox-caption');
    lightbox.showModal();
    document.body.style.overflow = 'hidden';   // evita que la página se desplace detrás
  }

  function closeLightbox() {
    if (lightbox.open) {
      lightbox.close();
    }
  }

  if (lightbox && lightboxImage) {
    document.querySelectorAll('.product-card__zoom').forEach(function (button) {
      button.addEventListener('click', function () {
        openLightbox(button);
      });
    });

    lightboxClose.addEventListener('click', closeLightbox);

    // Clic fuera de la imagen (en el fondo oscuro) cierra el visor
    lightbox.addEventListener('click', function (event) {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });

    // Al cerrar (por cualquier vía, incluida la tecla Escape)
    lightbox.addEventListener('close', function () {
      document.body.style.overflow = '';
      lightboxImage.src = '';
      if (lastTrigger) {
        lastTrigger.focus();                     // devuelve el foco a la tarjeta
      }
    });
  }
});
