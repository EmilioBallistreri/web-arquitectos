/**
 * MANESTAR + AVILA ARQUITECTURA
 * Application Logic & Dynamic Portfolio CMS
 */

import { INITIAL_PROJECTS } from './projects-data.js';

// Estado global de proyectos con persistencia en LocalStorage
const STORAGE_KEY = 'ma_projects_db_v8';

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
  const navDropdown = document.querySelector('.nav-item-dropdown');
  const navProyectosLink = document.getElementById('navProyectosLink');

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

    // Cerrar menú al hacer clic en un enlace simple
    document.querySelectorAll('.nav-link:not(.dropdown-toggle)').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
      });
    });
  }

  // En móvil: alternar menú desplegable al pulsar "PROYECTOS"
  if (navProyectosLink && navDropdown) {
    navProyectosLink.addEventListener('click', (e) => {
      if (window.innerWidth <= 992) {
        e.preventDefault();
        navDropdown.classList.toggle('open');
      }
    });
  }

  // Interceptar clics en los enlaces del dropdown de Proyectos
  document.querySelectorAll('.dropdown-item-link').forEach(link => {
    link.addEventListener('click', (e) => {
      const cat = link.dataset.category;
      const isProjectsPage = window.location.pathname.endsWith('proyectos.html') || window.location.pathname.endsWith('/proyectos') || !!document.getElementById('catalogoObras');
      
      if (isProjectsPage && cat) {
        e.preventDefault();
        setSpecialtyCategory(cat, true);
        if (window.history && window.history.pushState) {
          const newUrl = window.location.pathname + '?categoria=' + cat;
          window.history.pushState({ path: newUrl }, '', newUrl);
        }
        if (navLinks) navLinks.classList.remove('mobile-open');
        if (navDropdown) navDropdown.classList.remove('open');
      }
    });
  });
}

/* ==========================================================================
   2. BOTONES DE ESPECIALIDAD (PÁGINA 3 DEL PDF) & SECCIONES APARTES DE PROYECTOS
   ========================================================================== */
let activeFilter = 'salud'; // 'salud' por defecto (Especialidad Principal)

function initSpecialtyButtons() {
  const btnSalud = document.getElementById('btnCatSalud');
  const btnResidenciales = document.getElementById('btnCatResidenciales');
  const catalogoSection = document.getElementById('catalogoObras');

  if (btnSalud) {
    btnSalud.addEventListener('click', (e) => {
      if (!catalogoSection) {
        // Enlace natural a proyectos.html?categoria=salud
        return;
      }
      e.preventDefault();
      setSpecialtyCategory('salud', true);
    });
  }

  if (btnResidenciales) {
    btnResidenciales.addEventListener('click', (e) => {
      if (!catalogoSection) {
        // Enlace natural a proyectos.html?categoria=residenciales
        return;
      }
      e.preventDefault();
      setSpecialtyCategory('residenciales', true);
    });
  }

  // BOTÓN TRANQUI PARA ALTERNAR ENTRE CATÁLOGOS EN proyectos.html
  const btnToggleCatalog = document.getElementById('btnToggleCatalog');
  if (btnToggleCatalog) {
    btnToggleCatalog.addEventListener('click', () => {
      const targetCat = btnToggleCatalog.dataset.switchTo || (activeFilter === 'salud' ? 'residenciales' : 'salud');
      setSpecialtyCategory(targetCat, true);
      if (window.history && window.history.pushState) {
        const newUrl = window.location.pathname + '?categoria=' + targetCat;
        window.history.pushState({ path: newUrl }, '', newUrl);
      }
    });
  }
}

