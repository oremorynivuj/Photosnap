(function(){
  const gallery = document.getElementById('gallery');
  const lightbox = document.getElementById('lightbox');
  const lbImage = document.getElementById('lbImage');
  const lbClose = document.getElementById('lbClose');
  const lbPrev = document.getElementById('lbPrev');
  const lbNext = document.getElementById('lbNext');

  const images = Array.from(gallery.querySelectorAll('img'));
  let current = -1;

  function openLightbox(index){
    current = index;
    const img = images[current];
    lbImage.src = img.src;
    lbImage.alt = img.alt || '';
    lightbox.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox(){
    lightbox.setAttribute('aria-hidden','true');
    lbImage.src = '';
    current = -1;
    document.body.style.overflow = '';
  }

  function showNext(delta){
    if(current < 0) return;
    current = (current + delta + images.length) % images.length;
    const next = images[current];
    lbImage.src = next.src;
    lbImage.alt = next.alt || '';
  }

  // Clicks on gallery
  images.forEach((img, idx) => {
    img.addEventListener('click', () => openLightbox(idx));
  });

  // Buttons
  lbClose.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click', () => showNext(-1));
  lbNext.addEventListener('click', () => showNext(1));

  // Click outside image closes
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (lightbox.getAttribute('aria-hidden') === 'false') {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext(1);
      if (e.key === 'ArrowLeft') showNext(-1);
    }
  });
})();