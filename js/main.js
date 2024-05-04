document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (event) {
    event.preventDefault();

    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId)

    if (targetElement) {
      const offset = 70
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      })
    }
  })
})

const swiper = new Swiper(".mySwiper", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  autoplay: {
    delay: 4000
  }
})

function filterProducts(category) {
  const products = document.querySelectorAll('.products__section a')
  const subcategoriesContainer = document.querySelector('.list__subcategories')

  if (category !== 'churrasqueiras-embutir' && category !== 'churrasqueiras-sobrepor' && category !== 'churrasqueiras-canto' && category !== 'lareiras-embutir' && category !== 'lareiras-sobrepor' && category !== 'lareiras-canto') {
    subcategoriesContainer.innerHTML = ''
  }
  
  if (category === 'lareiras' || category === 'churrasqueiras') {
    const subcategories = ['Modelo de Embutir', 'Modelo de Sobrepor', 'Lareiras e Churrasqueiras de Canto']
    
    subcategoriesContainer.innerHTML = subcategories.map(subcategory => {
      const words = subcategory.split(' ')
      let lastWord = words[words.length - 1]
      if (category === 'lareiras') {
        lastWord = "lareiras-" + words[words.length - 1]
      } else if (category === 'churrasqueiras') {
        lastWord = "churrasqueiras-" + words[words.length - 1]
      }
      
      return `<a onclick="filterProducts('${lastWord.toLowerCase()}')">${subcategory}</a>`
    }).join('')
  }

  if (category === 'lareiras') {
    const activeLareiras = document.querySelector('.active__lareiras')
    activeLareiras.style.display = 'block'
  }

  products.forEach(product => {
    const productCategories = product.getAttribute('data-category').split(' ')

    if (category === 'all' || productCategories.includes(category)) {
      product.style.display = 'block'
    } else {
      product.style.display = 'none'
    }
  })
}

const categoriesContainer = document.querySelector(".categories__section")

categoriesContainer.addEventListener("click", (event) => {
  const target = event.target

  if (target.closest(".list__categories a")) {
    const current = document.querySelector(".list__categories .active")

    if (current) {
      current.classList.remove("active")
    }
    target.classList.add("active")
  }

  if (target.closest(".list__subcategories a")) {
    const current = document.querySelector(".list__subcategories .active")
    
    if (current) {
      current.classList.remove("active")
    }
    target.classList.add("active")
  }
})

async function loadProducts() {
  const response = await fetch('products.json')
  const productsJSON = await response.json()
  return productsJSON.products
}

const productsSection = document.getElementById('products__section')

async function insertProducts() {
  const products = await loadProducts()

  products.forEach((product) => {
    const aElement = document.createElement('a')
    aElement.href = product.image
    aElement.className = 'glightbox'
    aElement.setAttribute('data-category', product.category)

    const imgElement = document.createElement('img')
    imgElement.src = product.image
    imgElement.className = 'img__products'

    aElement.appendChild(imgElement)
    productsSection.appendChild(aElement)
  })
  const lightbox = GLightbox({ loop: true })
  lightbox.init()
}

insertProducts()