function setSpecialtyCategory(cat, shouldScroll = false) {
  // Aseguramos que solo haya una sección activa aparte ('salud' o 'residenciales')
  if (cat !== 'residenciales') {
    cat = 'salud';
  }
  activeFilter = cat;

  // Actualizar estado activo en los botones de portada (si existen)
  const btnSalud = document.getElementById('btnCatSalud');
  const btnResidenciales = document.getElementById('btnCatResidenciales');
  if (btnSalud) btnSalud.classList.toggle('active', cat === 'salud');
  if (btnResidenciales) btnResidenciales.classList.toggle('active', cat === 'residenciales');

  // Actualizar barra minimalista y botón tranqui
  const currentTitle = document.getElementById('catalogCurrentTitle');
  const btnToggleCatalog = document.getElementById('btnToggleCatalog');
  const btnToggleText = document.getElementById('btnToggleCatalogText');
  const btnToggleIcon = document.getElementById('btnToggleCatalogIcon');

  if (currentTitle) {
    currentTitle.textContent = cat === 'residenciales' 
      ? 'Obras Residenciales' 
      : 'Arquitectura Para la Salud';
  }

  if (btnToggleCatalog && btnToggleText) {
    if (cat === 'salud') {
      btnToggleCatalog.dataset.switchTo = 'residenciales';
      btnToggleCatalog.setAttribute('aria-label', 'Ver Obras Residenciales');
      btnToggleText.textContent = 'Ver Obras Residenciales';
      if (btnToggleIcon) {
        btnToggleIcon.innerHTML = '<path d="M5 12h14M12 5l7 7-7 7"/>';
      }
    } else {
      btnToggleCatalog.dataset.switchTo = 'salud';
      btnToggleCatalog.setAttribute('aria-label', 'Ver Obras Hospitalarias');
      btnToggleText.textContent = 'Ver Obras Hospitalarias';
      if (btnToggleIcon) {
        btnToggleIcon.innerHTML = '<path d="M19 12H5M12 19l-7-7 7-7"/>';
      }
    }
  }

  renderProjects();

  if (shouldScroll) {
    const catalogo = document.getElementById('catalogoObras');
    if (catalogo) {
      catalogo.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

function initPortfolio() {
  // Leer categoría desde parámetros URL (?categoria=salud o ?categoria=residenciales) o hash
  const urlParams = new URLSearchParams(window.location.search);
  const catParam = urlParams.get('categoria') || urlParams.get('cat');
  const hashParam = window.location.hash ? window.location.hash.replace('#', '') : null;
  const initialCat = (catParam === 'residenciales' || hashParam === 'residenciales') ? 'residenciales' : 'salud';

  activeFilter = initialCat;
  setSpecialtyCategory(activeFilter, false);

  window.addEventListener('popstate', () => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('categoria') || params.get('cat') || 'salud';
    setSpecialtyCategory(cat, true);
  });
}

function renderProjects() {
  const gridSalud = document.getElementById('projectsGridSalud');
  const gridResidenciales = document.getElementById('projectsGridResidenciales');
  const genericGrid = document.getElementById('projectsGrid');
  const secSalud = document.getElementById('subseccionSalud');
  const secResidenciales = document.getElementById('subseccionResidenciales');
  const divider = document.getElementById('subsectionsDivider');

  const projects = getStoredProjects();

  // Helper para generar tarjetas editoriales
  const createCardHtml = (proj) => `
    <article class="project-card-editorial" data-id="${proj.id}" title="${escapeHtml(proj.title)}">
      <div class="project-cover-wrap">
        <img src="${proj.image}" alt="${escapeHtml(proj.title)}" loading="lazy" class="project-cover-img" onerror="this.src='assets/siss-hero.jpg'">
        <div class="project-cover-gradient"></div>
        <div class="project-cover-info">
          <h3 class="project-cover-title">${escapeHtml(proj.shortTitle || proj.title)}</h3>
        </div>
      </div>
    </article>
  `;

  // Si estamos en la página de proyectos con las subsecciones
  if (gridSalud || gridResidenciales) {
    const saludProjects = projects.filter(p => p.category === 'salud' || p.category === 'hospitalaria');
    const residencialesProjects = projects.filter(p => p.category === 'residenciales' || p.category === 'habitacional');

    if (gridSalud) {
      gridSalud.innerHTML = saludProjects.length > 0
        ? saludProjects.map(createCardHtml).join('')
        : `<div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: var(--text-muted);"><p>No hay proyectos registrados en Arquitectura Para la Salud aún.</p></div>`;
    }

    if (gridResidenciales) {
      gridResidenciales.innerHTML = residencialesProjects.length > 0
        ? residencialesProjects.map(createCardHtml).join('')
        : `<div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: var(--text-muted);"><p>No hay proyectos registrados en Obras Residenciales aún.</p></div>`;
    }

    // Actualizar píldora de conteo de obras en la cabecera minimalista
    const countPill = document.getElementById('catalogCountPill');
    if (countPill) {
      const count = activeFilter === 'residenciales' ? residencialesProjects.length : saludProjects.length;
      countPill.textContent = `${count} ${count === 1 ? 'obra' : 'obras'}`;
    }

    // MANEJO DE SECCIONES APARTES: Mostrar exclusivamente la sección seleccionada
    if (activeFilter === 'residenciales') {
      if (secSalud) secSalud.style.display = 'none';
      if (secResidenciales) secResidenciales.style.display = 'block';
      if (divider) divider.style.display = 'none';
    } else {
      // 'salud' por defecto
      if (secSalud) secSalud.style.display = 'block';
      if (secResidenciales) secResidenciales.style.display = 'none';
      if (divider) divider.style.display = 'none';
    }
  }

  // Soporte para grilla genérica única
  if (genericGrid) {
    const filtered = activeFilter === 'all' 
      ? projects 
      : projects.filter(p => p.category === activeFilter || (activeFilter === 'salud' && p.category === 'hospitalaria') || (activeFilter === 'residenciales' && p.category === 'habitacional'));

    genericGrid.innerHTML = filtered.length > 0
      ? filtered.map(createCardHtml).join('')
      : `<div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);"><p style="font-size: 1.1rem;">No hay proyectos registrados en esta categoría aún.</p></div>`;
  }

  // Event listeners para abrir detalle de cada obra
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

      <!-- SECCIÓN SCROLL PARA ABAJO PARA VER LAS IMÁGENES (DISTRIBUCIÓN 50 / 50) -->
      <div class="project-gallery-scroll-section">
        <div class="gallery-scroll-prompt">
          <span class="scroll-arrow-down">↓</span>
          <span>DESLIZA HACIA ABAJO PARA RECORRER LA OBRA</span>
        </div>

        <!-- GRILLA DUAL 50 / 50 DE IMÁGENES -->
        <div class="project-photos-dual-grid" id="projectPhotosDualGrid">
          ${allModalImages.map((imgUrl, i) => {
            const isSoloOdd = (allModalImages.length % 2 !== 0 && i === allModalImages.length - 1 && i !== 0);
            return `
            <div class="project-dual-photo-item ${isSoloOdd ? 'is-solo-odd' : ''}" data-idx="${i}" title="Haz clic para ampliar">
              <div class="dual-photo-ratio-wrap">
                <img src="${imgUrl}" alt="Vista ${i + 1} de ${escapeHtml(proj.title)}" class="dual-photo-img" loading="lazy" onerror="this.src='assets/siss-hero.jpg'">
                <div class="dual-photo-overlay">
                  <span class="dual-zoom-pill">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                    <span>Ampliar Vista ${i + 1}</span>
                  </span>
                </div>
              </div>
            </div>
            `;
          }).join('')}
        </div>

        <!-- BOTÓN FLOTANTE / PERSISTENTE ESTILO A+R ARQUITECTOS (> BACK TO PORTFOLIO) -->
        <div class="project-detail-bottom-nav">
          <button type="button" class="btn-back-portfolio" id="btnBackToPortfolio" title="Volver al catálogo de obras">
            <span class="back-arrow-symbol">&gt;</span>
            <span class="back-text-underlined">BACK TO PORTFOLIO</span>
          </button>
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
  const photoItems = modalBody.querySelectorAll('.project-dual-photo-item');
  photoItems.forEach(item => {
    item.addEventListener('click', () => {
      const idx = parseInt(item.dataset.idx, 10) || 0;
      if (typeof window.openLightbox === 'function') {
        window.openLightbox(allModalImages, idx, proj.title);
      }
    });
  });

  // Listener para el botón > BACK TO PORTFOLIO
  const backToPortfolioBtn = modalBody.querySelector('#btnBackToPortfolio');
  if (backToPortfolioBtn) {
    backToPortfolioBtn.addEventListener('click', () => {
      modalBackdrop.classList.remove('active');
    });
  }

  modalBackdrop.classList.add('active');
}

/* ==========================================================================
   4. CMS / CARGA DINÁMICA DE NUEVAS OBRAS CON CARGA DE FOTOS & DROPZONE
   ========================================================================== */

// Helper para optimizar y comprimir imágenes vía Canvas a DataURL ligero
function processImageFile(file, maxWidth = 1600, quality = 0.82) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      reject(new Error('El archivo no es una imagen válida.'));
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        const maxDim = maxWidth; // 1600px
        if (width > maxDim || height > maxDim) {
          if (width >= height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve({
          dataUrl,
          name: file.name
        });
      };
      img.onerror = () => reject(new Error('No se pudo decodificar la imagen.'));
      img.src = e.target.result;
    };
    reader.onerror = () => reject(new Error('Error al leer el archivo del dispositivo.'));
    reader.readAsDataURL(file);
  });
}

