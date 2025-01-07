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

async function loadProducts() {
  const response = await fetch('products.json')
  const productsJSON = await response.json()
  return productsJSON.products
}

const productsSection = document.getElementById('products__section')

async function insertProducts(category) {
  const products = await loadProducts()

  Array.from(productsSection.children).forEach((child) => {
    child.classList.remove("fade-in")
  })

  setTimeout(() => {
    productsSection.innerHTML = ""

    const filteredProducts = category === "all" ? products : products.filter((product) => product.category.split(" ").includes(category))

    filteredProducts.forEach((product) => {
      const aElement = document.createElement("a")
      aElement.href = product.image
      aElement.className = "glightbox"
      aElement.setAttribute("data-category", product.category)

      const imgElement = document.createElement("img")
      imgElement.src = product.image
      imgElement.className = "img__products"

      aElement.appendChild(imgElement)
      productsSection.appendChild(aElement)

      setTimeout(() => {
        aElement.classList.add("fade-in")
      }, 100)
    })

    const lightbox = GLightbox({ loop: true })
    lightbox.init()
  }, 200)
}

function filterProducts(category) {
  const subcategoriesContainer = document.querySelector('.list__subcategories');

  if (category !== 'churrasqueiras-modelos' && category !== 'lareiras-modelos' && category !== 'churrasqueiras-embutir' && category !== 'churrasqueiras-sobrepor' &&
    category !== 'churrasqueiras-canto' && category !== 'lareiras-embutir' &&
    category !== 'lareiras-sobrepor' && category !== 'lareiras-canto') {
    subcategoriesContainer.innerHTML = ''
  }

  const categorySubcategories = {
    'lareiras': ['Todos os Modelos', 'Modelo de Embutir', 'Modelo de Sobrepor', 'Lareiras de Canto'],
    'churrasqueiras': ['Todos os Modelos', 'Modelo de Embutir', 'Modelo de Sobrepor', 'Churrasqueiras de Canto']
  }

  if (category === 'lareiras' || category === 'churrasqueiras') {
    const subcategories = categorySubcategories[category]

    subcategoriesContainer.innerHTML = subcategories.map((subcategory, index) => {
      const words = subcategory.split(' ')
      let lastWord = words[words.length - 1]

      if (category === 'lareiras') {
        if (index === 0) {
          lastWord = "lareiras"
        } else {
          lastWord = "lareiras-" + words[words.length - 1]
        }

      } else if (category === 'churrasqueiras') {
        if (index === 0) {
          lastWord = "churrasqueiras"
        } else {
          lastWord = "churrasqueiras-" + words[words.length - 1]
        }
      }

      return `<a onclick="filterProducts('${lastWord.toLowerCase()}')">${subcategory}</a>`;
    }).join('')
  
    // Adiciona a classe active para a primeira subcategoria
    subcategoriesContainer.querySelector('a').classList.add('active')
  }

  insertProducts(category)
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

insertProducts('all')

document.addEventListener("DOMContentLoaded", () => {
  const productsSection = document.querySelector(".products__section")
  setTimeout(() => {
    productsSection.classList.add("show")
  }, 300)
})
