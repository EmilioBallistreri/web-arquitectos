/**
 * MANESTAR + AVILA ARQUITECTURA
 * Application Logic & Dynamic Portfolio CMS
 */

import { INITIAL_PROJECTS } from './projects-data.js';

// Estado global de proyectos con persistencia en LocalStorage
const STORAGE_KEY = 'ma_projects_db_v3';

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
  initPhotoCover();
  initSpecialtyButtons();
  initPortfolio();
  initProjectModals();
  initWellnessModal();
  initVerticalServicesAccordion();
  initAdminModal();
  initSecretAdmin();
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
   2. BOTONES DE ESPECIALIDAD (PÁGINA 3 DEL PDF) & PORTAFOLIO
   ========================================================================== */
let activeFilter = 'salud'; // 'salud' por defecto como en la maqueta

function initSpecialtyButtons() {
  const btnSalud = document.getElementById('btnCatSalud');
  const btnResidenciales = document.getElementById('btnCatResidenciales');
  const catalogoSection = document.getElementById('catalogoObras');

  if (btnSalud) {
    btnSalud.addEventListener('click', () => {
      setSpecialtyCategory('salud');
      if (catalogoSection) {
        catalogoSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  if (btnResidenciales) {
    btnResidenciales.addEventListener('click', () => {
      setSpecialtyCategory('residenciales');
      if (catalogoSection) {
        catalogoSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }
}

function setSpecialtyCategory(cat) {
  activeFilter = cat;

  // Actualizar estado activo en los dos botones de la página 3
  const btnSalud = document.getElementById('btnCatSalud');
  const btnResidenciales = document.getElementById('btnCatResidenciales');
  if (btnSalud) btnSalud.classList.toggle('active', cat === 'salud');
  if (btnResidenciales) btnResidenciales.classList.toggle('active', cat === 'residenciales');

  // Actualizar pills del catálogo
  const pills = document.querySelectorAll('.filter-pill');
  pills.forEach(p => {
    p.classList.toggle('active', p.dataset.filter === cat);
  });

  // Actualizar encabezados
  const headingEl = document.getElementById('currentCategoryHeading');
  const descEl = document.getElementById('currentCategoryDesc');
  if (headingEl) {
    if (cat === 'salud') {
      headingEl.textContent = 'ARQUITECTURA PARA LA SALUD';
      if (descEl) descEl.textContent = 'Infraestructura hospitalaria, diagnóstico por imágenes de alta complejidad y centros médicos.';
    } else if (cat === 'residenciales') {
      headingEl.textContent = 'RESIDENCIALES';
      if (descEl) descEl.textContent = 'Viviendas contemporáneas de diseño a medida, arquitectura bioclimática y armonía espacial.';
    } else {
      headingEl.textContent = 'TODAS LAS OBRAS';
      if (descEl) descEl.textContent = 'Catálogo completo de proyectos desarrollados por Manestar + Avila.';
    }
  }

  renderProjects();
}

function initPortfolio() {
  renderProjects();

  const filterPills = document.querySelectorAll('.filter-pill');
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const cat = pill.dataset.filter;
      setSpecialtyCategory(cat);
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

  // Página 4 del PDF: una foto como portada de cada obra y esa sea el botón para desplegar más datos de esa obra
  grid.innerHTML = filtered.map(proj => `
    <article class="project-card-editorial" data-id="${proj.id}">
      <div class="project-cover-wrap">
        <img src="${proj.image}" alt="${escapeHtml(proj.title)}" loading="lazy" class="project-cover-img" onerror="this.src='assets/siss-hero.jpg'">
        <div class="project-cover-gradient"></div>
        <div class="project-cover-info">
          <span class="project-cover-badge">${escapeHtml(proj.categoryLabel || (proj.category === 'salud' ? 'Arquitectura Para la Salud' : 'Residenciales'))}</span>
          <h3 class="project-cover-title">${escapeHtml(proj.shortTitle || proj.title)}</h3>
          <span class="project-cover-action">
            <span>Ver memoria descriptiva & fotos</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </span>
        </div>
      </div>
    </article>
  `).join('');

  // Event listeners para abrir detalle
  document.querySelectorAll('.project-card-editorial').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.id;
      openProjectDetail(id);
    });
  });
}

/* ==========================================================================
   3. MODAL DE DETALLE DE OBRA / MEMORIA DESCRIPTIVA (PÁGINA 5 DEL PDF)
   "PICA SOBRE PALABRA MEMORIA Y SE DESPLIEGA LA DESCRIPCIÓN Y SE ESCROLEA PARA ABAJO PARA VER LAS IMAGENES"
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

  const rawGallery = (proj.details && proj.details.gallery && proj.details.gallery.length > 0)
    ? proj.details.gallery
    : [proj.image];

  const allModalImages = Array.from(new Set([proj.image, ...rawGallery]));

  // Texto de la Memoria Descriptiva formateado en párrafos
  const memoriaRaw = proj.memoriaDescriptiva || proj.summary || 'Memoria descriptiva en elaboración.';
  const memoriaParagraphs = memoriaRaw.split('\n\n').filter(p => p.trim().length > 0);

  modalBody.innerHTML = `
    <div class="project-detail-layout">
      <!-- Barra Superior / Header de Ficha Técnica -->
      <div class="project-detail-topbar">
        <div class="detail-brand-badge">
          <img src="assets/logo-manestar-avila-black.png" alt="Manestar + Avila" class="detail-logo-mini">
        </div>
        <div class="detail-category-tag">
          ${escapeHtml(proj.categoryLabel || (proj.category === 'salud' ? 'ARQUITECTURA PARA LA SALUD' : 'RESIDENCIALES'))}
        </div>
      </div>

      <!-- Encabezado de la Obra (Página 5) -->
      <div class="project-detail-header">
        <h2 class="project-detail-title">${escapeHtml(proj.title)}</h2>
        <div class="project-detail-meta-line">
          ${proj.status ? `<span>${escapeHtml(proj.status)}</span> <span class="meta-sep">|</span>` : ''}
          <span>${escapeHtml(proj.year || '2026')}</span>
          <span class="meta-sep">|</span>
          <span>${escapeHtml(proj.surface || '')}</span>
          <span class="meta-sep">|</span>
          <span>${escapeHtml(proj.location || 'Córdoba, Argentina')}</span>
        </div>
        <div class="project-detail-usage">
          <strong>Uso:</strong> ${escapeHtml(proj.use || (proj.category === 'salud' ? 'Salud / Diagnóstico por Imágenes' : 'Habitacional / Residencial'))}
        </div>
      </div>

      <!-- ACORDEÓN MEMORIA DESCRIPTIVA (PÁGINA 5 DEL PDF) -->
      <div class="memoria-accordion-box">
        <button class="memoria-toggle-header active" id="memoriaAccordionBtn" aria-expanded="true" title="Pica sobre la palabra Memoria para desplegar o contraer">
          <div class="memoria-toggle-title">
            <span class="memoria-label-word">MEMORIA DESCRIPTIVA</span>
            <span class="memoria-instruction-hint">(Pica aquí para desplegar / contraer)</span>
          </div>
          <span class="memoria-arrow-icon">▼</span>
        </button>

        <div class="memoria-content-body open" id="memoriaContentBody">
          <div class="memoria-paragraphs">
            ${memoriaParagraphs.map(p => `<p>${escapeHtml(p)}</p>`).join('')}
          </div>
        </div>
      </div>

      <!-- SECCIÓN SCROLL PARA ABAJO PARA VER LAS IMÁGENES (PÁGINA 5) -->
      <div class="project-gallery-scroll-section">
        <div class="gallery-scroll-prompt">
          <span class="scroll-arrow-down">↓</span>
          <span>DESLIZA HACIA ABAJO PARA VER LAS IMÁGENES</span>
        </div>

        <div class="project-photos-stack">
          ${allModalImages.map((imgUrl, i) => `
            <div class="project-stack-photo-item" data-idx="${i}" title="Haz clic para ampliar">
              <img src="${imgUrl}" alt="Vista ${i + 1} de ${escapeHtml(proj.title)}" class="stack-img" loading="lazy">
              <div class="stack-photo-overlay">
                <span class="stack-zoom-pill">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                  <span>Ampliar Vista ${i + 1}</span>
                </span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Pie de Modal: CTA Contacto -->
      <div class="project-detail-footer-cta">
        <p>¿Desea consultar sobre un proyecto similar?</p>
        <a href="#contacto" onclick="document.getElementById('projectDetailModal').classList.remove('active')" class="btn btn-primary">
          Conversar con el Estudio
        </a>
      </div>
    </div>
  `;

  // Listener para el acordeón de Memoria Descriptiva
  const memoriaBtn = modalBody.querySelector('#memoriaAccordionBtn');
  const memoriaBody = modalBody.querySelector('#memoriaContentBody');
  if (memoriaBtn && memoriaBody) {
    memoriaBtn.addEventListener('click', () => {
      const isOpen = memoriaBody.classList.contains('open');
      if (isOpen) {
        memoriaBody.classList.remove('open');
        memoriaBtn.classList.remove('active');
        memoriaBtn.setAttribute('aria-expanded', 'false');
      } else {
        memoriaBody.classList.add('open');
        memoriaBtn.classList.add('active');
        memoriaBtn.setAttribute('aria-expanded', 'true');
      }
    });
  }

  // Listeners para ampliar fotos de la galería en lightbox
  const photoItems = modalBody.querySelectorAll('.project-stack-photo-item');
  photoItems.forEach(item => {
    item.addEventListener('click', () => {
      const idx = parseInt(item.dataset.idx, 10) || 0;
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

/* ==========================================================================
   7. PORTADA DE FOTOS CON SELECCIÓN ALEATORIA & ROTACIÓN
   ========================================================================== */
/* ==========================================================================
   6. PORTADA DE FOTOS CON SELECCIÓN ALEATORIA & ROTACIÓN (PÁGINA 1 DEL PDF)
   ========================================================================== */
const COVER_ROTATION_MS = 6500;

const COVER_PHOTOS = [
  {
    url: "assets/siss-hero.jpg",
    title: "Centro Médico SISS",
    tag: "Centro Médico de Vanguardia",
    sub: "Arquitectura Para la Salud — Córdoba"
  },
  {
    url: "assets/villa-dolores-night.jpg",
    title: "Centro de Diagnóstico e Imágenes Médicas Villa Dolores",
    tag: "Salud / Diagnóstico por Imágenes",
    sub: "Fachada Vidriada y Hall a Doble Altura Iluminado"
  },
  {
    url: "assets/villa-dolores-facade.jpg",
    title: "Centro Diagnóstico por Imágenes Villa Dolores",
    tag: "Arquitectura Para la Salud",
    sub: "Piel Metálica Microperforada de Planos Desplazados"
  },
  {
    url: "assets/cat-salud.jpg",
    title: "Arquitectura Para la Salud",
    tag: "Especialidad en Salud",
    sub: "Envolventes Arquitectónicas & Rigor Bioseguro"
  },
  {
    url: "assets/cat-residenciales.jpg",
    title: "Residenciales Contemporáneos",
    tag: "Arquitectura Residencial",
    sub: "Viviendas Unifamiliares con Eficiencia Bioclimática"
  }
];

let currentCoverIdx = 0;
let coverAutoTimer = null;

function initPhotoCover() {
  const bgEl = document.getElementById('photoCoverBg');
  const captionEl = document.getElementById('coverPhotoCaption');
  const subEl = document.getElementById('coverPhotoSub');
  const currentNumEl = document.getElementById('coverCurrentNum');
  const totalNumEl = document.getElementById('coverTotalNum');
  const progressFill = document.getElementById('coverProgressFill');
  const prevBtn = document.getElementById('coverPrevBtn');
  const nextBtn = document.getElementById('coverNextBtn');
  const randomBtn = document.getElementById('coverRandomBtn');

  if (!bgEl) return;

  if (totalNumEl) {
    totalNumEl.textContent = String(COVER_PHOTOS.length).padStart(2, '0');
  }

  function setCoverPhoto(idx) {
    if (idx < 0) idx = COVER_PHOTOS.length - 1;
    if (idx >= COVER_PHOTOS.length) idx = 0;
    currentCoverIdx = idx;

    const photo = COVER_PHOTOS[currentCoverIdx];

    // Actualizar Contador editorial (ej: 01 / 05)
    if (currentNumEl) {
      currentNumEl.textContent = String(currentCoverIdx + 1).padStart(2, '0');
    }

    // Actualizar textos y metadatos de la obra
    if (captionEl) captionEl.textContent = photo.title;
    if (subEl) subEl.textContent = photo.sub || photo.tag;

    // Transición suave de fondo con efecto zoom cinematográfico continuo
    bgEl.style.opacity = '0.35';
    bgEl.classList.remove('zoom-effect');

    const tempImg = new Image();
    tempImg.src = photo.url;
    tempImg.onload = () => {
      bgEl.style.backgroundImage = `url('${photo.url}')`;
      bgEl.style.opacity = '1';
      bgEl.classList.add('zoom-effect');
    };

    // Actualizar barra de progreso lineal de auto-rotación
    if (progressFill) {
      progressFill.style.transition = 'none';
      progressFill.style.width = '0%';
      void progressFill.offsetWidth;
      progressFill.style.transition = `width ${COVER_ROTATION_MS}ms linear`;
      progressFill.style.width = '100%';
    }
  }

  function nextCoverPhoto() {
    setCoverPhoto(currentCoverIdx + 1);
  }

  function prevCoverPhoto() {
    setCoverPhoto(currentCoverIdx - 1);
  }

  function randomCoverPhoto() {
    let nextIdx;
    do {
      nextIdx = Math.floor(Math.random() * COVER_PHOTOS.length);
    } while (nextIdx === currentCoverIdx && COVER_PHOTOS.length > 1);
    setCoverPhoto(nextIdx);

    if (randomBtn) {
      const svg = randomBtn.querySelector('svg');
      if (svg) {
        svg.style.transition = 'transform 0.4s ease';
        svg.style.transform = 'rotate(180deg)';
        setTimeout(() => {
          svg.style.transform = '';
        }, 400);
      }
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      prevCoverPhoto();
      restartCoverTimer();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      nextCoverPhoto();
      restartCoverTimer();
    });
  }

  if (randomBtn) {
    randomBtn.addEventListener('click', (e) => {
      e.preventDefault();
      randomCoverPhoto();
      restartCoverTimer();
    });
  }

  function startCoverTimer() {
    if (progressFill) {
      progressFill.style.transition = 'none';
      progressFill.style.width = '0%';
      void progressFill.offsetWidth;
      progressFill.style.transition = `width ${COVER_ROTATION_MS}ms linear`;
      progressFill.style.width = '100%';
    }
    coverAutoTimer = setInterval(() => {
      nextCoverPhoto();
    }, COVER_ROTATION_MS);
  }

  function restartCoverTimer() {
    clearInterval(coverAutoTimer);
    startCoverTimer();
  }

  // Foto inicial (Centro Médico SISS en índice 0 o aleatorio)
  setCoverPhoto(0);
  startCoverTimer();
}

/* ==========================================================================
   7. MODAL DE WELLNESS (BIENESTAR) - PÁGINA 7 DEL PDF
   ========================================================================== */
function initWellnessModal() {
  const openBtn = document.getElementById('openWellnessModalBtn');
  const modalBackdrop = document.getElementById('wellnessDetailModal');
  const closeBtn = document.getElementById('closeWellnessModal');
  const wheelTrigger = document.getElementById('wellnessWheelTrigger');

  if (openBtn && modalBackdrop) {
    openBtn.addEventListener('click', () => {
      modalBackdrop.classList.add('active');
    });
  }

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

  if (wheelTrigger) {
    wheelTrigger.addEventListener('click', () => {
      if (typeof window.openLightbox === 'function') {
        window.openLightbox(
          ['assets/wellness-wheel.jpg'],
          0,
          'Las 8 Dimensiones del Wellness en Arquitectura Sanitaria'
        );
      }
    });
  }
}

/* ==========================================================================
   8. ACORDEÓN VERTICAL DE SERVICIOS / QUÉ HACEMOS (PÁGINAS 8 A 11 DEL PDF)
   "al picar cada boton de los verticales se despliega texto con la descripción"
   ========================================================================== */
function initVerticalServicesAccordion() {
  const accordion = document.getElementById('verticalServicesAccordion');
  if (!accordion) return;

  const panels = accordion.querySelectorAll('.vertical-panel');

  panels.forEach(panel => {
    const header = panel.querySelector('.vertical-tab-header');
    if (header) {
      header.addEventListener('click', () => {
        const isCurrentlyActive = panel.classList.contains('active');

        // Colapsar todos
        panels.forEach(p => {
          p.classList.remove('active');
          const ind = p.querySelector('.vertical-panel-indicator');
          if (ind) ind.textContent = '+';
        });

        // Si no estaba activo, expandirlo
        if (!isCurrentlyActive) {
          panel.classList.add('active');
          const ind = panel.querySelector('.vertical-panel-indicator');
          if (ind) ind.textContent = '—';
        }
      });
    }
  });
}

/* ==========================================================================
   9. BOTÓN OCULTO, LOGIN ADMINISTRADOR Y GESTIÓN DE OBRAS
   ========================================================================== */
const ADMIN_AUTH_KEY = 'emea_admin_session_auth_v1';

function isUserAdmin() {
  return sessionStorage.getItem(ADMIN_AUTH_KEY) === 'true';
}

function initSecretAdmin() {
  const secretTrigger = document.getElementById('secretAdminTrigger');
  const portfolioAdminBtn = document.getElementById('portfolioAdminBtn');
  const loginModal = document.getElementById('adminLoginModal');
  const closeLoginBtn = document.getElementById('closeAdminLoginModal');
  const cancelLoginBtn = document.getElementById('cancelAdminLogin');
  const loginForm = document.getElementById('adminLoginForm');
  const passwordInput = document.getElementById('adminPasswordInput');
  const togglePwdBtn = document.getElementById('togglePasswordVisibility');
  const errorMsg = document.getElementById('loginErrorMsg');
  const addProjectModal = document.getElementById('addProjectModal');
  const adminBar = document.getElementById('adminSessionBar');
  const adminBarAddBtn = document.getElementById('adminBarAddBtn');
  const adminBarLogoutBtn = document.getElementById('adminBarLogoutBtn');

  function updateAdminUI() {
    if (adminBar) {
      adminBar.style.display = isUserAdmin() ? 'flex' : 'none';
    }
  }

  updateAdminUI();

  function triggerAdminPortal() {
    if (isUserAdmin()) {
      if (addProjectModal) {
        addProjectModal.classList.add('active');
      }
    } else {
      if (loginModal) {
        if (errorMsg) errorMsg.style.display = 'none';
        if (passwordInput) passwordInput.value = '';
        loginModal.classList.add('active');
        setTimeout(() => passwordInput && passwordInput.focus(), 150);
      }
    }
  }

  // Clic en el botón del footer
  if (secretTrigger) {
    secretTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      triggerAdminPortal();
    });
  }

  // Clic en el botón del catálogo de obras (+ Cargar Obra)
  if (portfolioAdminBtn) {
    portfolioAdminBtn.addEventListener('click', (e) => {
      e.preventDefault();
      triggerAdminPortal();
    });
  }

  // Atajo de teclado secreto: Ctrl + Shift + A o Alt + L
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) ||
        (e.altKey && (e.key === 'L' || e.key === 'l'))) {
      e.preventDefault();
      triggerAdminPortal();
    }
  });

  if (closeLoginBtn && loginModal) {
    closeLoginBtn.addEventListener('click', () => {
      loginModal.classList.remove('active');
    });
  }

  if (cancelLoginBtn && loginModal) {
    cancelLoginBtn.addEventListener('click', () => {
      loginModal.classList.remove('active');
    });
  }

  if (loginModal) {
    loginModal.addEventListener('click', (e) => {
      if (e.target === loginModal) {
        loginModal.classList.remove('active');
      }
    });
  }

  if (togglePwdBtn && passwordInput) {
    togglePwdBtn.addEventListener('click', () => {
      const isPwd = passwordInput.type === 'password';
      passwordInput.type = isPwd ? 'text' : 'password';
      togglePwdBtn.innerHTML = isPwd
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const entered = (passwordInput ? passwordInput.value : '').trim();
      const validPasswords = ['avila2026', 'manestaravila', 'admin'];

      if (validPasswords.includes(entered.toLowerCase())) {
        sessionStorage.setItem(ADMIN_AUTH_KEY, 'true');
        if (loginModal) loginModal.classList.remove('active');
        updateAdminUI();
        showToast('¡Acceso autorizado! Modo administración activado.');
        if (addProjectModal) {
          setTimeout(() => addProjectModal.classList.add('active'), 200);
        }
      } else {
        if (errorMsg) errorMsg.style.display = 'block';
        if (passwordInput) {
          passwordInput.style.borderColor = '#EF4444';
          setTimeout(() => {
            passwordInput.style.borderColor = '';
          }, 1500);
        }
      }
    });
  }

  if (adminBarAddBtn && addProjectModal) {
    adminBarAddBtn.addEventListener('click', () => {
      addProjectModal.classList.add('active');
    });
  }

  if (adminBarLogoutBtn) {
    adminBarLogoutBtn.addEventListener('click', () => {
      sessionStorage.removeItem(ADMIN_AUTH_KEY);
      updateAdminUI();
      if (addProjectModal) addProjectModal.classList.remove('active');
      showToast('Sesión cerrada. Modo administración desactivado.');
    });
  }
}
