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

function filterProducts(category) {
  const products = document.querySelectorAll('.products__section a')
  const subcategoriesContainer = document.querySelector('.subcategories__section')

  products.forEach(produto => {
    const produtoCategory = produto.getAttribute('data-category')

    if (category === 'all' || produtoCategory === category) {
      produto.style.opacity = 1
    } else {
      produto.style.opacity = 0
    }
  })
  
  subcategoriesContainer.innerHTML = ''

  if (category === 'lareiras' || category === 'churrasqueiras') {
    const subcategories = ['Modelo de Embutir', 'Modelo de Sobrepor', 'Lareiras e Churrasqueiras de Canto']

    subcategoriesContainer.innerHTML = subcategories.map(subcategory => {
      const words = subcategory.split(' ')
      const lastWord = words[words.length - 1]

      return `<a onclick="filterProducts('${lastWord.toLowerCase()}')">${subcategory}</a>`
    }).join('')
  }
}