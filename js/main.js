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

  products.forEach((product, index) => {
    const aElement = document.createElement('a')
    aElement.href = product.image
    aElement.className = 'glightbox'
    aElement.setAttribute('data-category', product.category)

    const imgElement = document.createElement('img')
    imgElement.src = product.image
    imgElement.className = `img__products area-${index + 1}`

    aElement.appendChild(imgElement)
    productsSection.appendChild(aElement)
  })
  const lightbox = GLightbox()
  lightbox.init()

  // Scroll Reveal
  window.sr = ScrollReveal({ reset: false })

  sr.reveal('.area-1', { duration: 1000 })
  sr.reveal('.area-2', { duration: 1000 })
  sr.reveal('.area-3', { duration: 1000 })
  sr.reveal('.area-4', { duration: 1500 })
  sr.reveal('.area-5', { duration: 1500 })
  sr.reveal('.area-6', { duration: 1500 })
  sr.reveal('.area-7', { duration: 2000 })
  sr.reveal('.area-8', { duration: 2000 })
  sr.reveal('.area-9', { duration: 2000 })
  sr.reveal('.area-10', { duration: 2000 })
  sr.reveal('.area-11', { duration: 2000 })
  sr.reveal('.area-12', { duration: 2000 })
  sr.reveal('.area-13', { duration: 2000 })
  sr.reveal('.area-14', { duration: 2000 })
  sr.reveal('.area-15', { duration: 2000 })
  sr.reveal('.area-16', { duration: 2000 })
  sr.reveal('.area-17', { duration: 2000 })
  sr.reveal('.area-18', { duration: 2000 })
  sr.reveal('.area-19', { duration: 2000 })
  sr.reveal('.area-20', { duration: 2000 })
  sr.reveal('.area-21', { duration: 2000 })
}


insertProducts()