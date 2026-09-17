/**
 * EMEA ARQUITECTURA - Application Logic & Dynamic Portfolio CMS
 */

import { INITIAL_PROJECTS } from './projects-data.js';

// Estado global de proyectos con persistencia en LocalStorage
const STORAGE_KEY = 'emea_projects_db_v1';

function getStoredProjects() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error("Error al leer proyectos de localStorage", e);
    }
  }
  // Guardar los iniciales por defecto si no existen
  localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PROJECTS));
  return INITIAL_PROJECTS;
}

function saveProjects(projects) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

// Inicialización del DOM
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initPortfolio();
  initProjectModals();
  initAdminModal();
  initContactForm();
  initLightbox();
});

/* ==========================================================================
   1. NAVBAR & NAVEGACIÓN
   ========================================================================== */
function initNavbar() {
  const header = document.querySelector('.site-header');
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
    });

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
      });
    });
  }
}

/* ==========================================================================
   2. PORTAFOLIO DINÁMICO Y FILTROS
   ========================================================================== */
let activeFilter = 'all';

function initPortfolio() {
  renderProjects();

  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      renderProjects();
    });
  });
}

function renderProjects() {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;

  const projects = getStoredProjects();
  const filtered = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
        <p style="font-size: 1.1rem;">No hay proyectos registrados en esta categoría aún.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(proj => `
    <article class="project-card" data-id="${proj.id}">
      <div class="project-card-image">
        <img src="${proj.image}" alt="${escapeHtml(proj.title)}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80'">
        <span class="project-card-badge ${proj.category === 'hospitalaria' ? 'badge-hospitalaria' : 'badge-habitacional'}">
          ${proj.categoryLabel || (proj.category === 'hospitalaria' ? 'Arquitectura Sanitaria' : 'Arquitectura Habitacional')}
        </span>
      </div>
      <div class="project-card-body">
        <div class="project-card-meta">
          <span>📍 ${escapeHtml(proj.location || 'Argentina')}</span>
          <span>📐 ${escapeHtml(proj.surface || 'S/D')}</span>
          <span>📅 ${escapeHtml(proj.year || '2024')}</span>
        </div>
        <h3 class="project-card-title">${escapeHtml(proj.title)}</h3>
        <p class="project-card-summary">${escapeHtml(proj.summary || '')}</p>
        <div class="project-card-footer">
          <span>Ver Ficha Técnica Completa</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </div>
      </div>
    </article>
  `).join('');

  // Event listeners para abrir detalle
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.id;
      openProjectDetail(id);
    });
  });
}

/* ==========================================================================
   3. MODAL DE DETALLE DE OBRA
   ========================================================================== */
function initProjectModals() {
  const modalBackdrop = document.getElementById('projectDetailModal');
  const closeBtn = document.getElementById('closeDetailModal');

  if (closeBtn && modalBackdrop) {
    closeBtn.addEventListener('click', () => {
      modalBackdrop.classList.remove('active');
    });

    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        modalBackdrop.classList.remove('active');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
        modalBackdrop.classList.remove('active');
      }
    });
  }
}

