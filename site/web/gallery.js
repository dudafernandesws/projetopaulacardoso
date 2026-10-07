const galleryGrid = document.querySelector('#galleryGrid');
const lightbox = document.querySelector('#lightbox');
const lightboxImage = document.querySelector('#lightboxImage');
const lightboxCounter = document.querySelector('#lightboxCounter');
const photos = Array.isArray(window.PAULA_GALLERY_PHOTOS) ? window.PAULA_GALLERY_PHOTOS : [];
let currentIndex = 0;

function showPhoto(index) {
  currentIndex = (index + photos.length) % photos.length;
  const photo = photos[currentIndex];
  lightboxImage.src = photo.src;
  lightboxImage.alt = `Foto ${currentIndex + 1} de ${photos.length}`;
  lightboxCounter.textContent = `${currentIndex + 1} / ${photos.length}`;
}

function openPhoto(index) {
  showPhoto(index);
  lightbox.showModal();
}

if (photos.length) {
  galleryGrid.innerHTML = photos.map((photo, index) => `
    <button class="gallery-item" type="button" data-photo="${index}" aria-label="Ampliar foto ${index + 1} de ${photos.length}">
      <img src="${photo.src}" alt="Foto do portfólio de Paula Cardoso" loading="${index < 3 ? 'eager' : 'lazy'}" decoding="async">
    </button>`).join('');

  galleryGrid.querySelectorAll('[data-photo]').forEach(button => {
    button.addEventListener('click', () => openPhoto(Number(button.dataset.photo)));
  });
} else {
  galleryGrid.innerHTML = '<p class="gallery-status">Nenhuma fotografia disponível.</p>';
}

document.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
document.querySelector('.lightbox-prev').addEventListener('click', () => showPhoto(currentIndex - 1));
document.querySelector('.lightbox-next').addEventListener('click', () => showPhoto(currentIndex + 1));

lightbox.addEventListener('click', event => {
  if (event.target === lightbox) lightbox.close();
});

document.addEventListener('keydown', event => {
  if (!lightbox.open || !photos.length) return;
  if (event.key === 'ArrowLeft') showPhoto(currentIndex - 1);
  if (event.key === 'ArrowRight') showPhoto(currentIndex + 1);
});