function initAdminModal() {
  const addProjectBtn = document.getElementById('openAddProjectModal');
  const modalBackdrop = document.getElementById('addProjectModal');
  const closeBtn = document.getElementById('closeAddModal');
  const form = document.getElementById('addProjectForm');

  if (!modalBackdrop) return;

  // Elementos de Portada (1 sola imagen)
  const coverDropzone = document.getElementById('coverDropzone');
  const coverFileInput = document.getElementById('coverFileInput');
  const btnSelectCover = document.getElementById('btnSelectCover');
  const coverEmptyState = document.getElementById('coverEmptyState');
  const coverPreviewWrap = document.getElementById('coverPreviewWrap');
  const coverPreviewImg = document.getElementById('coverPreviewImg');
  const coverFileName = document.getElementById('coverFileName');
  const btnRemoveCover = document.getElementById('btnRemoveCover');
  const hiddenImageInput = document.getElementById('newProjImage');

  // Elementos de Galería (hasta 10 imágenes)
  const galleryDropzone = document.getElementById('galleryDropzone');
  const galleryFileInput = document.getElementById('galleryFileInput');
  const btnSelectGallery = document.getElementById('btnSelectGallery');
  const galleryCounter = document.getElementById('galleryCounter');
  const galleryPreviewsGrid = document.getElementById('galleryPreviewsGrid');

  // Estado local de archivos cargados
  let currentCover = null; // { dataUrl, name }
  let currentGallery = []; // Array de { id, dataUrl, name }, máx. 10

  function resetUploadStates() {
    currentCover = null;
    currentGallery = [];
    if (hiddenImageInput) hiddenImageInput.value = '';
    if (coverFileInput) coverFileInput.value = '';
    if (galleryFileInput) galleryFileInput.value = '';
    if (coverPreviewWrap) coverPreviewWrap.style.display = 'none';
    if (coverEmptyState) coverEmptyState.style.display = 'flex';
    if (galleryPreviewsGrid) {
      galleryPreviewsGrid.innerHTML = '';
      galleryPreviewsGrid.style.display = 'none';
    }
    if (galleryCounter) galleryCounter.textContent = '0 / 10 imágenes';
  }

  // --- Manejo de Imagen de Portada (1 sola imagen) ---
  function setCoverImage(imageObj) {
    currentCover = imageObj;
    if (hiddenImageInput) hiddenImageInput.value = imageObj.dataUrl;
    if (coverPreviewImg) coverPreviewImg.src = imageObj.dataUrl;
    if (coverFileName) coverFileName.textContent = imageObj.name;
    if (coverEmptyState) coverEmptyState.style.display = 'none';
    if (coverPreviewWrap) coverPreviewWrap.style.display = 'block';
  }

  function removeCoverImage() {
    currentCover = null;
    if (hiddenImageInput) hiddenImageInput.value = '';
    if (coverFileInput) coverFileInput.value = '';
    if (coverPreviewWrap) coverPreviewWrap.style.display = 'none';
    if (coverEmptyState) coverEmptyState.style.display = 'flex';
  }

  if (btnSelectCover && coverFileInput) {
    btnSelectCover.addEventListener('click', (e) => {
      e.stopPropagation();
      coverFileInput.click();
    });
  }

  if (btnRemoveCover) {
    btnRemoveCover.addEventListener('click', (e) => {
      e.stopPropagation();
      removeCoverImage();
    });
  }

  if (coverFileInput) {
    coverFileInput.addEventListener('change', async () => {
      if (coverFileInput.files && coverFileInput.files[0]) {
        try {
          const processed = await processImageFile(coverFileInput.files[0]);
          setCoverImage(processed);
        } catch (err) {
          showToast(err.message, 'error');
        }
      }
    });
  }

  if (coverDropzone) {
    coverDropzone.addEventListener('click', () => {
      if (!currentCover && coverFileInput) {
        coverFileInput.click();
      }
    });

    coverDropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      coverDropzone.classList.add('drag-over');
    });

    coverDropzone.addEventListener('dragleave', () => {
      coverDropzone.classList.remove('drag-over');
    });

    coverDropzone.addEventListener('drop', async (e) => {
      e.preventDefault();
      coverDropzone.classList.remove('drag-over');
      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
        try {
          const processed = await processImageFile(e.dataTransfer.files[0]);
          setCoverImage(processed);
          showToast('Portada cargada con éxito.');
        } catch (err) {
          showToast(err.message, 'error');
        }
      }
    });
  }

  // --- Manejo de Galería Fotográfica (máximo 10 imágenes) ---
  function updateGalleryUI() {
    if (galleryCounter) {
      galleryCounter.textContent = `${currentGallery.length} / 10 imágenes`;
    }

    if (galleryPreviewsGrid) {
      if (currentGallery.length === 0) {
        galleryPreviewsGrid.innerHTML = '';
        galleryPreviewsGrid.style.display = 'none';
      } else {
        galleryPreviewsGrid.style.display = 'grid';
        galleryPreviewsGrid.innerHTML = currentGallery.map((item, idx) => `
          <div class="gallery-thumb-item" title="${escapeHtml(item.name)}">
            <img src="${item.dataUrl}" alt="Foto ${idx + 1}">
            <button type="button" class="gallery-thumb-delete" data-idx="${idx}" title="Eliminar foto">✕</button>
          </div>
        `).join('');

        galleryPreviewsGrid.querySelectorAll('.gallery-thumb-delete').forEach(btn => {
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const idx = parseInt(btn.dataset.idx, 10);
            currentGallery.splice(idx, 1);
            updateGalleryUI();
          });
        });
      }
    }
  }

  async function addFilesToGallery(filesList) {
    if (!filesList || filesList.length === 0) return;

    const availableSlots = 10 - currentGallery.length;
    if (availableSlots <= 0) {
      showToast('Ya has alcanzado el límite máximo de 10 imágenes en la galería.', 'error');
      return;
    }

    const filesArray = Array.from(filesList).filter(f => f.type.startsWith('image/'));
    if (filesArray.length === 0) {
      showToast('Por favor seleccione archivos de imagen válidos.', 'error');
      return;
    }

    const filesToTake = filesArray.slice(0, availableSlots);
    if (filesArray.length > availableSlots) {
      showToast(`Se incorporaron las primeras ${availableSlots} fotos. El límite máximo de la galería es de 10 imágenes.`, 'info');
    }

    try {
      const processedResults = await Promise.all(filesToTake.map(f => processImageFile(f)));
      processedResults.forEach(res => {
        currentGallery.push(res);
      });
      updateGalleryUI();
    } catch (err) {
      showToast('Error al procesar las imágenes: ' + err.message, 'error');
    }
  }

  if (btnSelectGallery && galleryFileInput) {
    btnSelectGallery.addEventListener('click', (e) => {
      e.stopPropagation();
      galleryFileInput.click();
    });
  }

  if (galleryFileInput) {
    galleryFileInput.addEventListener('change', async () => {
      if (galleryFileInput.files) {
        await addFilesToGallery(galleryFileInput.files);
        galleryFileInput.value = '';
      }
    });
  }

  if (galleryDropzone) {
    galleryDropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      galleryDropzone.classList.add('drag-over');
    });

    galleryDropzone.addEventListener('dragleave', () => {
      galleryDropzone.classList.remove('drag-over');
    });

    galleryDropzone.addEventListener('drop', async (e) => {
      e.preventDefault();
      galleryDropzone.classList.remove('drag-over');
      if (e.dataTransfer && e.dataTransfer.files) {
        await addFilesToGallery(e.dataTransfer.files);
      }
    });
  }

  // Apertura y Cierre del Modal
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

  // Envío del Formulario
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!currentCover || !currentCover.dataUrl) {
        showToast('Por favor cargue una imagen de portada para la obra.', 'error');
        return;
      }

      const title = document.getElementById('newProjTitle').value.trim();
      const category = document.getElementById('newProjCategory').value;
      const year = document.getElementById('newProjYear').value.trim() || '2026';
      const location = document.getElementById('newProjLocation').value.trim() || 'Córdoba, Argentina';
      const surface = document.getElementById('newProjSurface').value.trim() || '500 m²';
      const summary = document.getElementById('newProjSummary').value.trim();
      const program = document.getElementById('newProjProgram').value.trim();
      const challenges = document.getElementById('newProjChallenges').value.trim();

      // Galería completa: portada al inicio + hasta 10 fotos adicionales
      const fullGallery = [currentCover.dataUrl, ...currentGallery.map(item => item.dataUrl)];

      const newProject = {
        id: 'proj-' + Date.now(),
        title: title,
        shortTitle: title,
        category: category,
        categoryLabel: category === 'salud' ? 'Arquitectura Para la Salud' : 'Obras Residenciales',
        year: year,
        location: location,
        surface: surface,
        image: currentCover.dataUrl,
        summary: summary,
        memoriaDescriptiva: summary,
        details: {
          client: "Manestar + Avila Arquitectura",
          program: program || "Programa arquitectónico integral proyectado a medida.",
          challenges: challenges || "Rigor técnico, confort espacial y principios de arquitectura contemporánea.",
          specs: [
            { label: "Superficie Cubierta", value: surface },
            { label: "Ubicación", value: location },
            { label: "Año de Proyecto", value: year },
            { label: "Especialidad", value: category === 'salud' ? 'Salud / Diagnóstico' : 'Residencial' }
          ],
          gallery: fullGallery
        }
      };

      const projects = getStoredProjects();
      projects.unshift(newProject); // Agregar al inicio del catálogo
      saveProjects(projects);

      form.reset();
      resetUploadStates();
      modalBackdrop.classList.remove('active');
      renderProjects();
      showToast(`¡Obra "${title}" publicada con éxito con su portada y ${fullGallery.length} fotos!`);
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
    url: "assets/salud-lobby-recepcion-principal.jpg",
    title: "Centro Médico Polivalente: Lobby Central",
    tag: "Arquitectura Para la Salud",
    sub: "Mostrador Acanalado Retroiluminado & Biofilia — Córdoba"
  },
  {
    url: "assets/residencia-deck-atardecer.jpg",
    title: "Residencia Terra Atardecer",
    tag: "Obras y Proyectos Residenciales",
    sub: "Doble Altura Vidriada, Deck y Jardín Iluminado"
  },
  {
    url: "assets/salud-tomografo-diagnostico.jpg",
    title: "Diagnóstico por Imágenes de Alta Complejidad",
    tag: "Arquitectura Para la Salud",
    sub: "Búnker Radiológico con Vidrio Plomado y Tomografía Canon"
  },
  {
    url: "assets/residencia-fachada-piedra.jpg",
    title: "Residencia Cantera",
    tag: "Obras y Proyectos Residenciales",
    sub: "Fachada en Piedra Natural, Madera y Jardineras Voladas"
  },
  {
    url: "assets/salud-sala-espera-vidriada.jpg",
    title: "Centro Médico Aramburu: Sala de Espera Panorámica",
    tag: "Arquitectura Para la Salud",
    sub: "Luz Natural, Mural Artístico y Conexión con el Entorno"
  },
  {
    url: "assets/residencia-pergola-moderna.jpg",
    title: "Residencia El Prado",
    tag: "Obras y Proyectos Residenciales",
    sub: "Diseño Contemporáneo en 1 Planta con Pérgola y Piedra"
  },
  {
    url: "assets/clinica-recepcion-wellness.jpg",
    title: "Clínica & Consultorios Wellness",
    tag: "Arquitectura Para la Salud",
    sub: "Recepción Curva, Biofilia y Humanización Sanitaria"
  }
];