function openProjectDetail(id) {
  const projects = getStoredProjects();
  const proj = projects.find(p => p.id === id);
  if (!proj) return;

  const modalBackdrop = document.getElementById('projectDetailModal');
  const modalBody = document.getElementById('projectModalBody');

  const specs = (proj.details && proj.details.specs) || [
    { label: "Superficie", value: proj.surface || "Consultar" },
    { label: "Ubicación", value: proj.location || "Argentina" },
    { label: "Año de Proyecto", value: proj.year || "2024" },
    { label: "Tipología", value: proj.categoryLabel || proj.category }
  ];

  const rawGallery = (proj.details && proj.details.gallery && proj.details.gallery.length > 0)
    ? proj.details.gallery
    : [proj.image];

  // Consolidar lista completa de imágenes únicas (con la imagen principal primero)
  const allModalImages = Array.from(new Set([proj.image, ...rawGallery]));

  modalBody.innerHTML = `
    <div class="project-modal-hero" id="projectHeroTrigger" title="Haz clic para ampliar la imagen en alta resolución">
      <img id="mainDetailImage" src="${proj.image}" alt="${escapeHtml(proj.title)}">
      <div class="hero-zoom-badge">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
        <span>Ampliar imagen</span>
      </div>
    </div>
    <div class="project-modal-content">
      <div class="modal-tag-row">
        <span class="section-tag">${proj.categoryLabel || proj.category}</span>
        <span style="font-size: 0.82rem; color: var(--text-muted); font-weight: 600; letter-spacing: 0.05em;">ID: ${proj.id}</span>
      </div>
      <h2 class="project-modal-title">${escapeHtml(proj.title)}</h2>
      
      <div class="project-specs-grid">
        ${specs.map(s => `
          <div class="spec-box">
            <span class="spec-box-label">${escapeHtml(s.label)}</span>
            <span class="spec-box-val">${escapeHtml(s.value)}</span>
          </div>
        `).join('')}
      </div>

      <div class="project-modal-body">
        <h4>Memoria Descriptiva & Concepto</h4>
        <p>${escapeHtml(proj.summary || '')}</p>

        ${proj.details && proj.details.program ? `
          <h4>Programa Arquitectónico</h4>
          <p>${escapeHtml(proj.details.program)}</p>
        ` : ''}

        ${proj.details && proj.details.challenges ? `
          <h4>Desafíos Técnicos & Bioseguridad</h4>
          <p>${escapeHtml(proj.details.challenges)}</p>
        ` : ''}

        ${allModalImages.length > 0 ? `
          <div class="gallery-header">
            <h4>Galería del Proyecto</h4>
            <span class="gallery-hint">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
              Haz clic en cualquier imagen para ampliarla
            </span>
          </div>
          <div class="project-gallery-thumbs">
            ${allModalImages.map((imgUrl, i) => `
              <div class="thumb-img" data-gallery-idx="${i}" title="Ampliar imagen ${i + 1} en alta resolución">
                <img src="${imgUrl}" alt="Vista ${i + 1} de ${escapeHtml(proj.title)}">
                <div class="thumb-overlay">
                  <span class="thumb-overlay-badge">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                    Ampliar
                  </span>
                </div>
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>

      <div style="margin-top: 3rem; display: flex; gap: 1rem; justify-content: flex-end;">
        <a href="#contacto" onclick="document.getElementById('projectDetailModal').classList.remove('active')" class="btn btn-primary">
          Consultar por este tipo de obra
        </a>
      </div>
    </div>
  `;

  // Listeners para ampliar imagen principal y galería
  const heroTrigger = modalBody.querySelector('#projectHeroTrigger');
  if (heroTrigger) {
    heroTrigger.addEventListener('click', () => {
      const mainImg = document.getElementById('mainDetailImage');
      const currentSrc = mainImg ? mainImg.src : proj.image;
      const idx = Math.max(0, allModalImages.findIndex(src => currentSrc.includes(src) || src.includes(currentSrc)));
      if (typeof window.openLightbox === 'function') {
        window.openLightbox(allModalImages, idx, proj.title);
      }
    });
  }

  const thumbEls = modalBody.querySelectorAll('.thumb-img');
  thumbEls.forEach((thumb) => {
    thumb.addEventListener('click', () => {
      const idx = parseInt(thumb.getAttribute('data-gallery-idx'), 10) || 0;
      const mainImg = document.getElementById('mainDetailImage');
      if (mainImg && allModalImages[idx]) {
        mainImg.src = allModalImages[idx];
      }
      if (typeof window.openLightbox === 'function') {
        window.openLightbox(allModalImages, idx, proj.title);
      }
    });
  });

  modalBackdrop.classList.add('active');
}

/* ==========================================================================
   4. CMS / CARGA DINÁMICA DE NUEVAS OBRAS
   ========================================================================== */
function initAdminModal() {
  const addProjectBtn = document.getElementById('openAddProjectModal');
  const modalBackdrop = document.getElementById('addProjectModal');
  const closeBtn = document.getElementById('closeAddModal');
  const form = document.getElementById('addProjectForm');
  const presetSelector = document.getElementById('presetImageSelector');

  if (!modalBackdrop) return;

  if (addProjectBtn) {
    addProjectBtn.addEventListener('click', () => {
      modalBackdrop.classList.add('active');
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modalBackdrop.classList.remove('active');
    });
  }

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      modalBackdrop.classList.remove('active');
    }
  });

  // Selector rápido de presets de fotos
  if (presetSelector) {
    presetSelector.addEventListener('change', (e) => {
      if (e.target.value) {
        document.getElementById('newProjImage').value = e.target.value;
      }
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const title = document.getElementById('newProjTitle').value.trim();
      const category = document.getElementById('newProjCategory').value;
      const year = document.getElementById('newProjYear').value.trim() || '2025';
      const location = document.getElementById('newProjLocation').value.trim() || 'Argentina';
      const surface = document.getElementById('newProjSurface').value.trim() || '1.000 m²';
      const image = document.getElementById('newProjImage').value.trim() || 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80';
      const summary = document.getElementById('newProjSummary').value.trim();
      const program = document.getElementById('newProjProgram').value.trim();
      const challenges = document.getElementById('newProjChallenges').value.trim();

      const newProject = {
        id: 'proj-' + Date.now(),
        title: title,
        category: category,
        categoryLabel: category === 'hospitalaria' ? 'Arquitectura Sanitaria' : 'Arquitectura Habitacional',
        year: year,
        location: location,
        surface: surface,
        image: image,
        summary: summary,
        details: {
          client: "Estudio EMEA",
          program: program || "Programa médico-arquitectónico integral con áreas de atención y servicios técnicos.",
          challenges: challenges || "Diseño bioclimático, estanqueidad aséptica y optimización de flujos.",
          specs: [
            { label: "Superficie", value: surface },
            { label: "Ubicación", value: location },
            { label: "Año de Proyecto", value: year },
            { label: "Tipología", value: category === 'hospitalaria' ? 'Sanitaria' : 'Residencial' }
          ],
          gallery: [image]
        }
      };

      const projects = getStoredProjects();
      projects.unshift(newProject); // Agregar al principio
      saveProjects(projects);

      form.reset();
      modalBackdrop.classList.remove('active');
      renderProjects();
      showToast(`¡Obra "${title}" agregada con éxito al catálogo!`);
    });
  }
}

