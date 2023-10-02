// Scroll Reveal
window.sr = ScrollReveal({ reset: false })

sr.reveal('.area-1', { duration: 1000 })
sr.reveal('.area-2', { duration: 2000 })
sr.reveal('.area-3', { duration: 3000 })
sr.reveal('.area-4', { duration: 1000 })
sr.reveal('.area-5', { duration: 2000 })
sr.reveal('.area-6', { duration: 3000 })
sr.reveal('.area-7', { duration: 1000 })
sr.reveal('.area-8', { duration: 2000 })
sr.reveal('.area-9', { duration: 3000 })

// Overlay produtos
const products = document.querySelectorAll('.produtos-container');
const overlay = document.getElementById('overlay');
const expandedImg = document.getElementById('expandedImg');
const closeBtn = document.getElementById('closeBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');


// zoom image
let currentImgIndex = 0;

products.forEach((product, index) => {
  product.addEventListener('click', () => {
    currentImgIndex = index;
    expandImage(currentImgIndex);
    overlay.style.display = 'flex';
  });
});

closeBtn.addEventListener('click', () => {
  overlay.style.display = 'none';
});

prevBtn.addEventListener('click', () => {
  currentImgIndex = (currentImgIndex - 1 + products.length) % products.length;
  expandImage(currentImgIndex);
});

nextBtn.addEventListener('click', () => {
  currentImgIndex = (currentImgIndex + 1) % products.length;
  expandImage(currentImgIndex);
});

function expandImage(index) {
  const imgSrc = products[index].querySelector('.img-produtos').src;
  expandedImg.src = imgSrc;
}