let currentCoverIdx = 0;
let coverAutoTimer = null;

function initPhotoCover() {
  const bgA = document.getElementById('photoCoverBgA');
  const bgB = document.getElementById('photoCoverBgB');
  const fallbackBg = document.getElementById('photoCoverBg');

  if (!bgA && !fallbackBg) return;

  let activeIsA = true;

  function setCoverPhoto(idx, isInitial = false) {
    if (idx < 0) idx = COVER_PHOTOS.length - 1;
    if (idx >= COVER_PHOTOS.length) idx = 0;
    currentCoverIdx = idx;

    const photo = COVER_PHOTOS[currentCoverIdx];

    if (isInitial) {
      if (bgA) {
        const currentBg = bgA.style.backgroundImage;
        if (!currentBg || currentBg === 'none' || currentBg.includes('""')) {
          bgA.style.backgroundImage = `url('${photo.url}')`;
        }
        bgA.classList.add('active');
      } else if (fallbackBg) {
        fallbackBg.style.backgroundImage = `url('${photo.url}')`;
      }
      return;
    }

    // Preload next image before smooth crossfade
    const preloader = new Image();
    preloader.src = photo.url;
    preloader.onload = () => {
      if (bgA && bgB) {
        const incoming = activeIsA ? bgB : bgA;
        const outgoing = activeIsA ? bgA : bgB;

        incoming.style.backgroundImage = `url('${photo.url}')`;
        incoming.classList.add('active');
        outgoing.classList.remove('active');

        activeIsA = !activeIsA;
      } else if (fallbackBg) {
        fallbackBg.style.opacity = '0.75';
        setTimeout(() => {
          fallbackBg.style.backgroundImage = `url('${photo.url}')`;
          fallbackBg.style.opacity = '1';
        }, 120);
      }
    };
    preloader.onerror = () => {
      console.warn("No se pudo cargar la imagen de portada:", photo.url);
      if (bgA && bgB) {
        const incoming = activeIsA ? bgB : bgA;
        const outgoing = activeIsA ? bgA : bgB;
        incoming.style.backgroundImage = "url('assets/siss-hero.jpg')";
        incoming.classList.add('active');
        outgoing.classList.remove('active');
        activeIsA = !activeIsA;
      }
    };
  }

  function nextCoverPhoto() {
    setCoverPhoto(currentCoverIdx + 1);
  }

  function startCoverTimer() {
    if (coverAutoTimer) clearInterval(coverAutoTimer);
    coverAutoTimer = setInterval(() => {
      nextCoverPhoto();
    }, COVER_ROTATION_MS);
  }

  // Foto inicial (Centro Médico SISS en índice 0)
  setCoverPhoto(0, true);
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
