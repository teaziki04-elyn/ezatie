/**
 * EZATI - Activity Gallery Logic (js/gallery.js)
 * Interactive Filtering, Live Search, & Lightbox Modal
 */

document.addEventListener('DOMContentLoaded', () => {
  initGalleryFilterAndSearch();
  initLightboxModal();
  handleImageFallbacks();
});

// Store all gallery item data for lightbox navigation
let galleryItems = [];
let currentItemIndex = 0;

/* ==========================================================
   1. Filtering & Live Search
   ========================================================== */
function initGalleryFilterAndSearch() {
  const filterButtons = document.querySelectorAll('.g-filter-btn');
  const cards = Array.from(document.querySelectorAll('.gallery-card'));
  const searchInput = document.getElementById('gallery-search');
  const clearSearchBtn = document.getElementById('search-clear');
  const emptyState = document.getElementById('gallery-empty');

  // Populate galleryItems array from DOM
  cards.forEach((card, index) => {
    card.setAttribute('data-index', index);
    galleryItems.push({
      index: index,
      element: card,
      title: card.querySelector('.card-title')?.textContent.trim() || '',
      category: card.getAttribute('data-category') || 'all',
      categoryLabel: card.querySelector('.card-badge')?.textContent.trim() || '',
      date: card.querySelector('.card-date')?.textContent.trim() || '',
      location: card.querySelector('.card-location')?.textContent.trim() || '',
      description: card.querySelector('.card-desc')?.textContent.trim() || '',
      fullDesc: card.getAttribute('data-full-desc') || card.querySelector('.card-desc')?.textContent.trim(),
      highlights: JSON.parse(card.getAttribute('data-highlights') || '[]'),
      imgSrc: card.querySelector('.card-img')?.getAttribute('src') || ''
    });
  });

  let currentCategory = 'all';
  let searchQuery = '';

  function applyFilters() {
    let visibleCount = 0;

    cards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      const title = card.querySelector('.card-title')?.textContent.toLowerCase() || '';
      const desc = card.querySelector('.card-desc')?.textContent.toLowerCase() || '';
      const loc = card.querySelector('.card-location')?.textContent.toLowerCase() || '';
      const badge = card.querySelector('.card-badge')?.textContent.toLowerCase() || '';

      const matchesCategory = (currentCategory === 'all' || cardCategory === currentCategory);
      const matchesSearch = !searchQuery || 
        title.includes(searchQuery) || 
        desc.includes(searchQuery) || 
        loc.includes(searchQuery) || 
        badge.includes(searchQuery);

      if (matchesCategory && matchesSearch) {
        card.style.display = 'flex';
        card.style.animation = 'fadeIn 0.35s ease';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // Toggle Empty State
    if (emptyState) {
      emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  // Filter Button Clicks
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-filter') || 'all';
      applyFilters();
    });
  });

  // Search Input Handler
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      if (clearSearchBtn) {
        clearSearchBtn.style.display = searchQuery.length > 0 ? 'block' : 'none';
      }
      applyFilters();
    });
  }

  // Clear Search Handler
  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
        searchQuery = '';
        clearSearchBtn.style.display = 'none';
        searchInput.focus();
        applyFilters();
      }
    });
  }
}

/* ==========================================================
   2. Lightbox Modal Functionality
   ========================================================== */
function initLightboxModal() {
  const modal = document.getElementById('lightbox-modal');
  if (!modal) return;

  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');

  const lbImg = document.getElementById('lightbox-img');
  const lbBadge = document.getElementById('lightbox-badge');
  const lbTitle = document.getElementById('lightbox-title');
  const lbDate = document.getElementById('lightbox-date');
  const lbLocation = document.getElementById('lightbox-location');
  const lbDesc = document.getElementById('lightbox-desc');
  const lbHighlightsContainer = document.getElementById('lightbox-highlights-list');
  const lbCounter = document.getElementById('lightbox-counter');

  function openLightbox(index) {
    currentItemIndex = index;
    updateModalContent();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  function closeLightbox() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function updateModalContent() {
    const item = galleryItems[currentItemIndex];
    if (!item) return;

    if (lbImg) {
      lbImg.src = item.imgSrc;
      lbImg.alt = item.title;
    }
    if (lbBadge) lbBadge.textContent = item.categoryLabel;
    if (lbTitle) lbTitle.textContent = item.title;
    if (lbDate) lbDate.textContent = item.date;
    if (lbLocation) lbLocation.textContent = item.location;
    if (lbDesc) lbDesc.textContent = item.fullDesc;

    // Highlights bullets
    if (lbHighlightsContainer) {
      lbHighlightsContainer.innerHTML = '';
      if (item.highlights && item.highlights.length > 0) {
        item.highlights.forEach(text => {
          const li = document.createElement('li');
          li.textContent = text;
          lbHighlightsContainer.appendChild(li);
        });
        lbHighlightsContainer.parentElement.style.display = 'block';
      } else {
        lbHighlightsContainer.parentElement.style.display = 'none';
      }
    }

    // Counter (e.g., "Foto 2 dari 12")
    if (lbCounter) {
      lbCounter.textContent = `Foto ${currentItemIndex + 1} dari ${galleryItems.length}`;
    }
  }

  function showNext() {
    // Find next visible item in current filter
    let nextIndex = (currentItemIndex + 1) % galleryItems.length;
    while (galleryItems[nextIndex].element.style.display === 'none' && nextIndex !== currentItemIndex) {
      nextIndex = (nextIndex + 1) % galleryItems.length;
    }
    currentItemIndex = nextIndex;
    updateModalContent();
  }

  function showPrev() {
    // Find previous visible item in current filter
    let prevIndex = (currentItemIndex - 1 + galleryItems.length) % galleryItems.length;
    while (galleryItems[prevIndex].element.style.display === 'none' && prevIndex !== currentItemIndex) {
      prevIndex = (prevIndex - 1 + galleryItems.length) % galleryItems.length;
    }
    currentItemIndex = prevIndex;
    updateModalContent();
  }

  // Attach card click handlers
  galleryItems.forEach(item => {
    item.element.addEventListener('click', () => {
      openLightbox(item.index);
    });
  });

  // Modal navigation & close listeners
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });
  if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });

  // Close when clicking outside modal container
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });
}

/* ==========================================================
   3. Graceful Image Fallbacks
   ========================================================== */
function handleImageFallbacks() {
  const images = document.querySelectorAll('.card-img');
  images.forEach(img => {
    img.addEventListener('error', function() {
      // If image fails to load, replace with a stylish gradient and icon fallback
      const parent = this.parentElement;
      if (parent) {
        this.style.display = 'none';
        const fallback = document.createElement('div');
        fallback.className = 'card-media-fallback';
        fallback.style.background = 'linear-gradient(135deg, var(--bg-tertiary), var(--border-color))';
        fallback.innerHTML = `
          <i class="fa-solid fa-camera-retro"></i>
          <span style="font-size: 0.85rem; font-weight: 600;">Dokumentasi Kegiatan</span>
        `;
        parent.appendChild(fallback);
      }
    });
  });
}