/* ==========================================================================
   5. FORMULARIO DE CONTACTO Y WHATSAPP
   ========================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  const whatsappBtn = document.getElementById('whatsappDirectBtn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('contactName').value.trim();
      const email = document.getElementById('contactEmail').value.trim();
      const type = document.getElementById('contactType').value;
      const message = document.getElementById('contactMessage').value.trim();

      if (!name || !email || !message) {
        showToast('Por favor, completa los campos obligatorios.', 'error');
        return;
      }

      // Simulación de envío exitoso
      showToast(`Gracias ${name}. Tu consulta sobre ${type} ha sido enviada al equipo de Manestar + Avila.`);
      contactForm.reset();
    });
  }

  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const phone = "5493516652493"; // Número oficial Manestar + Avila
      const text = encodeURIComponent("Hola Manestar + Avila Arquitectura. Me pongo en contacto desde su sitio web para consultar por un proyecto.");
      window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
    });
  }
}

/* ==========================================================================
   5. VISOR DE IMÁGENES / LIGHTBOX (AMPLIAR FOTOS EN ALTA RESOLUCIÓN)
   ========================================================================== */
let activeLightboxImages = [];
let currentLightboxIndex = 0;
let currentLightboxTitle = '';

function initLightbox() {
  const backdrop = document.getElementById('imageLightboxModal');
  const closeBtn = document.getElementById('closeLightbox');
  const prevBtn = document.getElementById('lightboxPrevBtn');
  const nextBtn = document.getElementById('lightboxNextBtn');
  const imgEl = document.getElementById('lightboxImage');
  const captionEl = document.getElementById('lightboxCaption');
  const counterEl = document.getElementById('lightboxCounter');

  if (!backdrop) return;

  function closeLightbox() {
    backdrop.classList.remove('active');
    backdrop.setAttribute('aria-hidden', 'true');
  }

  function showImage(idx) {
    if (!activeLightboxImages || activeLightboxImages.length === 0) return;
    if (idx < 0) idx = activeLightboxImages.length - 1;
    if (idx >= activeLightboxImages.length) idx = 0;
    currentLightboxIndex = idx;

    const imgUrl = activeLightboxImages[currentLightboxIndex];
    if (imgEl) {
      imgEl.style.opacity = '0';
      imgEl.src = imgUrl;
      imgEl.onload = () => {
        imgEl.style.opacity = '1';
      };
    }

    if (captionEl) {
      captionEl.textContent = `${currentLightboxTitle} — Vista ${currentLightboxIndex + 1}`;
    }
    if (counterEl) {
      counterEl.textContent = `${currentLightboxIndex + 1} / ${activeLightboxImages.length}`;
    }

    if (prevBtn && nextBtn) {
      const showNav = activeLightboxImages.length > 1;
      prevBtn.style.display = showNav ? 'flex' : 'none';
      nextBtn.style.display = showNav ? 'flex' : 'none';
    }
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeLightbox();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showImage(currentLightboxIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showImage(currentLightboxIndex + 1);
    });
  }

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop || e.target.id === 'lightboxDialog') {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (!backdrop.classList.contains('active')) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      showImage(currentLightboxIndex - 1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      showImage(currentLightboxIndex + 1);
    }
  });

  window.openLightbox = function(images, startIndex, title) {
    if (!images || images.length === 0) return;
    activeLightboxImages = images;
    currentLightboxTitle = title || 'Proyecto';
    backdrop.classList.add('active');
    backdrop.setAttribute('aria-hidden', 'false');
    showImage(startIndex || 0);
  };
}

/* ==========================================================================
   6. UTILIDADES
   ========================================================================== */
function showToast(message) {
  let toast = document.getElementById('toastNotification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotification';
    toast.className = 'toast-notification';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
    <span>${escapeHtml(message)}</span>
  `;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
