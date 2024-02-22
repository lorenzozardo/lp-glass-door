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
  const produtos = document.querySelectorAll('.produtos-container a');

  produtos.forEach(produto => {
    const produtoCategory = produto.getAttribute('data-category')

    if (category === 'all' || produtoCategory === category) {
      produto.style.opacity = 1
    } else {
      produto.style.opacity = 0
    }
  })
}

function showSubcategories(category) {
    const subcategoriasContainer = document.querySelector('.subcategorias-container');

    const subcategorias = ['subcategoria1', 'subcategoria2', 'subcategoria3'];

    // Verifique se a categoria é "Lareiras" ou "Churrasqueiras" antes de atualizar a lista de subcategorias
    if (category === 'lareiras' || category === 'churrasqueiras') {
        const subcategoriasHTML = subcategorias.map(subcategoria => {
            return `<a onclick="filterProducts('${subcategoria}')">${subcategoria}</a>`;
        }).join('');

        subcategoriasContainer.innerHTML = subcategoriasHTML;

        // Exiba o contêiner de subcategorias
        subcategoriasContainer.style.display = 'block';
    } else {
        // Oculte o contêiner de subcategorias para outras categorias
        subcategoriasContainer.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Passe a categoria desejada como argumento para a função showSubcategories
    showSubcategories('all');
});